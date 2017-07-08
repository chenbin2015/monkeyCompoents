import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import styles from './main.scss'

export default class Infinity extends PureComponent {
  state = {
    screenHeight: 0
  }
  render() {
    const { count, total } = this.props
    return (
      <div>
        {this.props.children}
        <p className={styles.infinity}>{count == total ? '没有更多了' : '加载中...'}</p>
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

  scroll = () => {
    const { panel, threshold } = this.props
    var rect = document.querySelector(`#${panel}`).getBoundingClientRect()
    let value = rect.bottom - this.state.screenHeight
    if (value < threshold) {
      this.pagination()
    }
  }

  pagination() {
    const { action, count, total, isFetching } = this.props
    if (!isFetching && count < total) {
      console.log('加载中')
      action()
    }
  }
}

Infinity.propTypes = {
  action: PropTypes.func, // 具体加载下一页的事件
  threshold: PropTypes.number, // 加载的阈值
  count: PropTypes.number, // 当前的条数
  total: PropTypes.number, // 总数
  panel: PropTypes.string, // 要滑动加载更多的容器
  isFetching: PropTypes.bool
}

Infinity.defaultProps = {
  action: () => {},
  threshold: 100,
  count: 0,
  total: 0,
  panel: '',
  isFetching: false
}
