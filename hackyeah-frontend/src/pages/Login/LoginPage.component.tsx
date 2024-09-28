import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import LoginForm from './LoginForm/LoginForm.component';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import TopBar from '@/features/top-bar/top-bar.tsx';

const LoginPage = () => {
  // const { login, isAuthenticated } = useAuth0();

  // if (isAuthenticated) {
  //     return <Redirect to="/app" />;
  // }

  return (
    <>
      <TopBar />
      <div className="w-full h-screen flex justify-center items-center" style={{
      backgroundImage: `url(/images/home-page/note-1.jpg)`
    }}>        <Card className="w-[500px]">
          <CardHeader>
            <CardTitle>Zaloguj się</CardTitle>
            <CardDescription>Zaloguj się, aby przegladać materiały.</CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default LoginPage;
