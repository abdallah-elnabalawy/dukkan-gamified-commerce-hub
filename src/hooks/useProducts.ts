
import { useQuery } from '@tanstack/react-query';
import { productService } from '@/services/api';

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => productService.getAllProducts(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useProductById = (id: number) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getProductById(id),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useProductsByCategory = (category: string) => {
  return useQuery({
    queryKey: ['products', 'category', category],
    queryFn: () => productService.getProductsByCategory(category),
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!category, // Only run the query if category is provided
  });
};
