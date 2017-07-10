import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as demoActions from '../../actions/demo'
import Swiper from '../../components/Swiper'
import Area from '../../components/Area'
import Select from '../../components/Select'
import Switch from '../../components/Switch'
import Button from '../../components/Button'
import Confirm from '../../components/Confirm'
import Infinity from '../../components/Infinity'
import List from '../../components/List'
import styles from './main.scss'

class ListDemo extends Component {
  state = {
    sex: [{
      label: '请选择性别',
      value: '-1'
    }, {
      label: '男',
      value: '0'
    }, {
      label: '女',
      value: '1'
    }],
    autoSend: false,
    visible: false,
    swiperData: [
      {
        url: 'https://www.baidu.com',
        img: 'http://img.zcool.cn/community/01903955448a250000019ae9351fcc.jpg@2o.jpg'
      },
      {
        url: 'https://www.163.com',
        img: 'http://img.zcool.cn/community/01aa2056e7aba96ac72558850d314b.jpg'
      },
      {
        url: 'https://www.qq.com',
        img: 'http://img.zcool.cn/community/01fa00574ea43732f875a4296255ae.jpg'
      },
      {
        url: 'https://www.sina.com.cn',
        img: 'http://img2.yiihuu.com/upimg/seonews/2016/07/15/01c4eb5747bebf6ac72525ae7d6e98.jpg'
      }
    ],
    count: 1
  }

  handleGetArea = (value) => {
    console.log(value)
  }

  handleSexChange = (option) => {
    this.setState({
      value: option
    }, () => {
      console.log(this.state.value)
    })
  }

  handleSwitchChange = (autoSend) => {
    this.setState({
      autoSend
    })
  }
 
  handleSubmit = () => {
    this.setState({
      visible: true
    })
  }
 
  handleConfirm = () => {
    this.setState({
      visible: false
    })
    console.log('确定了')
  }

  handleCancel = () => {
    this.setState({
      visible: false
    })
    console.log('取消了')
  }

  render() {
    const { dataList, getList, isFetching, pageIndex, hasMore } = this.props
    return (
      <div>
        <Swiper data={this.state.swiperData} />
        <ul className={styles.list}>
          <li>
            <label>请选择地区：</label> <Area onConfirm={ this.handleGetArea }/>
          </li>
          <li>
            <label>请选择性别：</label> <Select customClass={styles.sex} options={ this.state.sex } value={this.state.value} onChange={ this.handleSexChange } />
          </li>
          <li>
            <label>自动发送信息：</label> <Switch value={this.state.autoSend} disable={false} onChange={this.handleSwitchChange} />
          </li>
          <li className={styles.submit}>
            <Button onClick={ this.handleSubmit } />
          </li>
        </ul>
        <Confirm visible={this.state.visible} text="您当前填写的内容比较重要，请再次确认，确定提交吗？" onConfirm={this.handleConfirm} onCancel={this.handleCancel} />
        <div className={styles.news} >
          <List dataSource={dataList} isFetching={isFetching} hasMore={hasMore} item={(ele, key) => <div key={key}>{ele.title}</div>} action={() => { getList(pageIndex) }} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return state.demo
}

const mapDispatchToProps = dispatch => bindActionCreators(demoActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ListDemo)