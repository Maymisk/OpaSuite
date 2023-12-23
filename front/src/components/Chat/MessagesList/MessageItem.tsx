import { FallbackAvatar } from '@/components/global/FallbackAvatar';
import { format } from 'date-fns';

interface IMessageItemProps {
	name: string;
	text: string;
	created_at: string;
}

export function MessageItem({ name, text, created_at }: IMessageItemProps) {
	const firstLetter = name[0];

	return (
		<li className="flex items-center gap-4 font-light text-gray100 p-4 rounded-md hover:bg-gray400 hover:brightness-125 transition-all">
			<div className="self-start">
				<FallbackAvatar
					name={firstLetter}
					alt="User profile picture"
					width="w-[35px]"
					height="h-[35px]"
					text="text-lg"
				/>
			</div>

			<span>{text}</span>

			<span className="text-xs">
				{format(created_at, "dd'/'MM'/'yy")}
			</span>
		</li>
	);
}
