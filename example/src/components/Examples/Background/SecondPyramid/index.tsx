import React, { FC } from 'react';

export interface SecondPyramidProps {
	className?: string;
}

export const SecondPyramid: FC<SecondPyramidProps> = ({ className }) => {
	return (
		<svg className={className} xmlns="http://www.w3.org/2000/svg" width="274.7" height="189" xmlSpace="preserve">
			<path fill="#FFF" stroke="#F2F0EE" strokeWidth="2" strokeMiterlimit="10" d="M140.4 3.4 4 187h266.8z" />
			<path fill="#F2F0EE" d="M140.4 3.4 4 187h101.5z" />
		</svg>
	);
};
