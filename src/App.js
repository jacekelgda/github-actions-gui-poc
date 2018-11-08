import React, { Component } from 'react'
import './App.css';
import EventsPanel from './component/EventsPanel'
import { Provider as BusProvider } from 'react-bus'
import Event from './component/Event'

class App extends Component {
  render() {
    return (
      <BusProvider>
        <EventsPanel />
        <Event />
      </BusProvider>
    );
  }
}

export default App;
