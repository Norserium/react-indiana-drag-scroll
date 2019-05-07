# React Indiana Drag Scroll

> Implements scroll on drag

[![NPM](https://img.shields.io/npm/v/react-indiana-drag-scroll.svg)](https://www.npmjs.com/package/react-indiana-drag-scroll) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Welcome to journey!

![](https://github.com/norserium/react-indiana-drag-scroll/blob/master/example/demo.gif?raw=true)

Try it yourself! Go to [demo website](https://norserium.github.io/react-indiana-drag-scroll/).

## Install

```bash
npm install --save react-indiana-drag-scroll
```

```bash
yarn add react-indiana-drag-scroll
```

## Usage

```jsx
import React, { Component } from 'react'

import ScrollContainer from 'react-indiana-drag-scroll'

class Example extends Component {
  render () {
    return (
      <ScrollContainer className="scroll-container">
        { ... }
      </ScrollContainer>
    )
  }
}
```

## Component properties

| Prop               | Type     | Description                                                                               | Default |
| ------------------ | -------- | ----------------------------------------------------------------------------------------- | ------- |
| vertical           | Bool     | Allow vertical drag scrolling                                                             | true    |
| horizontal         | Bool     | Allow horizontal drag scrolling                                                           | true    |
| hideScrollbars     | Bool     | Hide the scrollbars                                                                       | true    |
| activationDistance | Number   | The distance that distinguish click and drag start                                        | 10      |
| children           | Node     | The content of scrolling container                                                        |
| onScroll           | Function | Invoked when user scrolling container                                                     |
| onEndScroll        | Function | Invoked when user ends scrolling container                                                |
| onStartScroll      | Function | Invoked when user starts scrolling container                                              |
| className          | String   | The custom classname for container                                                        |
| style              | Number   | The custom styles for container                                                           |
| ignoreElements     | String   | Selector for elements that should not trigger the scrolling behaviour (for example, ".modal, dialog" or "\*[prevent-drag-scroll]") |

## License

The source code is licensed under MIT, all images (except [hieroglyphs](https://www.freepik.com/free-vector/ancient-egypt-hieroglyphics-background-with-flat-design_2754100.htm)) are copyrighted to their respective owner © [Norserium](https://github.com/norserium)
