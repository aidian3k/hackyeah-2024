import {useRegisterUser} from '@/api/mutation/RegisterMutation';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {RoutePaths} from '@/router/Routes.types';
import {RegisterFormInputs} from '@/ts/interface/Register.types';
import {useEffect} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';

const RegisterForm = () => {
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<RegisterFormInputs>();
    const {mutate: handleRegister, isSuccess} = useRegisterUser();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<RegisterFormInputs> = data => {
        console.log(data);
        handleRegister(data);
    };

    useEffect(() => {
        if (isSuccess) {
            console.log('User registered');
            navigate(RoutePaths.LOGIN);
        }
    }, [isSuccess]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <Label htmlFor="email">Email:</Label>
                <Input type="email" id="email" {...register('email', {required: 'Email jest wymagany'})} />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>

            <div>
                <Label htmlFor="password">Hasło:</Label>
                <Input type="password" id="password" {...register('password', {required: 'Hasło jest wymagane'})} />
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>

            <div>
                <Label htmlFor="firstName">Imię:</Label>
                <Input type="text" id="firstName" {...register('firstName', {required: 'Imię jest wymagane'})} />
                {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
            </div>

            <div>
                <Label htmlFor="lastName">Nazwisko (opcjonalnie):</Label>
                <Input type="text" id="lastName" {...register('lastName')} />
            </div>

            <div>
                <Label htmlFor="nickName">Nazwa użytkownika (nick):</Label>
                <Input type="text" id="nickName" {...register('nickName', {required: 'Nick jest wymagany'})} />
                {errors.nickName && <p className="text-red-500">{errors.nickName.message}</p>}
            </div>

            <div>
                <Label htmlFor="phoneNumber">Numer telefonu:</Label>
                <Input type="tel"
                       id="phoneNumber" {...register('phoneNumber', {required: 'Numer telefonu jest wymagany'})} />
                {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber.message}</p>}
            </div>

            <Button type="submit">Zarejestruj się</Button>
        </form>
    );
};

export default RegisterForm;
