'use client';

import { useAuth } from '@/contexts/auth/AuthContext';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../global/Inputs/Input';
import { LoadingIcon } from '../global/LoadingIcon';
import { Toast } from '../global/Toast';
import { validation } from './validation';

interface IOnSubmitData {
	email: string;
	password: string;
}

export function LoginForm() {
	const [errorToastIsOpen, setErrorToastIsOpen] = useState(false);
	const { signIn } = useAuth();
	const router = useRouter();
	const {
		handleSubmit,
		register,
		formState: { isSubmitting, errors },
	} = useForm({
		resolver: yupResolver(validation),
	});

	async function onSubmit({ email, password }: IOnSubmitData) {
		const response = await signIn({ email, password });
		if (!response) setErrorToastIsOpen(true);
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="w-full h-full flex flex-col flex-1 gap-4 mt-1"
		>
			<Input
				label="Email"
				type="email"
				required
				autoComplete="off"
				placeholder="Digite seu email"
				{...register('email')}
				error={errors.email?.message}
			/>

			<Input
				label="Senha"
				type="password"
				required
				placeholder="Digite sua senha"
				{...register('password')}
				error={errors.password?.message}
			/>

			<button
				type="submit"
				className="w-full h-12 bg-purple500 hover:brightness-125 hover:text-white transition-all mt-auto rounded-sm font-bold flex items-center justify-center disabled:brightness-50 disabled:cursor-not-allowed"
			>
				{isSubmitting ? <LoadingIcon /> : 'Logar'}
			</button>

			<Toast
				title="ERRO"
				description="Credenciais inválidas"
				open={errorToastIsOpen}
				onOpenChange={setErrorToastIsOpen}
			/>
		</form>
	);
}
