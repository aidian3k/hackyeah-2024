import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import RegisterForm from './RegisterForm/RegisterForm.component';
import UnauthorizedTopBar from '@/features/top-bar/unauthorized-top-bar.tsx';

const RegisterPage = () => {
  // const { login, isAuthenticated } = useAuth0();

  // if (isAuthenticated) {
  //     return <Redirect to="/app" />;
  // }

  return (
    <>
    <UnauthorizedTopBar />
    <div className="w-full h-screen flex justify-center items-center" style={{
      backgroundImage: `url(/images/home-page/note-1.jpg)`
    }}>
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle>Zarejestruj się</CardTitle>
          <CardDescription>Zarejestruj się, aby przegladać materiały.</CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
    </div>
    </>
  );
};

export default RegisterPage;
