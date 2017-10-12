import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './main.scss'

export default class circleProcess extends Component {
  constructor(props) {
    super(props)

    this.state = {}

  }
  componentDidMount() {
    const { options } = this.props
    this.canvas = this.refs.c
    this.ctx = this.canvas.getContext('2d')
    this.radius = options.radius || 25
    this.lineWidth = options.lineWidth || 2
    this.fontSize = options.fontSize || 12
    this._circleX = this.canvas.width / 2 // 中心x坐标
    this._circleY = this.canvas.height / 2 // 中心y坐标
    this.process = options.process || 0
    this._tempProcess = 0
    this._fullPercent = 100
    this.intervalObj = null
    this.draw()
  }

  draw = () => {
    this.intervalObj = setInterval(() => {
      this.init()
    }, 20)
  }
  init = () => {
    if (this._tempProcess >= this.process) {
      clearInterval(this.intervalObj)
    }

    // 清除canvas内容
    this.ctx.clearRect(0, 0, this._circleX * 2, this._circleY * 2)

    // 中间的字
    this.ctx.font = this.fontSize + 'px April'
    this.ctx.textAlign = 'center'
    this.ctx.textBaseline = 'middle'
    this.ctx.fillStyle = '#999'
    this.ctx.fillText(parseFloat(this._tempProcess).toFixed(0) + '%', this._circleX, this._circleY)

    // 圆形
    this.drawCircle()

    // 圆弧
    this.drawArc()

    // 控制结束时动画的速度
    if (this._tempProcess / this._fullPercent > 0.90) {
      this._tempProcess += 0.30
    } else if (this._tempProcess / this._fullPercent > 0.80) {
      this._tempProcess += 0.55
    } else if (this._tempProcess / this._fullPercent > 0.70) {
      this._tempProcess += 0.75
    } else {
      this._tempProcess += 1.0
    }
  }
  drawCircle = () => {
    this.ctx.beginPath()
    this.ctx.moveTo(this._circleX + this.radius, this._circleY)
    this.ctx.lineWidth = this.lineWidth
    this.ctx.strokeStyle = '#eee'
    this.ctx.arc(this._circleX, this._circleY, this.radius, 0, Math.PI * 2)
    this.ctx.closePath()
    this.ctx.stroke()
  }
  drawArc = () => {

    this.ctx.beginPath()
    this.ctx.lineWidth = this.lineWidth

    // 渐变色 - 可自定义
    var linGrad = this.ctx.createLinearGradient(
      this._circleX, this._circleY - this.radius - this.lineWidth, this._circleX, this._circleY + this.radius + this.lineWidth
    )
    linGrad.addColorStop(0.0, '#ff397e')
    linGrad.addColorStop(1.0, '#ff397e')
    this.ctx.strokeStyle = linGrad

    // 圆弧两端的样式
    this.ctx.lineCap = 'round'
    // 圆弧
    this.ctx.arc(
      this._circleX, this._circleY, this.radius, -(Math.PI / 2),
      (this._tempProcess / 100 * 360) * (Math.PI / 180.0) - (Math.PI / 2),
      false
    );
    this.ctx.stroke()
  }
  render() {
    const { options } = this.props
    return ( 
    	<canvas ref = 'c' width="88" height="88" > </canvas>
    )
  }
}

circleProcess.propTypes = {
  options: PropTypes.object
}

circleProcess.defaultProps = {
  options: {}
}