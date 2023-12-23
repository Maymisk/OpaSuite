import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ToastProvider } from '@/components/global/Toast/ToastProvider';
import { AuthContextProvider } from '@/contexts/auth/AuthContext';
import { ChatContextProvider } from '@/contexts/websockets/ChatContext';

const inter = Inter({ subsets: ['latin'], weight: ['100', '300', '700'] });

export const metadata: Metadata = {
	title: 'Opa!Suite',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body
				className={`bg-gray500 flex items-center justify-center h-screen ${inter.className}`}
			>
				<AuthContextProvider>
					<ChatContextProvider>
						<ToastProvider>{children}</ToastProvider>
					</ChatContextProvider>
				</AuthContextProvider>
			</body>
		</html>
	);
}
