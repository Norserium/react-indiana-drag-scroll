import React, { FC } from 'react';
import cn from 'classnames';
import { FirstPyramid } from './FirstPyramid';
import { SecondPyramid } from './SecondPyramid';
import { Palm } from './Palm';
import { FirstRock } from './FirstRock';
import { Camel } from './Camel';
import { ThirdPyramid } from './ThirdPyramid';
import { SecondRock } from './SecondRock';
import styles from './index.module.scss';

interface BackgroundProps {
	className?: string;
}

export const Background: FC<BackgroundProps> = ({ className }) => {
	return (
		<div className={cn(className, styles.root)}>
			<div className={styles.objects}>
				<FirstPyramid className={styles.firstPyramid} />
				<SecondPyramid className={styles.secondPyramid} />
				<ThirdPyramid className={styles.thirdPyramid} />
				<FirstRock className={styles.firstRock} />
				<SecondRock className={styles.secondRock} />
				<Palm className={styles.palm} />
				<Camel className={styles.camel} />
			</div>
			<div className={styles.sand} />
		</div>
	);
};
