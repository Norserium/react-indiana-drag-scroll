import React, { Component, MouseEvent } from 'react';
// @ts-ignore
import bem from 'easy-bem';
import ScrollContainer, { ScrollEvent } from 'react-indiana-drag-scroll';
import './style.css';

const cn = bem('image-example');

export default class Image extends Component {
	render() {
		return (
			<div className={cn()}>
				<ScrollContainer
					className={cn('container')}
					nativeMobileScroll={false}
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
				>
					<img className={cn('image')} src={require('./background.jpg')} />
				</ScrollContainer>
			</div>
		);
	}
}
