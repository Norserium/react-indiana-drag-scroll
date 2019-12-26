import { CSSProperties, FC, ReactNode, Ref } from "react";

declare const ScrollContainer: FC<{
  vertical?: boolean;
  horizontal?: boolean;
  hideScrollbars?: boolean;
  activationDistance?: number;
  children?: ReactNode;
  onStartScroll?: (
    scrollLeft: number,
    scrollTop: number,
    scrollWidth: number,
    scrollHeight: number
  ) => void;
  onScroll?: (
    scrollLeft: number,
    scrollTop: number,
    scrollWidth: number,
    scrollHeight: number
  ) => void;
  onEndScroll?: (
    scrollLeft: number,
    scrollTop: number,
    scrollWidth: number,
    scrollHeight: number
  ) => void;
  className?: string;
  style?: CSSProperties;
  ignoreElements?: string;
  nativeMobileScroll?: boolean;
  ref?: MutableRefObject<any>;
}>;

export default ScrollContainer;
