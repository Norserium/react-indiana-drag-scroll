import React, { Component } from 'react'
// @ts-ignore
import bem from 'easy-bem'
import ScrollContainer from 'react-indiana-drag-scroll'
import './style.css'

const cn = bem('image-example')

export default class Image extends Component {
  render () {
    return (
      <div className={cn()}>
        <ScrollContainer
          className={cn('container')}
          nativeMobileScroll={false}
          onStartScroll={(...args: any) => { console.log('onStartScroll', args) }}
          onScroll={(...args: any) => { console.log('onScroll', args) }}
          onClick={(...args: any) => { console.log('onClick', args) }}
          onEndScroll={(...args: any) => { console.log('onEndScroll', args) }}
        >
          <img className={cn('image')} src={require('./background.jpg')} />
        </ScrollContainer>
      </div>
    )
  }
}
