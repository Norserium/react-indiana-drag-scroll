import React, {
	CSSProperties,
	ElementType,
	MouseEvent,
	MutableRefObject,
	PureComponent,
	ReactNode,
	Ref,
	RefObject,
} from 'react';
import classnames from 'classnames';
import debounce from 'debounce';
import bem from 'easy-bem';

import './style.scss';

const cn = bem('indiana-scroll-container');

const SCROLL_END_DEBOUNCE = 300;

const LEFT_BUTTON = 0;

export interface ScrollEvent {
	external: boolean;
}

interface Props {
	vertical?: boolean;
	horizontal?: boolean;
	hideScrollbars?: boolean;
	activationDistance?: number;
	children?: ReactNode;
	onStartScroll?: (event: ScrollEvent) => void;
	onScroll?: (event: ScrollEvent) => void;
	onEndScroll?: (event: ScrollEvent) => void;
	onClick?: (event: MouseEvent) => void;
	className?: string;
	draggingClassName?: string;
	style?: CSSProperties;
	ignoreElements?: string;
	nativeMobileScroll?: boolean;
	ref?: ReactNode;
	component?: ElementType;
	innerRef?: Ref<HTMLElement>;
	stopPropagation?: boolean;
	buttons?: number[];
}

export default class ScrollContainer extends PureComponent<Props> {
	static defaultProps = {
		nativeMobileScroll: true,
		hideScrollbars: true,
		activationDistance: 10,
		vertical: true,
		horizontal: true,
		stopPropagation: false,
		style: {},
		component: 'div',
		buttons: [LEFT_BUTTON],
	};
	container: RefObject<HTMLElement>;
	scrolling: boolean;
	started: boolean;
	pressed: boolean;
	isMobile: boolean;
	internal: boolean;

	scrollLeft?: number;
	scrollTop?: number;
	clientX?: number;
	clientY?: number;

	constructor(props) {
		super(props);
		this.container = React.createRef();
		this.onEndScroll = debounce(this.onEndScroll, SCROLL_END_DEBOUNCE);

		// Is container scrolling now (for example by inertia)
		this.scrolling = false;
		// Is scrolling started
		this.started = false;
		// Is touch active or mouse pressed down
		this.pressed = false;
		// Is event internal
		this.internal = false;

		// Bind callbacks
		this.getRef = this.getRef.bind(this);
	}

	componentDidMount() {
		const { nativeMobileScroll } = this.props;
		const container = this.container.current;

		window.addEventListener('mouseup', this.onMouseUp);
		window.addEventListener('mousemove', this.onMouseMove);
		window.addEventListener('touchmove', this.onTouchMove, { passive: false });
		window.addEventListener('touchend', this.onTouchEnd);

		// due to https://github.com/facebook/react/issues/9809#issuecomment-414072263
		container.addEventListener('touchstart', this.onTouchStart, {
			passive: false,
		});
		container.addEventListener('mousedown', this.onMouseDown, {
			passive: false,
		});

		if (nativeMobileScroll) {
			// We should check if it's the mobile device after page was loaded
			// to prevent breaking SSR
			this.isMobile = this.isMobileDevice();

			// If it's the mobile device, we should rerender to change styles
			if (this.isMobile) {
				this.forceUpdate();
			}
		}
	}

	componentWillUnmount() {
		window.removeEventListener('mouseup', this.onMouseUp);
		window.removeEventListener('mousemove', this.onMouseMove);
		window.removeEventListener('touchmove', this.onTouchMove);
		window.removeEventListener('touchend', this.onTouchEnd);
	}

	getElement() {
		return this.container.current;
	}

	isMobileDevice() {
		return typeof window.orientation !== 'undefined' || navigator.userAgent.indexOf('IEMobile') !== -1;
	}

	isDraggable(target) {
		const ignoreElements = this.props.ignoreElements;
		if (ignoreElements) {
			const closest = target.closest(ignoreElements);
			return closest === null || closest.contains(this.getElement());
		} else {
			return true;
		}
	}

	isScrollable() {
		const container = this.container.current;
		return (
			container &&
			(container.scrollWidth > container.clientWidth || container.scrollHeight > container.clientHeight)
		);
	}

	// Simulate 'onEndScroll' event that fires when scrolling is stopped
	onEndScroll = () => {
		this.scrolling = false;
		if (!this.pressed && this.started) {
			this.processEnd();
		}
	};

	onScroll = (e) => {
		const container = this.container.current;
		// Ignore the internal scrolls
		if (container.scrollLeft !== this.scrollLeft || container.scrollTop !== this.scrollTop) {
			this.scrolling = true;
			this.processScroll(e);
			this.onEndScroll();
		}
	};

