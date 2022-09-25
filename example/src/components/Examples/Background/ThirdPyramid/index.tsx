import React, { FC } from 'react';

export interface ThirdPyramidProps {
	className?: string;
}

export const ThirdPyramid: FC<ThirdPyramidProps> = ({ className }) => {
	return (
		<svg className={className} xmlns="http://www.w3.org/2000/svg" width="199.6" height="137.3" xmlSpace="preserve">
			<path fill="#FFF" stroke="#F2F0EE" strokeWidth="2" strokeMiterlimit="10" d="M105.6 3.4 4.1 135.3h191.7z" />
			<path fill="#F2F0EE" d="M105.6 3.4 4.1 135.3h76.6z" />
		</svg>
	);
};
