import { InputHTMLAttributes, Ref, forwardRef } from 'react';

interface IInputProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'ref'> {
	label: string;
	error?: string;
}

function InputComponent(
	{ label, error, ...rest }: IInputProps,
	ref: Ref<HTMLInputElement>
) {
	return (
		<div className="w-full flex flex-col justify-center">
			<label className="text-left text-sm text-white font-bold mb-1 uppercase">
				{label}
			</label>
			<input
				ref={ref}
				{...rest}
				className="w-full flex-1 p-3 rounded-md bg-gray600 border-2 border-transparent focus:border-blue700 hover:border-blue700 outline-none placeholder:text-gray-500 text-white font-extralight transition-all"
			/>

			{error && (
				<p className="font-bold text-sm text-danger mt-2">{error}</p>
			)}
		</div>
	);
}

export const Input = forwardRef(InputComponent);
