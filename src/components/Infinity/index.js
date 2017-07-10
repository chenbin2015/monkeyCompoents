import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import styles from './main.scss'

export default class Infinity extends PureComponent {
  state = {
    screenHeight: 0
  }
  render() {
    const { hasMore } = this.props
    return (
      <div>
        {this.props.children}
        <p className={styles.infinity}>{hasMore ? '加载中...' : '没有更多了'}</p>
      </div>
    )
  }

  componentDidMount() {
    if (!this.props.children) {
      console.error('You must add a child!')
      return
    } else if (Object.prototype.toString.call(this.props.children) == '[object Array]' && this.props.children.length > 0) {
      console.error('Too many child')
      return
    }
    this.setState({
      screenHeight: window.innerHeight
    })
    window.addEventListener('scroll', this.scroll)
    this.pagination()
  }

  componentWillUnmount() {
    window.removeListener('scroll', this.scroll)
  }

  scroll = () => {
    const { panel, threshold } = this.props
    var rect = ReactDOM.findDOMNode(this).parentNode.getBoundingClientRect()
    let value = rect.bottom - this.state.screenHeight
    if (value < threshold) {
      this.pagination()
    }
  }

  pagination() {
    const { action, count, total, isFetching, hasMore } = this.props
    if (!isFetching && hasMore) {
      console.log('加载中')
      action()
    }
  }
}

Infinity.propTypes = {
  action: PropTypes.func, // 具体加载下一页的事件
  threshold: PropTypes.number, // 加载的阈值
  isFetching: PropTypes.bool,
  hasMore: PropTypes.bool
}

Infinity.defaultProps = {
  action: () => {},
  threshold: 100,
  isFetching: false,
  hasMore: true
}
