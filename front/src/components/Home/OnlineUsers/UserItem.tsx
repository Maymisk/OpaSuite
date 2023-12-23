import { FallbackAvatar } from '@/components/global/FallbackAvatar';
import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

interface IUserItemProps {
	_id: string;
	name: string;
}

export function UserItem({ _id, name }: IUserItemProps) {
	const firstLetter = name[0];

	return (
		<li className="flex justify-between items-center border-t-2 border-gray600 pr-8 py-3 pl-2 hover:bg-gray400 hover:rounded-md hover:brightness-125 transition-all">
			<div className="flex items-center gap-4 text-white font-bold text-sm">
				<FallbackAvatar
					name={firstLetter}
					alt="User profile picture"
					width="w-[40px]"
					height="h-[40px]"
					text="text-normal"
				/>

				<div className="flex flex-col gap-1">
					<span>{name}</span>
					<span className="font-extralight">online</span>
				</div>
			</div>

			<Link
				href={`/chat/${_id}`}
				className="text-gray100 w-[25px] h-[25px] hover:brightness-125 transition-all"
			>
				<ChatBubbleOvalLeftEllipsisIcon />
			</Link>
		</li>
	);
}
