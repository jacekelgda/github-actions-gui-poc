import React, { Component } from 'react'
import { withBus } from 'react-bus'
import './css/Action.css'
import EditPanel from './EditPanel'
import AssetsStore from '../store/AssetsStore'

const Action = withBus()(class Action extends Component {
    render () {
        return (<div className="action">
        <div className="info">
          <div className="border-mask" />
          <div className="handleButton" />
          <h4>New action</h4>
          <div className="details">
            <p>Action details</p>
          </div>
          <EditPanel store={new AssetsStore()} />
          <div className="handle" />
        </div>
      </div>)
    }
})

export default Action
