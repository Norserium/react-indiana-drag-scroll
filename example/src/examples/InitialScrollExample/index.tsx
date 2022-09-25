import React, { FC, useEffect, useRef } from 'react';
import { ScrollContainer } from 'react-indiana-drag-scroll';
import { ScrollContent } from '../ScrollContent';
import { ExampleWrapper } from '../ExampleWrapper';

export const InitialScrollExample: FC = () => {
	const ref = useRef<HTMLElement>(null);

	useEffect(() => {
		if (ref.current) {
			ref.current.scrollTo({
				left: ref.current.scrollWidth / 2 - ref.current.clientWidth / 2,
			});
		}
	}, []);

	return (
		<ExampleWrapper>
			<ScrollContainer ref={ref}>
				<ScrollContent />
			</ScrollContainer>
		</ExampleWrapper>
	);
};
