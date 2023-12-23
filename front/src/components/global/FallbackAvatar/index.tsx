import Image, { ImageProps } from 'next/image';

interface IFallbackAvatarProps
	extends Omit<ImageProps, 'src' | 'width' | 'height'> {
	name: string;
	src?: string;
	width?: string;
	height?: string;
	text?: string;
}

export function FallbackAvatar({
	src,
	name,
	width = 'w-[60px]',
	height = 'h-[60px]',
	text = 'text-3xl',
	...rest
}: IFallbackAvatarProps) {
	const firstLetter = name[0];

	return src ? (
		<Image src={src} {...rest} className={`${width} ${height}`} />
	) : (
		<div
			className={`${width} ${height} bg-purple500 text-white rounded-full flex items-center justify-center`}
		>
			<span className={`${text} font-bold uppercase`}>{firstLetter}</span>
		</div>
	);
}
