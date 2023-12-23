'use client';

import { useForm } from 'react-hook-form';
import { Input } from '../global/Inputs/Input';
import { yupResolver } from '@hookform/resolvers/yup';
import { validation } from './validation';
import { LoadingIcon } from '../global/LoadingIcon';
import { Toast } from '../global/Toast';
import { useState } from 'react';
import { useAuth } from '@/contexts/auth/AuthContext';

interface IOnSubmitData {
	name: string;
	email: string;
	password: string;
}

export function SignUpForm() {
	const [successToastIsOpen, setSuccessToastIsOpen] = useState(false);
	const [errorToastIsOpen, setErrorToastIsOpen] = useState(false);
	const { signUp } = useAuth();

	const {
		handleSubmit,
		register,
		reset,
		formState: { errors, isSubmitting },
	} = useForm({ resolver: yupResolver(validation) });

	async function onSubmit({ name, email, password }: IOnSubmitData) {
		const response = await signUp({ name, email, password });

		if (response && response.status === 201) {
			setSuccessToastIsOpen(true);
			reset();
		} else setErrorToastIsOpen(true);
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="w-full flex flex-col flex-1 gap-4 mt-2"
		>
			<Input
				label="Nome"
				type="text"
				required
				autoComplete="off"
				placeholder="Digite seu nome de usuário"
				{...register('name')}
				error={errors.name?.message}
			/>

			<Input
				label="email"
				type="email"
				required
				autoComplete="off"
				placeholder="Digite seu email"
				{...register('email')}
				error={errors.email?.message}
			/>

			<div className="flex items-start gap-2">
				<Input
					label="Senha"
					type="password"
					required
					placeholder="Digite sua senha"
					{...register('password')}
					error={errors.password?.message}
				/>

				<Input
					label="Confirmação"
					type="password"
					required
					placeholder="Confirme sua senha"
					{...register('passwordConfirmation')}
					error={errors.passwordConfirmation?.message}
				/>
			</div>

			<button
				type="submit"
				className="w-full h-12 bg-purple500 hover:brightness-125 hover:text-white transition-all mt-auto rounded-sm font-bold flex items-center justify-center disabled:bg-blue-400 disabled:cursor-not-allowed"
			>
				{isSubmitting ? <LoadingIcon /> : 'Criar Conta'}
			</button>

			<Toast
				title="ERRO"
				description="Houve um erro durante a criação de conta."
				open={errorToastIsOpen}
				onOpenChange={setErrorToastIsOpen}
			/>

			<Toast
				title="Sucesso!"
				description="Ir para a tela de login"
				href="/login"
				open={successToastIsOpen}
				onOpenChange={setSuccessToastIsOpen}
				success
			/>
		</form>
	);
}
