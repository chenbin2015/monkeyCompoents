import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { isEqual } from 'lodash' 
import * as HelloWorldActions from '../../actions/HelloWorld'
import Tabs from '../../components/Tabs'
import reset from '../../common/css/reset.scss'
class App extends Component {
  state = {
    tabList: [
      {
        text: '首页',
        img: 'http://userpic-10004025.image.myqcloud.com/600a7bf6-fc83-4f71-b883-0a0f6cf80dbe',
        url: '/about',
        color: '#f00'
      },
      {
        text: '组件演示',
        img: 'http://userpic-10004025.image.myqcloud.com/63969eea-2649-4395-a4d7-4b2e16ba33ce',
        url: '/demo'
      },
      {
        text: '组件说明',
        img: 'http://userpic-10004025.image.myqcloud.com/c36c00e5-489b-4a98-b7ce-1a7fc3868871',
        url: '/api'
      },
      {
        text: '陈斌',
        img: 'http://userpic-10004025.image.myqcloud.com/63977adb-893e-43e9-99e1-033722ce4459',
        url: '/concact'
      }
    ]
  }

  componentWillReceiveProps(nextProps, nextState) {
    const { pathname } = nextProps.location
    let tabList = Object.assign([], this.state.tabList)
    tabList.map((ele) => {
      if (ele.url == pathname) {
        ele.color = '#f00'
      } else {
        ele.color = ''
      }
    })
    this.setState({
      tabList
    })
    return true
  }

  render() {
    const { tabList } = this.state
    return (
      <div>
        {this.props.children}
        <Tabs lists={tabList} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { helloChan: state.helloChan }
}

const mapDispatchToProps = dispatch => ({
  helloWorldActons: bindActionCreators(HelloWorldActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
