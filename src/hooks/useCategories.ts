
import { useQuery } from '@tanstack/react-query';
import { categoryService } from '@/services/api';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryService.getAllCategories(),
    staleTime: 1000 * 60 * 10, // 10 minutes since categories change less frequently
  });
};
