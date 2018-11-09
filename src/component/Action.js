import React, { Component } from 'react'
import { withBus } from 'react-bus'
import './Action.css'

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
          <span onClick={() => this.editAsset('1')}>Edit</span>
          <div className="handle" />
        </div>
      </div>)
    }
})

export default Action
