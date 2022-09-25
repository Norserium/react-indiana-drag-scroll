import React, { useEffect, useRef } from 'react';
import { ScrollContainer } from 'react-indiana-drag-scroll';
import { HieroglyphWrapper } from './HieroglyphWrapper';
import styles from './index.module.scss';
import { Man } from '@site/src/components/Examples/Main/Man';

const hieroglyphs = [
	require('./Hieroglyphs/1.svg'),
	require('./Hieroglyphs/2.svg'),
	require('./Hieroglyphs/3.svg'),
	require('./Hieroglyphs/4.svg'),
	require('./Hieroglyphs/5.svg'),
	require('./Hieroglyphs/6.svg'),
	require('./Hieroglyphs/7.svg'),
	require('./Hieroglyphs/8.svg'),
	require('./Hieroglyphs/9.svg'),
	require('./Hieroglyphs/10.svg'),
	require('./Hieroglyphs/11.svg'),
	require('./Hieroglyphs/12.svg'),
	require('./Hieroglyphs/13.svg'),
	require('./Hieroglyphs/14.svg'),
];

export const MainExample = () => {
	return (
		<div className={styles.root}>
			<div className={styles.container}>
				<ScrollContainer className={styles.scrollContainer}>
					<div className={styles.hieroglyphs}>
						{hieroglyphs.map((Module, index) => (
							<HieroglyphWrapper key={index}>
								<Module.default />
							</HieroglyphWrapper>
						))}
					</div>
				</ScrollContainer>
			</div>
			<Man className={styles.man} />
		</div>
	);
};
