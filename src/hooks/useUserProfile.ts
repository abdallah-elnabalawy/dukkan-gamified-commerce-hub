
import { useQuery } from '@tanstack/react-query';
import { userService } from '@/services/api';

export const useUserProfile = () => {
  return useQuery({
    queryKey: ['userProfile'],
    queryFn: () => userService.getUserProfile(),
    staleTime: 1000 * 60, // 1 minute
  });
};

export const useChallenges = () => {
  return useQuery({
    queryKey: ['challenges'],
    queryFn: () => userService.getChallenges(),
    staleTime: 1000 * 60, // 1 minute
  });
};
