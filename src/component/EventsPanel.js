import React, { Component } from 'react'
import { withBus } from 'react-bus'
import './EventsPanel.css'
import { Panel } from 'react-bootstrap'

const EventsPanel = withBus()(class EventsPanel extends Component {
    state = {
        events: []
    }

    componentDidMount = () => {
        this.props.bus.on('*', (name, data) => {
            this.setState(prevState => ({
                events: [...prevState.events, { name, data }]
            }))
        })
    }

    render () {
        return (<Panel style={{
            width: '500px',
            position: 'absolute',
            margin: '10px'
        }}>
            <Panel.Heading>
              <Panel.Title componentClass="h3">Panel heading with a title</Panel.Title>
            </Panel.Heading>
            <Panel.Body>
                <ul>
                    {this.state.events.map(
                        ({ name }, index) => (<li key={index}>Event "{name}" was published</li>)
                    )}
                </ul>
            </Panel.Body>
          </Panel>)
    }
})

export default EventsPanel

