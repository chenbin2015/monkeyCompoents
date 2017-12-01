import React, { Component } from 'react'
import PropTypes from 'prop-types'

// @pureRender
export default class Test extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.render
  }
  render() {
    const { selectedIndex, index, text } = this.props
    return (
      <div style={{background: selectedIndex == index ? '#f00' : '#333', width: '100px', height: '100px', margin: '10px'}}>
        {text}
      </div>
    )
  }
}

Test.propTypes = {
  selectedIndex: PropTypes.number,
  index: PropTypes.number
}

Test.defaultProps = {
  selectedIndex: -1,
  index: 0
}