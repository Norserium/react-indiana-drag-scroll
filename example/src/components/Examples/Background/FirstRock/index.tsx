import React, { FC } from 'react';

export interface FirstRockProps {
	className?: string;
}

export const FirstRock: FC<FirstRockProps> = ({ className }) => {
	return (
		<svg className={className} xmlns="http://www.w3.org/2000/svg" width="351" height="120.8" xmlSpace="preserve">
			<path
				fill="#FFF"
				stroke="#F2F0EE"
				strokeWidth="2"
				strokeMiterlimit="10"
				d="M325 55c-72.3-28.2-63.5-71.8-102.7-44.2s-77.6 27.7-77.6 27.7S82.2 53.2 34.3 53.9c-47.9.6-39.3 47.7 4.5 56.3s312.7 18.3 310.2-12c-2.6-30.4-12.5-38.7-24-43.2z"
			/>
			<path
				opacity=".5"
				fill="#F2F0EE"
				d="M234.9 4.1s22.6 18.5 0 34.4-173.3 73.8-173.3 73.8c104.4 7.8 198.8 17 282.1-7.1 10.3-3 9-37.8-23.8-51.4-15.7-6.5-34.4-17.2-54-37.4 0 0-18.5-18.9-31-12.3z"
			/>
		</svg>
	);
};
