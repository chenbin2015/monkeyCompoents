import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './main.scss'

export default class Swiper extends Component {
  state = {
    // 手指的起始位置
    startPosition: {
      x: 0,
      y: 0
    },
    // 位移
    displacement: {
      x: 0,
      y: 0
    },
    // 当前是哪一个item
    currentIndex: 0,
    // 临时存储的起始位置，结束位置
    temp: {
      startPosition: {
        x: 0,
        y: 0
      },
      endPosition: {
        x: 0,
        y: 0
      },
      displacement: 0
      
    },
    // 触发滑动的阈值
    threshold: 60,
    // 有多少个item
    itemCount: 0,
    loopTimeout: null
  }

  componentDidMount() {
    const { isLoop, duration } = this.props
    this.setState({
      itemCount: this.refs.content.children.length - 1
    })
    this.initEvent()
    let interval = setInterval(() => {
      isLoop && this.loop()
      clearInterval(interval)
    }, duration)
  }

  componentWillUnmount() {
    clearTimeout(this.state.loopTimeout)
  }

  // 初始化滑动事件
  initEvent() {
    const { swiperPanel, content } = this.refs

    swiperPanel.addEventListener('touchstart', () => {
      var tempStartPosition = {
        x: swiperPanel.getBoundingClientRect().left - content.getBoundingClientRect().left + event.touches[0].clientX,
        y: event.touches[0].clientY
      }
      var startTemp = Object.assign({}, this.state.temp)
      startTemp.startPosition.x = event.touches[0].clientX
      this.setState({
        startPosition: tempStartPosition,
        temp: startTemp
      })
    })

    swiperPanel.addEventListener('touchmove', () => {
      let currentPosition = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY
      }
      var tempDisplacement = {
        x: currentPosition.x - this.state.startPosition.x,
        y: currentPosition.y - this.state.startPosition.y
      }
      this.setState({
        displacement: tempDisplacement
      }, () => {
        content.style.transform = `translateX(${this.state.displacement.x}px)`
        content.style.transition = 'null'
      })
    })

    swiperPanel.addEventListener('touchend', () => {
      // 拉到最左边时
      if (this.state.displacement.x > 0) {
        let displacement = Object.assign({}, this.state.displacement)
        displacement.x = 0
        this.setState({
          displacement
        })
      }
      // 拉到最右边时
      if (content.getBoundingClientRect().left < 0) {
        if (Math.abs(content.getBoundingClientRect().left) + swiperPanel.getBoundingClientRect().left + swiperPanel.getBoundingClientRect().width > content.scrollWidth) {
          let displacement = Object.assign({}, this.state.displacement)
          displacement.x = -(content.scrollWidth - swiperPanel.getBoundingClientRect().width)
          this.setState({
            displacement
          })
        }
      }
      let temp = Object.assign({}, this.state.temp)
      temp.endPosition.x = event.changedTouches[0].clientX
      temp.displacement = temp.startPosition.x - temp.endPosition.x

      if (temp.displacement > 0) { // 向左
        if (temp.displacement > this.state.threshold) {
          this.setState(
            {
              currentIndex: this.state.currentIndex + 1
            }
          )
        }
      } else if (temp.displacement < 0) { // 向右
        if (Math.abs(temp.displacement) > this.state.threshold) {
          this.setState(
            {
              currentIndex: this.state.currentIndex - 1
            }
          )
        }
      }
      // 如果已经是最后一个
      if (this.state.currentIndex > this.state.itemCount) {
        this.setState({
          currentIndex: this.state.itemCount
        })
      }
      // 如果已经是第一个
      if (this.state.currentIndex < 0) {
        this.setState({
          currentIndex: 0
        })
      }
      var tempDisplacement = -this.state.currentIndex * swiperPanel.clientWidth
      content.style.transform = `translateX(${tempDisplacement}px)`
      content.style.transition = 'all .5s'
    })
  }

  loop = () => {
    const { duration } = this.props
    this.setState({
      currentIndex: this.state.currentIndex + 1
    }, () => {
      if (this.state.currentIndex > this.state.itemCount) {
        this.setState({
          currentIndex: 0
        }, this.setTransform)
      }
      this.setTransform()
      this.setState({
        loopTimeout: setTimeout(this.loop, duration)
      })
    })
  }

  setTransform() {
    const { swiperPanel, content } = this.refs
    var tempDisplacement = -this.state.currentIndex * swiperPanel.clientWidth
    content.style.transform = `translateX(${tempDisplacement}px)`
    content.style.transition = 'all .5s'
  }

  render() {
    const { wrap, content, data } = this.props
    return ( 
      <div className = {styles.panel} ref="swiperPanel">
        <ul ref="content">
          {
            data.map((ele, index) => {
              return (
                <li key={index}>
                  <a href={ele.url}>
                    <img src={ele.img} />
                  </a>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

Swiper.propTypes = {
  threshold: PropTypes.number, // 滚动的阈值
  duration: PropTypes.number, // 滚动的间隔
  isLoop: PropTypes.bool, // 是否支持循环
  data: PropTypes.array
}

Swiper.defaultProps = {
  threshold: 100,
  duration: 5000,
  isLoop: true,
  data: []
}
