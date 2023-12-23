import Link from 'next/link';
import { FallbackAvatar } from '../global/FallbackAvatar';

interface IChatProps {
	_id: string;
	name: string;
	online: boolean;
	unreadMessages: number;
}

export function Chat({ _id, name, online, unreadMessages }: IChatProps) {
	const firstLetter = name[0];

	return (
		<Link
			href={`/chat/${_id}`}
			className="flex items-center justify-between p-2 rounded-sm text-sm text-gray100 font-bold bg-gray600 hover:bg-gray400 hover:brightness-125 transition-all"
		>
			<div className="flex items-center gap-4">
				<div className="relative">
					<FallbackAvatar
						name={firstLetter}
						alt="User profile picture"
						width="w-[30px]"
						height="h-[30px]"
						text="text-normal"
					/>

					<div
						className={`w-[12px] h-[12px] border-2 border-gray600 rounded-full absolute bottom-[-2px] right-0 ${
							online ? 'bg-green500' : 'bg-gray100'
						}`}
					/>
				</div>

				<span>{name}</span>
			</div>

			<span
				className={`w-[16px] h-[16px] flex items-center justify-center bg-danger rounded-full text-xs ${
					!unreadMessages && 'hidden'
				}`}
			>
				{unreadMessages}
			</span>
		</Link>
	);
}
