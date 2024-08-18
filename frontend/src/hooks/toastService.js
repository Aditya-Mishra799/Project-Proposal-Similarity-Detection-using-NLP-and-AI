import { useToast } from '@chakra-ui/react';

// Custom hook for toast notifications
export function useToastService() {
  const toast = useToast();

  // Function to show toast notifications
  const showToast = ({ title, description, status = 'info', duration = 5000, isClosable = true }) => {
    toast({
      title,
      description,
      status,
      duration,
      isClosable,
    });
  };

  return {
    showToast,
  };
}
