import React, { FC } from 'react';

export interface CamelProps {
	className?: string;
}

export const Camel: FC<CamelProps> = ({ className }) => {
	return (
		<svg className={className} xmlns="http://www.w3.org/2000/svg" width="35" height="26.7" xmlSpace="preserve">
			<path
				fill="#F2F0EE"
				d="M32.5 3.9s3 1.1 2.4 2.5-2.4 2-4.7 1.1c0 0-2.5 7.7-6.5 6.7s-3.3-3.6-3.3-3.6-.6 3.5 1 4.8 2 2.3 1.2 5.6-.5 4.6-.5 4.6-2.3.2-2.3 0 2.8-7.3.6-9.6-2.7 2.4-2.8 6.3 0 4.5 0 4.5h-1.5s.6-9.8-.4-12-5.1.4-7-1.3c0 0-1 6.2 0 7.2s4.7 6.1 4.4 6.1h-1.8s-3.9-3.4-4.6-5.9 0-7.1 0-7.1-3.6 4.2-5 6c0 0 .4 7 0 6.9s-1.7 0-1.7 0v-8.9l3.6-5.1S1.4 7.8 5.3 5.5c0 0-.4-4.8 1.9-4.7s4.7 3.2 5.5 2.9 1.5-3.9 3.9-3.8c2.5.1 2.9 3.2 3.8 4.9S23 9.2 24.6 8s1.4-3.5 4.3-4.7 3.6.6 3.6.6z"
			/>
		</svg>
	);
};
