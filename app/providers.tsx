'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { type ReactNode, type FC } from 'react';
import { Toaster } from '@/components/ui/toaster';

type ProviderProps = {
  children: ReactNode;
};

const Providers: FC<ProviderProps> = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 60 * 1000,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster />
      {children}
    </QueryClientProvider>
  );
};
export default Providers;
