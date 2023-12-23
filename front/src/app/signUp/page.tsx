import { SignUpForm } from '@/components/signUp/SignUpForm';
import Link from 'next/link';

export default function SignUp() {
	return (
		<main className="w-full min-w-xs max-w-lg text-center max-xl:p-4">
			<div className="bg-gray500 min-h-[24rem] p-4 rounded-md flex flex-col gap-2 shadow-md shadow-black">
				<h1 className="text-white font-bold text-2xl">Sign Up</h1>

				<SignUpForm />
			</div>

			<Link
				href={'/login'}
				className="text-purple500 font-bold hover:brightness-125 transition-all mt-2 block hover:scale-105"
			>
				Já tem uma conta?
			</Link>
		</main>
	);
}
