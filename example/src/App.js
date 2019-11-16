import React, { Component } from 'react'
import bem from 'easy-bem'
import Indiana from './Indiana'
import Scrollbars from './Scrollbars'
import Image from './Image'

const cn = bem('example-application')

export default class App extends Component {
  constructor(props) {
    super(props)
    this.examples = [
      {
        element: <Indiana />,
        title: 'Example with default options'
      },
      {
        element: <Scrollbars />,
        title: 'Example with scrollbars'
      },
      {
        element: <Image />,
        title: 'Example with non-native mobile scrolling'
      }
    ]
    this.state = { currentExample: 0 }
  }

  render () {
    const {currentExample} = this.state
    return (
      <div className={cn()}>
        <div className={cn('container')}>
          {this.examples[currentExample].element}
        </div>
        <div className={cn('pages')}>
          {this.examples.map((el, index) => (
            <span
              title={el.title}
              className={cn('page', {active: index === currentExample})}
              onClick={() => this.setState({currentExample: index})}
            >
              {index + 1}
            </span>
          ))}
        </div>
      </div>
    )
  }
}