	onTouchStart = (e) => {
		const { nativeMobileScroll } = this.props;
		if (this.isDraggable(e.target)) {
			this.internal = true;
			if (nativeMobileScroll && this.scrolling) {
				this.pressed = true;
			} else {
				const touch = e.touches[0];
				this.processClick(e, touch.clientX, touch.clientY);
				if (!nativeMobileScroll && this.props.stopPropagation) {
					e.stopPropagation();
				}
			}
		}
	};

	onTouchEnd = (e) => {
		const { nativeMobileScroll } = this.props;
		if (this.pressed) {
			if (this.started && (!this.scrolling || !nativeMobileScroll)) {
				this.processEnd();
			} else {
				this.pressed = false;
			}
			this.forceUpdate();
		}
	};

	onTouchMove = (e) => {
		const { nativeMobileScroll } = this.props;
		if (this.pressed && (!nativeMobileScroll || !this.isMobile)) {
			const touch = e.touches[0];
			if (touch) {
				this.processMove(e, touch.clientX, touch.clientY);
			}
			e.preventDefault();
			if (this.props.stopPropagation) {
				e.stopPropagation();
			}
		}
	};

	onMouseDown = (e) => {
		if (this.isDraggable(e.target) && this.isScrollable()) {
			this.internal = true;
			if (this.props.buttons.indexOf(e.button) !== -1) {
				this.processClick(e, e.clientX, e.clientY);
				e.preventDefault();
				if (this.props.stopPropagation) {
					e.stopPropagation();
				}
			}
		}
	};

	onMouseMove = (e) => {
		if (this.pressed) {
			this.processMove(e, e.clientX, e.clientY);
			e.preventDefault();
			if (this.props.stopPropagation) {
				e.stopPropagation();
			}
		}
	};

	onMouseUp = (e) => {
		if (this.pressed) {
			if (this.started) {
				this.processEnd();
			} else {
				this.internal = false;
				this.pressed = false;
				this.forceUpdate();
				if (this.props.onClick) {
					this.props.onClick(e);
				}
			}
			e.preventDefault();
			if (this.props.stopPropagation) {
				e.stopPropagation();
			}
		}
	};

	processClick(e, clientX, clientY) {
		const container = this.container.current;
		this.scrollLeft = container.scrollLeft;
		this.scrollTop = container.scrollTop;
		this.clientX = clientX;
		this.clientY = clientY;
		this.pressed = true;
	}

	processStart(changeCursor = true) {
		const { onStartScroll } = this.props;

		this.started = true;

		// Add the class to change displayed cursor
		if (changeCursor) {
			document.body.classList.add('indiana-dragging');
		}

		if (onStartScroll) {
			onStartScroll({
				external: !this.internal,
			});
		}
		this.forceUpdate();
	}

	// Process native scroll (scrollbar, mobile scroll)
	processScroll(e) {
		if (this.started) {
			const { onScroll } = this.props;
			if (onScroll) {
				onScroll({
					external: !this.internal,
				});
			}
		} else {
			this.processStart(false);
		}
	}

	// Process non-native scroll
	processMove(e, newClientX, newClientY) {
		const { horizontal, vertical, activationDistance, onScroll } = this.props;
		const container = this.container.current;

		if (!this.started) {
			if (
				(horizontal && Math.abs(newClientX - this.clientX) > activationDistance) ||
				(vertical && Math.abs(newClientY - this.clientY) > activationDistance)
			) {
				this.clientX = newClientX;
				this.clientY = newClientY;
				this.processStart();
			}
		} else {
			if (horizontal) {
				container.scrollLeft -= newClientX - this.clientX;
			}
			if (vertical) {
				container.scrollTop -= newClientY - this.clientY;
			}
			if (onScroll) {
				onScroll({ external: !this.internal });
			}
			this.clientX = newClientX;
			this.clientY = newClientY;
			this.scrollLeft = container.scrollLeft;
			this.scrollTop = container.scrollTop;
		}
	}

	processEnd() {
		const { onEndScroll } = this.props;
		const container = this.container.current;

		if (container && onEndScroll) {
			onEndScroll({
				external: !this.internal,
			});
		}

		this.pressed = false;
		this.started = false;
		this.scrolling = false;
		this.internal = false;

		document.body.classList.remove('indiana-dragging');
		this.forceUpdate();
	}

	getRef(el) {
		[this.container, this.props.innerRef].forEach((ref) => {
			if (ref) {
				if (typeof ref === 'function') {
					ref(el);
				} else {
					(ref as MutableRefObject<HTMLElement>).current = el;
				}
			}
		});
	}

	render() {
		const { children, draggingClassName, className, style, hideScrollbars, component: Component } = this.props;

		return (
			<Component
				className={classnames(
					className,
					this.pressed && draggingClassName,
					cn({
						dragging: this.pressed,
						'hide-scrollbars': hideScrollbars,
						'native-scroll': this.isMobile,
					}),
				)}
				style={style}
				ref={this.getRef}
				onScroll={this.onScroll}
			>
				{children}
			</Component>
		);
	}
}
