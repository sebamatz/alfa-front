import { useCallback } from 'react';

export const useErrorHandler = () => {
  const handleError = useCallback((error: Error) => {
    // Log the error
    console.error('Error caught by useErrorHandler:', error);
    
    // You can add additional error reporting logic here
    // Example: send to error reporting service
    
    // Re-throw the error to trigger the nearest error boundary
    throw error;
  }, []);

  const handleAsyncError = useCallback(async <T>(
    asyncFn: () => Promise<T>
  ): Promise<T> => {
    try {
      return await asyncFn();
    } catch (error) {
      handleError(error as Error);
      throw error;
    }
  }, [handleError]);

  return {
    handleError,
    handleAsyncError
  };
}; 