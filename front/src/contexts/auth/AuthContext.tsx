'use client';

import { api } from '@/services/api';
import { deleteCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react';

interface IAuthContextProviderProps {
	children: ReactNode;
}

interface IUser {
	_id: string;
	name: string;
	email: string;
}

interface ISignUpProps {
	name: string;
	email: string;
	password: string;
}

interface ISignInProps {
	email: string;
	password: string;
}

interface IAuthContextData {
	user: IUser | null;
	signUp(data: ISignUpProps): Promise<any>;
	signIn(data: ISignInProps): Promise<void | any>;
	signOut(): Promise<void>;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

export function AuthContextProvider({ children }: IAuthContextProviderProps) {
	const [user, setUser] = useState<IUser | null>(null);
	const router = useRouter();

	async function signUp({ name, email, password }: ISignUpProps) {
		const response = await api.post('/users', { name, email, password });

		return response;
	}

	async function signIn({ email, password }: ISignInProps) {
		const response = await api.post('/users/authenticate', {
			email,
			password,
		});

		if (response && response.status === 200) {
			const { token, refresh_token, user } = response.data;

			setCookie('opaSuite.token', token);
			setCookie('opaSuite.refresh_token', refresh_token);

			setUser(user);

			router.push('/');
		} else return response;
	}

	async function signOut() {
		deleteCookie('opaSuite.token');
		deleteCookie('opaSuite.refresh_token');
		router.refresh();
	}

	// For some reason, it was fetching the users twice.
	let isFetching = false;
	useEffect(() => {
		async function run() {
			if (!isFetching) {
				isFetching = true;

				const response = await api.get('/users');

				if (!response || response.status != 200) {
					signOut();
					return;
				}

				setUser(response.data);
				isFetching = false;
			}
		}

		run();
	}, []);

	return (
		<AuthContext.Provider value={{ user, signUp, signIn, signOut }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}
