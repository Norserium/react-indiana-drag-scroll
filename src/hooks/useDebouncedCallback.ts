import { useRef } from 'react';
import { debounce } from '../utils';
import { useReactiveRef } from './useReactiveRef';

export function useDebouncedCallback(callback: () => void, delay: number) {
	const invokingFunction = useReactiveRef(callback);
	const invokingDelay = useReactiveRef(delay);
	const debouncedFunction = useRef(
		debounce(
			() => {
				invokingFunction.current?.();
			},
			() => invokingDelay.current,
		),
	);

	return debouncedFunction.current;
}
