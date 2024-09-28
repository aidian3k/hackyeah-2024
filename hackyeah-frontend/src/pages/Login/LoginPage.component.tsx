import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import LoginForm from './LoginForm/LoginForm.component';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';

const LoginPage = () => {
  // const { login, isAuthenticated } = useAuth0();

  // if (isAuthenticated) {
  //     return <Redirect to="/app" />;
  // }

  return (
    <div className="w-full h-full flex justify-center items-center mt-10">
        <Card className="w-[500px]">
          <CardHeader>
              <CardTitle>Zaloguj się</CardTitle>
              <CardDescription>Zaloguj się, aby przegladać materiały.</CardDescription>
          </CardHeader>
          <CardContent>
              <LoginForm />
          </CardContent>
        </Card>
    </div>
   
  );
};

export default LoginPage;