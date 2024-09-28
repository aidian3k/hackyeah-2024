import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './api/QueryClient';
import AppRoutes from './router/Routes.component';
import store from './store/store';
import { Provider } from 'react-redux';
import { ToastProvider } from '@/components/ui/toast.tsx';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ToastProvider>
          <AppRoutes />
        </ToastProvider>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
