import React, { useEffect, useRef } from 'react';
import { ScrollContainer } from 'react-indiana-drag-scroll';
import styles from './index.module.scss';
import { Woman } from './Woman';

export const SecondaryExample = () => {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (ref.current) {
			ref.current?.scrollTo({
				left: ref.current.scrollWidth / 2 - ref.current.clientWidth / 2 - 25,
				top: 140,
			});
		}
	}, []);

	return (
		<div className={styles.root}>
			<div className={styles.container}>
				<ScrollContainer ref={ref} className={styles.scrollContainer}>
					<Woman className={styles.woman} />
				</ScrollContainer>
			</div>
		</div>
	);
};
