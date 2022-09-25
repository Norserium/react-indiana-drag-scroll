import React, { FC } from 'react';

export interface FirstPyramidProps {
	className?: string;
}

export const FirstPyramid: FC<FirstPyramidProps> = ({ className }) => {
	return (
		<svg className={className} xmlns="http://www.w3.org/2000/svg" width="190.8" height="137.4" xmlSpace="preserve">
			<path fill="#FFF" stroke="#F2F0EE" strokeWidth="2" strokeMiterlimit="10" d="M3.8 135.4H187L95.4 3.5z" />
			<path fill="#F2F0EE" d="M95.4 3.5 69.5 135.4H3.8z" />
		</svg>
	);
};
