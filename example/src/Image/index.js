import React, { Component } from 'react'
import bem from 'easy-bem'
import ScrollContainer from 'react-indiana-drag-scroll'
import background from './background.jpg'
import './style.css'

const cn = bem('image-example')

export default class Image extends Component {
  render () {
    return (
      <div className={cn()}>
        <ScrollContainer
          className={cn('container')}
          nativeMobileScroll={false}
          onStartScroll={(...args) => { console.log('onStartScroll', args) }}
          onScroll={(...args) => { console.log('onScroll', args) }}
          onEndScroll={(...args) => { console.log('onEndScroll', args) }}
        >
          <img className={cn('image')} src={background} />
        </ScrollContainer>
      </div>
    )
  }
}
