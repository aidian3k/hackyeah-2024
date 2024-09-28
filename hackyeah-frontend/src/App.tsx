
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './api/QueryClient';
import MainPage from './pages/MainPage/MainPage.component';
export const description = "A simple login form with email and password. The submit button says 'Sign in'.";

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <MainPage />
    </QueryClientProvider>
  );
}

export default App;
