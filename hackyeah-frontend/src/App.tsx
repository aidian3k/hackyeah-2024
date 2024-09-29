import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './api/QueryClient';

import AppRoutes from './router/Routes.component';
import store from './store/store';
import { Provider } from 'react-redux';
import { ToastProvider } from '@/components/ui/toast.tsx';
import { ThemeProvider } from '@/components/theme-provider.tsx';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <ToastProvider>
            <AppRoutes />
          </ToastProvider>
        </ThemeProvider>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
