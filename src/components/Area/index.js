import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import areas from '../../common/js/areaData'
import styles from './main.scss'

export default class Area extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      lineWidth: 0,
      lineLeft: 0,
      bottom: '-1000',
      provinces: [],
      cities: [],
      countries: [],
      visible: false,
      selectedValue: {
        p: {
          text: '',
          value: ''
        },
        c: {
          text: '',
          value: ''
        },
        a: {
          text: '',
          value: ''
        }
      },
      currentPanel: 0 // 0 省，1市，2县
    }
  }

  componentDidMount() {
    const { bombBox, province } = this.refs
    this.setState({
      lineWidth: province.getBoundingClientRect().width,
      lineLeft: province.getBoundingClientRect().left
    })
  }

  handleIsShowBombBox = (e) => {
    this.setState({
      visible: !this.state.visible
    }, () => {
      this.state.visible && this.setLinePosition()
      this.state.visible && this.setSelectedOptionPosition()     
    })
    e.target.blur()
  }

  handleProvinceClick = (e) => {
    this.setState({
      selectedValue: Object.assign({}, this.state.selectedValue, { 
        p: {
          value: e.target.value,
          text: e.target.innerHTML
        }, 
        c: {
          value: -1,
          text: '请选择'
        },
        a: {
          value: -1,
          text: ''
        } 
      }),
      cities: []
    })

    const { list } = this.refs
    list.scrollTop = 0
    areas.map((ele) => {
      if (ele.i == e.target.value) {
        let cities = []
        ele.c.map((childEle) => {
          let temp = {
            text: childEle.v,
            value: childEle.i
          }
          cities.push(temp)
        })
        this.setState({
          cities,
          currentPanel: 1
        }, () => {
          this.setLinePosition()
        })
      }
    })
  }

  handleCityClick = (e) => {
    this.setState({
      selectedValue: Object.assign({}, this.state.selectedValue, { 
        c: {
          value: e.target.value,
          text: e.target.innerHTML
        }, 
        a: {
          value: -1,
          text: '请选择'
        }
      }),
      countries: []
    }, () => {
      const { selectedValue } = this.state
      const { list } = this.refs
      list.scrollTop = 0

      areas.map((ele) => {
        if (ele.i == selectedValue.p.value) {
          ele.c.map((childEle) => {
            if (childEle.i == selectedValue.c.value) {
              let countries = []
              childEle.c.map((leafEle) => {
                let temp = {
                  text: leafEle.v,
                  value: leafEle.i
                }
                countries.push(temp)
              })
              this.setState({
                countries,
                currentPanel: 2
              }, () => {
                this.setLinePosition()
              })
            }
          })
        }
      })
    })
  }

  handleCountryChange = (e) => {
    const { onConfirm } = this.props
    this.setState({
      selectedValue: Object.assign({}, this.state.selectedValue, { 
        a: {
          value: e.target.value,
          text: e.target.innerHTML
        }
      }),
      visible: false
    }, () => {
      const { p, c, a } = this.state.selectedValue
      if (p.value != -1 && c.value != -1 && a.value != -1) {
        onConfirm(`${p.value}_${c.value}_${a.value}`)
      }
    })
  }

  handleTabChange = (e) => {
    const { target } = e
    var spans = e.currentTarget.querySelectorAll('span')
    for (var i = 0; i < spans.length; i++) {
      if (spans[i] == target) {
        this.setState({
          currentPanel: i
        }, () => {
          this.setLinePosition()
          this.setSelectedOptionPosition()
        })
      }   
    }
  }

  // 当选择了选项，要将选择的选项置顶
  setSelectedOptionPosition() {
    const { currentPanel } = this.state
    const { list, provinces, cities, countries } = this.refs
    let currentSelectedOject = null
    list.scrollTop = 0
    if (currentPanel == 0) {
      currentSelectedOject = provinces.querySelector(`.${styles.selected}`)
      if (currentSelectedOject) {
        list.scrollTop = currentSelectedOject.getBoundingClientRect().top - list.getBoundingClientRect().top
      }
    } else if (currentPanel == 1) {
      currentSelectedOject = cities.querySelector(`.${styles.selected}`)
      if (currentSelectedOject) {
        list.scrollTop = currentSelectedOject.getBoundingClientRect().top - list.getBoundingClientRect().top
      }
    } else if (currentPanel == 2) {
      currentSelectedOject = countries.querySelector(`.${styles.selected}`)
      if (currentSelectedOject) {
        list.scrollTop = currentSelectedOject.getBoundingClientRect().top - list.getBoundingClientRect().top
      }
    }
  }

  // 设置红线的位置
  setLinePosition() {
    const { currentPanel } = this.state
    let lineWidth = 0, lineLeft = 0
    const { province, city, country } = this.refs
    if (currentPanel == 0) {
      lineWidth = province.getBoundingClientRect().width
      lineLeft = province.getBoundingClientRect().left
    } else if (currentPanel == 1) {
      lineWidth = city.getBoundingClientRect().width
      lineLeft = city.getBoundingClientRect().left
    } else if (currentPanel == 2) {
      lineWidth = country.getBoundingClientRect().width
      lineLeft = country.getBoundingClientRect().left
    }
    this.setState({
      lineWidth,
      lineLeft
    })
  }

  renderProvince() {
    const { cities, countries, currentPanel, selectedValue, visible } = this.state
    let style = ''
    if (currentPanel == 0) {
      style = {
        'transform': 'translate(0px)',
        'WebkitTransform': 'translate(0px)'
      }
    } else if (currentPanel == 1) {
      style = {
        'transform': 'translate(-20rem)',
        'WebkitTransform': 'translate(-20rem)'
      }
    } else if (currentPanel == 2) {
      style = {
        'transform': 'translate(-40rem)',
        'WebkitTransform': 'translate(-40rem)'
      }
    }
    if (areas && areas.length > 0) {
      return (
        <div className={styles.list} ref="list" style={style}>
          <ul ref="provinces">
            {
              areas.map((ele, index) => {
                return (
                  <li className={selectedValue.p.value == ele.i ? styles.selected : ''} key={index} value={ele.i} onClick={this.handleProvinceClick}>{ele.v}</li>
                )
              })
            }
          </ul>
          <ul ref="cities">
            {
              cities.map((ele, index) => {
                return (
                  <li className={selectedValue.c.value == ele.value ? styles.selected : ''} key={index} value={ele.value} onClick={this.handleCityClick}>{ele.text}</li>
                )
              })
            }
          </ul>
          <ul ref="countries">
            {
              countries.map((ele, index) => {
                return (
                  <li className={ selectedValue.a.value == ele.value ? styles.selected : '' } key={index} value={ele.value} onClick={this.handleCountryChange}>{ele.text}</li>
                )
              })
            }
          </ul>
        </div>
      )
    }
    return null
  }

  renderDim() {
    const { visible } = this.state
    if (visible) {
      return (
        <div className={styles.dim} onClick={this.handleIsShowBombBox}></div>
      )
    }
  }

  renderContent() {
    const { lineWidth, lineLeft, bottom, selectedValue, visible } = this.state
    const { title, placeholder } = this.props
    return (
      <div className={styles.bombBox} ref="bombBox" style={{ height: visible ? '' : `0px` }} >
        <div className={styles.title}>
          { title }
          <div className={styles.close} onClick={this.handleIsShowBombBox}>
           ✘
          </div>
        </div>
        <div className={styles.result} onClick={this.handleTabChange}>
          <span ref="province">{selectedValue.p.text.length > 0 ? selectedValue.p.text : '请选择'}</span>
          <span ref="city">{selectedValue.c.text}</span>
          <span ref="country">{selectedValue.a.text}</span>
          <p style={{ width: `${lineWidth}px`, left: `${lineLeft}px` }} className={styles.line}></p>
        </div>
        { this.renderProvince() }
      </div>
    )
  }

  render() {
    const { placeholder } = this.props
    let value = ''
    const { selectedValue } = this.state
    const { p, c, a } = selectedValue
    if (p.value != -1 && c.value != -1 && a.value != -1) {
      value = selectedValue.p.text + selectedValue.c.text + selectedValue.a.text
    }
    return (
      <div className={styles.area}>
        <div className={styles.input}>
          <input value={value} placeholder={placeholder} className={styles.input} readOnly="true" onClick={ this.handleIsShowBombBox } />
        </div>
        { this.renderDim() }
        { this.renderContent() }
      </div>
    )
  }
}

Area.propTypes = {
  onConfirm: PropTypes.func,
  placeholder: PropTypes.string,
  title: PropTypes.string
}

Area.defaultProps = {
  onConfirm: () => {},
  placeholder: '请选择收货人所在地区',
  title: '所在地区'
}
