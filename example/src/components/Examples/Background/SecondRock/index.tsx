import React, { FC } from 'react';

export interface SecondRockProps {
	className?: string;
}

export const SecondRock: FC<SecondRockProps> = ({ className }) => {
	return (
		<svg className={className} xmlns="http://www.w3.org/2000/svg" width="563.8" height="70.7" xmlSpace="preserve">
			<path
				fill="#FFF"
				stroke="#F2F0EE"
				strokeWidth="2"
				strokeMiterlimit="10"
				d="M474 50.1c-26.2-3.3-134.9-60.6-175.5-45.7S154.6 39 154.6 39L.3 66.3h545.5L474 50.1z"
			/>
			<path
				opacity=".5"
				fill="#F2F0EE"
				d="M331.2 2.2s19 42.9-58 64.1c0 0 219.3 9.9 273.2 0 0 0-59.7-9.5-109.2-28.3-54.1-20.5-80.1-28.6-106-35.8z"
			/>
		</svg>
	);
};
