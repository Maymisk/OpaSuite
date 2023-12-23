import { OnlineUsers } from '@/components/Home/OnlineUsers';

export default function Home() {
	return (
		<main className="w-full pt-6 px-6">
			<h1 className="uppercase text-gray100 font-bold text-normal">
				Usuários online
			</h1>

			<OnlineUsers />
		</main>
	);
}
