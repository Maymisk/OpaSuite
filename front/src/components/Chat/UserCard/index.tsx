import { FallbackAvatar } from '@/components/global/FallbackAvatar';

interface IUserCardProps {
	name: string;
}

export function UserCard({ name }: IUserCardProps) {
	return (
		<div className="flex items-center gap-4 mt-16 pb-4 border-b-2 border-gray600">
			<FallbackAvatar name={name} alt="User profile picture" />

			<h1 className=" text-white text-3xl font-bold ">{name}</h1>
		</div>
	);
}
