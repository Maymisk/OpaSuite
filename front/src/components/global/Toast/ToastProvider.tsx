'use client';

import * as Toast from '@radix-ui/react-toast';
import { ReactNode } from 'react';

interface IToastProviderProps {
	children: ReactNode;
}

export function ToastProvider({ children }: IToastProviderProps) {
	return (
		<Toast.Provider duration={5000}>
			{children}

			<Toast.ToastViewport className="fixed z-[99999] top-36 right-0" />
		</Toast.Provider>
	);
}
