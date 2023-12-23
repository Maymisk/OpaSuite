import { ChatsSidebar } from '@/components/ChatsSidebar';
import { api } from '@/services/api';
import { ReactNode } from 'react';

interface IMainLayoutProps {
	children: ReactNode;
}

export default async function MainLayout({ children }: IMainLayoutProps) {
	return (
		<div className="w-full h-[50rem] max-w-7xl flex shadow-black shadow-md rounded-md">
			<ChatsSidebar />

			{children}
		</div>
	);
}
