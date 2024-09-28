
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './api/QueryClient';
import Dashboard from './pages/Dashboard/Dashboard.component';
export const description = "A simple login form with email and password. The submit button says 'Sign in'.";

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Dashboard />
    </QueryClientProvider>
  );
}

export default App;
