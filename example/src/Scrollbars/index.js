import React, { Component } from 'react'
import bem from 'easy-bem'
import ScrollContainer from 'react-indiana-drag-scroll'
import './style.css'

const cn = bem('scrollbars-example')

const COLS = 20
const ROWS = 20

export default class Scrollbars extends Component {
  constructor(props) {
    super(props)
    this.numbers = Array(ROWS).fill().map(
      (el, row) => (
        <div className={cn('row')} key={row}>
          {Array(COLS).fill().map(
            (el, col) => (
              <div className={cn('col')} key={`${row}_${col}`}>
                {row * COLS + col}
              </div>
            )
          )}
        </div>
      )
    )
  }

  render () {
    return (
      <div className={cn()}>
        <ScrollContainer
          className={cn('container')}
          hideScrollbars={false}
          onStartScroll={(...args) => { console.log('onStartScroll', args) }}
          onScroll={(...args) => { console.log('onScroll', args) }}
          onEndScroll={(...args) => { console.log('onEndScroll', args) }}
        >
          {this.numbers}
        </ScrollContainer>
      </div>
    )
  }
}
