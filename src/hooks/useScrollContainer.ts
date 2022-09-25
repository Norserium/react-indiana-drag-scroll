import { CSSProperties, RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { isDraggable, isObject, isScrollableHorizontally, isScrollableVertically } from '../utils';
import { useDebouncedCallback } from './useDebouncedCallback';
import { useReactiveRef } from './useReactiveRef';
import {
	BasicScrollOptions,
	DefaultScrollOptions,
	MouseButton,
	ScrollContainerCustomizedProps,
	ScrollContainerDefaultProps,
} from '../types';
import { defaultMouseScrollImplementation } from '../core/DefaultArtificialScroll';

interface OriginalStyles {
	body: CSSProperties;
	reference: CSSProperties;
}

export function useScrollContainer<Options>(
	props: ScrollContainerCustomizedProps<Options> | ScrollContainerDefaultProps = { mouseScroll: true },
) {
	const reference = useRef<HTMLElement | null>(null);

	const framerate = (1 / 60) * 1000;

	const state = useRef({
		// Is container scrolling now
		scrolling: false,
		// Is scrolling started
		started: false,
		// Is touch active or mouse pressed down
		pressed: false,
		// Is the scroll artificial
		artificial: false,
		// Is it mouse
		mouse: false,
	});

	const mouseScroll = useRef({
		active: {
			left: false,
			top: false,
		},
		initialClick: {
			left: 0,
			top: 0,
		},
		speedX: 0,
		speedY: 0,
		clientX: 0,
		clientY: 0,
	});

	const originalStyles = useRef<OriginalStyles>({
		body: {},
		reference: {},
	});

	const allSettings = useReactiveRef(props);

	const scrollSettings = useReactiveRef({
		activationDistance: 20,
		cursor: true,
		buttons: [MouseButton.Left],
		...(isObject(allSettings.current.mouseScroll) ? allSettings.current.mouseScroll : {}),
	});

	const [artificialScroll] = useState(
		'mouseScrollImplementation' in props
			? props.mouseScrollImplementation(reference, scrollSettings as RefObject<Options & BasicScrollOptions>)
			: defaultMouseScrollImplementation(
					reference,
					scrollSettings as RefObject<DefaultScrollOptions & BasicScrollOptions>,
			  ),
	);

	const processMouseClick = (clientX: number, clientY: number) => {
		mouseScroll.current.speedY = 0;
		mouseScroll.current.speedX = 0;
		mouseScroll.current.clientX = clientX;
		mouseScroll.current.clientY = clientY;
		mouseScroll.current.active.left = false;
		mouseScroll.current.active.top = false;
		mouseScroll.current.initialClick.top = clientY;
		mouseScroll.current.initialClick.left = clientX;
		state.current.mouse = true;
		state.current.pressed = true;
		artificialScroll.cancel();
	};

	const processMouseMove = (newClientX: number, newClientY: number) => {
		const { activationDistance, cursor } = scrollSettings.current;

		if (Math.abs(newClientX - mouseScroll.current.initialClick.left) > activationDistance) {
			mouseScroll.current.active.left = true;
		}
		if (Math.abs(newClientY - mouseScroll.current.initialClick.top) > activationDistance) {
			mouseScroll.current.active.top = true;
		}

		const diff = {
			left: mouseScroll.current.active.left ? mouseScroll.current.clientX - newClientX : 0,
			top: mouseScroll.current.active.top ? mouseScroll.current.clientY - newClientY : 0,
		};

		if (artificialScroll.active) {
			if (state.current.pressed) {
				mouseScroll.current.speedX = diff.left / framerate;
				mouseScroll.current.speedY = diff.top / framerate;
				mouseScroll.current.clientX = newClientX;
				mouseScroll.current.clientY = newClientY;
				artificialScroll.scroll(diff);
				window.requestAnimationFrame(() => {
					mouseScroll.current.speedX = 0;
					mouseScroll.current.speedY = 0;
				});
			}
		} else if (mouseScroll.current.active.top || mouseScroll.current.active.left) {
			artificialScroll.start(diff);
			mouseScroll.current.clientX = newClientX;
			mouseScroll.current.clientY = newClientY;
			state.current.artificial = true;

			if (cursor) {
				originalStyles.current.body.cursor = document.body.style.cursor;
				document.body.style.cursor = 'grabbing';
				if (reference.current) {
					originalStyles.current.reference.cursor = reference.current.style.cursor;
					reference.current.style.cursor = 'grabbing';
				}
			}
		}
	};

	const processScrollStart = () => {
		state.current.started = true;
		allSettings.current.onStartScroll?.();
	};

	const processScrollEnd = () => {
		const cleanup = () => {
			window.requestAnimationFrame(() => {
				allSettings.current.onEndScroll?.();
				state.current.started = false;
				state.current.scrolling = false;
				state.current.artificial = false;
			});
		};
		if (state.current.artificial) {
			artificialScroll.end(
				{
					left: mouseScroll.current.speedX,
					top: mouseScroll.current.speedY,
				},
				cleanup,
			);
		} else {
			cleanup();
		}
	};

	const onMouseDown = (e: MouseEvent) => {
		const { ignoreElements } = scrollSettings.current;
		if (allSettings.current.mouseScroll) {
			if (
				isDraggable(e.target as HTMLElement | null, reference.current, ignoreElements) &&
				(isScrollableHorizontally(reference.current) || isScrollableVertically(reference.current))
			) {
				const { buttons } = scrollSettings.current;
				if (buttons.indexOf(e.buttons) !== -1) {
					processMouseClick(e.clientX, e.clientY);
				}
			}
		}
	};

	const onMouseMove = (e: MouseEvent) => {
		if (allSettings.current.mouseScroll) {
			if (state.current.pressed && state.current.mouse) {
				processMouseMove(e.clientX, e.clientY);
				e.preventDefault();
				e.stopPropagation();
			}
		}
	};

	const onMouseUp = () => {
		if (state.current.pressed) {
			if (artificialScroll.active) {
				processScrollEnd();
			}
			state.current.pressed = false;
			state.current.mouse = false;
			restoreStyles();
		}
	};

	const restoreStyles = () => {
		const { cursor } = scrollSettings.current;
		// Return the original cursor
		if (cursor) {
			document.body.style.cursor = originalStyles.current.body.cursor || '';
			if (reference.current) {
				reference.current.style.cursor = originalStyles.current.reference.cursor || '';
			}
		}
	};

	const onTouchStart = () => {
		state.current.artificial = false;
		state.current.pressed = true;
	};

	const onTouchEnd = () => {
		if (state.current.pressed) {
			// Function `processScrollEnd` is not called when scrolling is active, because it will be called
			// after the scrolling is over
			if (state.current.started && !state.current.scrolling) {
				processScrollEnd();
			}
			state.current.pressed = false;
		}
	};

	const onScroll = () => {
		// That's the only place where `scrolling` flag is set, it means that the scrolling is going on
		state.current.scrolling = true;

		if (state.current.started) {
			// If scroll is started inform the consumer about every container scroll (except overflow and global scrolls)
			allSettings.current.onScroll?.();
		} else {
			// If scroll is not started and container is scrolling it's definitely not artificial scroll
			processScrollStart();
		}
		// If it's not artificial scroll, start debounced onEndScroll to process the touch scroll inertia
		onEndScroll();
	};

	// The antagonist of `onScroll`
	const onEndScroll = useDebouncedCallback(() => {
		const { pressed, started, artificial } = state.current;
		if (!pressed && started && !artificial) {
			processScrollEnd();
		}
		state.current.scrolling = false;
	}, 250);

	const setReference = useCallback((node) => {
		if (reference.current !== node) {
			// Remove old listeners
			if (reference.current) {
				reference.current.removeEventListener('mousedown', onMouseDown);
				reference.current.removeEventListener('scroll', onScroll);
				reference.current.removeEventListener('touchstart', onTouchStart);
			}
			// Add the new ones
			reference.current = node;
			if (reference.current) {
				reference.current.addEventListener('mousedown', onMouseDown, {
					passive: false,
				});
				reference.current.addEventListener('scroll', onScroll, {
					passive: false,
				});
				reference.current.addEventListener('touchstart', onTouchStart);
			}
		}
	}, []);

	useEffect(() => {
		window.addEventListener('mouseup', onMouseUp);
		window.addEventListener('mousemove', onMouseMove);
		window.addEventListener('touchend', onTouchEnd);
		return () => {
			window.removeEventListener('mouseup', onMouseUp);
			window.removeEventListener('mousemove', onMouseMove);
			window.removeEventListener('touchend', onTouchEnd);
			restoreStyles();
		};
	}, []);

	return {
		ref: setReference,
	};
}
