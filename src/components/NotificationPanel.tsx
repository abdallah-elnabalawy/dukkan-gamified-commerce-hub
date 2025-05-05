
import { useEffect, useRef } from "react";
import { Bell, Check, X } from "lucide-react";
import { 
  useNotifications, 
  Notification as NotificationType 
} from "@/contexts/NotificationContext";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationPanel({ isOpen, onClose }: NotificationPanelProps) {
  const { notifications, markAsRead, markAllAsRead, clearNotifications } = useNotifications();
  const panelRef = useRef<HTMLDivElement>(null);
  
  // Close panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node) && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);
  
  const handleNotificationClick = (notification: NotificationType) => {
    markAsRead(notification.id);
  };
  
  if (!isOpen) return null;
  
  return (
    <div 
      ref={panelRef}
      className="absolute right-0 top-full mt-2 w-80 md:w-96 bg-white rounded-lg shadow-lg z-50 overflow-hidden border border-gray-200"
    >
      <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-dukkan-purple" />
          <h3 className="font-semibold">Notifications</h3>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      {notifications.length > 0 ? (
        <>
          <div className="max-h-80 overflow-y-auto">
            {notifications.map((notification) => (
              <div 
                key={notification.id}
                className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                  notification.isRead ? 'opacity-70' : 'bg-blue-50/30'
                }`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-sm">{notification.title}</h4>
                  <span className="text-xs text-gray-500">
                    {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
              </div>
            ))}
          </div>
          
          <div className="p-3 bg-gray-50 flex justify-between">
            <Button 
              variant="outline" 
              size="sm"
              onClick={markAllAsRead}
            >
              <Check className="h-4 w-4 mr-1" />
              Mark all as read
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={clearNotifications}
            >
              Clear all
            </Button>
          </div>
        </>
      ) : (
        <div className="p-6 text-center text-gray-500">
          <Bell className="h-8 w-8 mx-auto mb-2 text-gray-300" />
          <p>No notifications</p>
        </div>
      )}
    </div>
  );
}
