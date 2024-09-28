import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './api/QueryClient';
import MainPage from './pages/MainPage/MainPage.component';
import AppRoutes from './router/Routes.component';
import store from './store/store';
import { Provider } from 'react-redux';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
