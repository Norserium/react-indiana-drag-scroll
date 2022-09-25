import { useEffect, useLayoutEffect } from 'react';

export function useIsomorphicLayoutEffect() {
	return typeof window !== 'undefined' ? useLayoutEffect : useEffect;
}
