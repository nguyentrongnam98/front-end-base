
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
    defaultOptions: {
        mutations: {
            cacheTime: 5000,
            retry: 2,
            onError(error, variables, context) {
                // console.log('error', error);
            },
            onSuccess(data, variables, context) {
                // console.log('data', data);
            },
        },
        queries: {
            staleTime: 3000,
            cacheTime: 5000,
            retry: 2,
            refetchOnWindowFocus: true,
            onError: (error) => {
                // console.error('error', error);
            },
            onSuccess(data) {
                // console.log('data', data);
            },
        }
    },
});