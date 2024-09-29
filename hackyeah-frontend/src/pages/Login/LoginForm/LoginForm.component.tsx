import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';
import {Button} from '@/components/ui/button';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {LoginFormInputs} from '@/ts/interface/Login.types';
import {useLoginUser} from '@/api/mutation/LoginMutation';
import {useNavigate} from 'react-router-dom';
import {RoutePaths} from '@/router/Routes.types';
import {useGetCurrentUserInfo} from "@/api/query/userQuery.ts";
import {useDispatch} from "react-redux";
import {login} from "@/store/user/user.slice.ts";

const loginSchema = z.object({
    email: z.string().email('Wprowadź prawidłowy adres e-mail'),
    password: z.string().min(6, 'Hasło musi mieć co najmniej 6 znaków')
});

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<LoginFormInputs>({
        resolver: zodResolver(loginSchema)
    });
    const currentUserInfo = useGetCurrentUserInfo();

    const {mutate: handleLogin, isSuccess, isError, error} = useLoginUser();

    const dispatch = useDispatch()
    const onSubmit = (data: LoginFormInputs) => {
        console.log(data);
        handleLogin(data);
    };
    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess) {
            currentUserInfo.refetch()
        }
    }, [isSuccess]);

    useEffect(() => {
        if (currentUserInfo.isSuccess) {
            dispatch(login({...currentUserInfo.data}))
            navigate(RoutePaths.MAIN_PAGE);
            console.log(currentUserInfo.data)
        }
    }, [currentUserInfo.isSuccess]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...register('email')} className="mt-1"/>
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div>
                <Label htmlFor="password">Hasło</Label>
                <Input id="password" type="password" {...register('password')} className="mt-1"/>
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            <Button type="submit">Zaloguj się</Button>
            {isError && <p className="text-red-500 text-sm">{error?.message}</p>}
        </form>
    );
};

export default LoginForm;
