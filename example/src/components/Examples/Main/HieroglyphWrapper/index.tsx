import React, { FC, ReactNode, useState } from 'react';
import cn from 'classnames';
import styles from './index.module.scss';

export interface HieroglyphWrapperProps {
	children: ReactNode;
}

export const HieroglyphWrapper: FC<HieroglyphWrapperProps> = ({ children }) => {
	const [hidden, setHidden] = useState(Math.random() > 0.8);

	const toggleVisibility = () => {
		setHidden((value) => !value);
	};

	return (
		<div className={cn(styles.root, hidden && styles.hidden)} onClick={toggleVisibility}>
			{children}
		</div>
	);
};
