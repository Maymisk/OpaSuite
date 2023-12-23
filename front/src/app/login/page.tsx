import { LoginForm } from '@/components/login/LoginForm';
import Link from 'next/link';

export default function Login() {
	return (
		<main className="text-center w-full max-w-xs">
			<div className="bg-gray500 min-h-[24rem] p-4 rounded-md flex flex-col gap-2 shadow-md shadow-black">
				<h1 className="text-white font-bold text-2xl">Login</h1>

				<LoginForm />
			</div>

			<Link
				href={'/signUp'}
				className="text-purple500 font-bold hover:brightness-125 transition-all mt-2 block hover:scale-105"
			>
				Ainda não é registrado?
			</Link>
		</main>
	);
}
