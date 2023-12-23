import { WrenchScrewdriverIcon } from '@heroicons/react/24/solid';

export function LoadingIcon() {
	return (
		<div className="text-gray100 animate-spin">
			<WrenchScrewdriverIcon width={24} height={24} />
		</div>
	);
}
