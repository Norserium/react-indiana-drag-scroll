import React, { Component, MouseEvent } from 'react';
import bem from 'easy-bem';
import ScrollContainer, { ScrollEvent } from 'react-indiana-drag-scroll';
import './style.css';

const cn = bem('scrollbars-example');

const COLS = 20;
const ROWS = 20;

export default class Scrollbars extends Component {
	container = React.createRef<HTMLElement>();
	numbers = Array(ROWS)
		.fill(0)
		.map<JSX.Element>((el: JSX.Element, row: number) => (
			<div className={cn('row')} key={row}>
				{Array(COLS)
					.fill(0)
					.map((el: JSX.Element, col: number) => (
						<div className={cn('col')} key={`${row}_${col}`}>
							{row * COLS + col}
						</div>
					))}
			</div>
		));

	componentDidMount() {
		const element = this.container.current;
		if (element) {
			element.scrollTop = (element.scrollHeight - element.clientWidth) / 2;
			element.scrollLeft = (element.scrollWidth - element.clientHeight) / 2;
		}
	}

	render() {
		return (
			<div className={cn()}>
				<ScrollContainer
					className={cn('container')}
					hideScrollbars={false}
					onStartScroll={(event: ScrollEvent) => {
						console.log('onStartScroll', event);
					}}
					onScroll={(event: ScrollEvent) => {
						console.log('onScroll', event);
					}}
					onClick={(event: MouseEvent) => {
						console.log('onClick', event);
					}}
					onEndScroll={(event: ScrollEvent) => {
						console.log('onEndScroll', event);
					}}
					innerRef={this.container}
				>
					{this.numbers}
				</ScrollContainer>
			</div>
		);
	}
}
