import React, { Component } from 'react'
import { withBus } from 'react-bus'
import './EventsPanel.css'
import { Panel } from 'react-bootstrap'

const EventsPanel = withBus()(class EventsPanel extends Component {
    state = {
        events: []
    }

    componentDidMount = () => {
        this.props.bus.on('*', (name, data = '') => {
            let message = `Event "${name}" was published`
            if (name === 'subscriber.new') {
                message = 'New subscriber has been created'
            }
            this.setState(prevState => ({
                events: [...prevState.events, { name, message }]
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
                        ({ message }, index) => (<li key={index}>{message}</li>)
                    )}
                </ul>
            </Panel.Body>
          </Panel>)
    }
})

export default EventsPanel

