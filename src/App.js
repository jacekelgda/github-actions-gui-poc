import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    startDragging: false,
    childrenEvents: null
  }

  drawingLock = true
  clickOnTarget = false

  onStartDragging = (e) => {
    if (this.drawingLock) {
      return
    }
    this.drawLine(e)
    this.setState({ startDragging: true })
  }
  
  drawLine = (e) => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    var rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.beginPath();
    ctx.moveTo(148.5, 5);
    ctx.lineWidth = 5
    ctx.lineCap = 'round'
    ctx.strokeStyle = '#2188ff'
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  unlockDrawing = () => {
    if (this.clickOnTarget) {
      this.drawingLock = false
    }
  }

  onStopDragging = (e) => {
    this.lockDrawing()
    this.setState({ startDragging: false })
  }

  addNewEvent = () => {
    this.onStopDragging()
    this.setState({
      childrenEvents: [ <div className="event" key="1"><div className="info"><h4>New orchestration</h4></div></div> ]
    })
  }

  lockDrawing = () => {
    this.drawingLock = true
    this.clickOnTarget = false
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  onClickOnTarget = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.clickOnTarget = true
  }

  componentDidMount () {
    document.addEventListener('mousedown', this.unlockDrawing)
    document.addEventListener('mousemove', this.onStartDragging)
  }

  render() {
    return (
      <div className="App">
          <div className="event">
            <div className="info">
              <h4>Some action</h4>
            </div>
            <div className="actions">
              <p>Edit</p>
            </div>
            <div className="handle">
              <div className="handleButton" onMouseDown={this.onClickOnTarget} />
              <canvas width="300" height="300" id="canvas" onMouseUp={this.onStopDragging} />
            </div>
          </div>
          { this.state.startDragging && (
            <div className="new-event" onMouseUp={this.addNewEvent}>
              <div className="info">
                <h4>Some action</h4>
              </div>
              <div className="actions">
                <p>Edit</p>
              </div>
            </div>
          )}
          { this.state.childrenEvents }
      </div>
    );
  }
}

export default App;
