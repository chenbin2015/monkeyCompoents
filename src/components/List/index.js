import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import styles from './main.scss'

export default class List extends PureComponent {
  state = {
    screenHeight: 0
  }
  render() {
    const { dataSource, item, hasMore } = this.props
    return (
      <div>
        <div ref="list">
          { 
            dataSource.map((ele, index) => {
              return (item(ele, index))
            })
          }
        </div>
        <p className={styles.infinity}>{hasMore ? '加载中...' : '没有更多了'}</p>
      </div>
    )
  }

  componentDidMount() {
    const { item } = this.props
    if (!item) {
      console.error('The props "item" cannot be null!')
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
    const { panel, threshold, hasMore } = this.props
    var rect = this.refs.list.getBoundingClientRect()
    let value = rect.bottom - this.state.screenHeight
    if (value < threshold && hasMore) {
      this.pagination()
    }
  }

  pagination() {
    const { action, isFetching } = this.props
    if (!isFetching) {
      console.log('加载中')
      action()
    }
  }
}

List.propTypes = {
  dataSource: PropTypes.array,
  item: PropTypes.func,
  hasMore: PropTypes.bool,
  action: PropTypes.func, // 具体加载下一页的事件
  threshold: PropTypes.number, // 加载的阈值
  isFetching: PropTypes.bool
}

List.defaultProps = {
  dataSource: [],
  item: null,
  hasMore: false,
  action: () => {},
  threshold: 100,
  isFetching: false
}