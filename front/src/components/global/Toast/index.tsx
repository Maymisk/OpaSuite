'use client';

import { XMarkIcon } from '@heroicons/react/24/solid';
import {
	Root,
	Title,
	Description,
	Close,
	Viewport,
} from '@radix-ui/react-toast';
import Link from 'next/link';

interface IToastProps {
	title: string;
	description: string;
	color?: string;
	href?: string;
	success?: boolean;
	duration?: number;
	open: boolean;
	onOpenChange(value: boolean): void;
}

export function Toast({
	title,
	description,
	color,
	success = false,
	href,
	open,
	onOpenChange,
	duration = 5000,
}: IToastProps) {
	return (
		<Root
			duration={duration}
			open={open}
			onOpenChange={onOpenChange}
			className={`min-w-[15rem] max-w-[20rem] flex items-start justify-between gap-8 p-4 rounded-md shadow-lg shadow-black data-[state='open']:animate-fadeIn data-[state='closed']:animate-fadeOut ${
				color ? color : success ? 'bg-green500' : 'bg-danger'
			} `}
		>
			<Link href={href || '#'} className={`${!href && 'cursor-default'}`}>
				<Title className="text-white font-bold uppercase">
					{title}
				</Title>

				<Description className="font-bold text-sm">
					{description}
				</Description>
			</Link>

			<Close>
				<XMarkIcon width={24} height={24} />
			</Close>
		</Root>
	);
}
