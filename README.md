# React Indiana Drag Scroll

> Implements scroll on drag

[Examples](https://norserium.github.io/react-indiana-drag-scroll/) / [Documentation](https://norserium.github.io/react-indiana-drag-scroll/docs/intro) / [Sandbox](https://codesandbox.io/s/react-indiana-drag-scroll-v-3-e8g0tq?file=/src/index.tsx)

[![NPM](https://img.shields.io/npm/v/react-indiana-drag-scroll/next.svg)](https://www.npmjs.com/package/react-indiana-drag-scroll) <a href="https://npmcharts.com/compare/react-indiana-drag-scroll?minimal=true"><img src="https://img.shields.io/npm/dm/react-indiana-drag-scroll.svg?sanitize=true" alt="Downloads"></a> [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Welcome to journey!

![](https://github.com/norserium/react-indiana-drag-scroll/blob/master/example/demo.gif?raw=true)

Try it yourself! Go to [demo website](https://norserium.github.io/react-indiana-drag-scroll/).


## Install

> :fire: You're currently looking at the branch for the alpha release.  If you're looking for the stable branch, [please check out `master` branch](https://github.com/Norserium/react-indiana-drag-scroll).

```bash
npm install --save react-indiana-drag-scroll@next
```

```bashs
yarn add react-indiana-drag-scroll@next
```

## Usage

You can use the `ScrollContainer` component:

```jsx
import React, { Component } from 'react'
import { ScrollContainer } from 'react-indiana-drag-scroll';
import 'react-indiana-drag-scroll/dist/style.css'

export const Example = () => {
   return (
      <ScrollContainer>
         {/* scrollable content */}
      </ScrollContainer>
   )
};
```

Or, if you need to get more flexibility you can use `useScrollContainer` hook:
```jsx
import { useScrollContainer } from 'react-indiana-drag-scroll';

export const Example = () => {
    const scrollContainer = useScrollContainer(options);
    return (
      <div ref={scrollContainer.ref}>
        {/* scrollable content */}
      </div>
    )
};
```

In this case you should provide the corresponding styles by yourself (for example, `overflow: auto`).


## Props

| Prop               | Type           | Description                                                                               | Default |
| ------------------ | -------------- | ----------------------------------------------------------------------------------------- | ------- |
| hideScrollbars     | `boolean`      | Hide the scrollbars                                                                       | `true`  |
| children           | `ReactNode`    | The content of the scrolling container                                                    |
| onScroll           | `() => void`   | Invoked when user scrolls the container                                                   |
| onEndScroll        | `() => void`   | Invoked when scrolling is over completely                                                 |
| onStartScroll      | `() => void`   | Invoked when scrolling starts                                                             |
| component          | `ElementType`  | The component used for the root node.                                                     | `'div'`
| className          | `string`       | The custom classname for the container                                                    |
| style              | `CSSProperties`| The custom styles for the container                                                       |
| ref                | `ElementType`  | The ref to the root node (experimental alternative to `getElement`)                       |
| mouseScroll        | `Configuration`, `boolean` | The configuration of mouse scroll. The object's fields is described below    | `true`

### `Configuration`

| Field              | Type         | Description                                                                               | Default |
| ------------------ | ------------ | ----------------------------------------------------------------------------------------- | ------- |
| rubberBand         | `boolean`    | The flag that indicates that rubber band effect should be enabled                         | true    |
| inertia            | `boolean`    | The flag that indicates that inertial effect should be enabled                            | true    |
| overscroll         | `boolean`    | The flag that indicates that overscroll effect should be enabled (experimental)           | false   |
| cursor             | `boolean`    | The flag that indicates that cursor should be changed on drag                             | true    |
| activationDistance | Number       | The distance that distinguish click and drag start                                        | 10      |
| ignoreElements     | `string`     | Selector for elements that should not trigger the scrolling behaviour (for example, `".modal, dialog"` or `"*[prevent-drag-scroll]"`) |
| buttons            | `number[]`   | The list of mouse button numbers that will activate the scroll by drag                    | [1]

## License

The source code is licensed under MIT, all images (except [hieroglyphs](https://www.freepik.com/free-vector/ancient-egypt-hieroglyphics-background-with-flat-design_2754100.htm)) are copyrighted to their respective owner © [Norserium](https://github.com/norserium)
