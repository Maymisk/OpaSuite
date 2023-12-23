import { useAuth } from '@/contexts/auth/AuthContext';
import { ArrowLeftEndOnRectangleIcon } from '@heroicons/react/24/solid';

export function LogoutButton() {
	const { signOut } = useAuth();

	return (
		<button
			onClick={signOut}
			className="flex justify-center items-center gap-4 rounded-md mt-auto py-3 bg-danger text-white font-bold"
		>
			<span>
				<ArrowLeftEndOnRectangleIcon width={24} height={24} />
			</span>
			Sair
		</button>
	);
}
