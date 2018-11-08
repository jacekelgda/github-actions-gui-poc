import React, { Component, Fragment } from 'react';
import './App.css';
import EditPanel from './component/EditPanel'
import AssetsStore from './store/AssetsStore'

class App extends Component {
  state = {
    startDragging: false,
    childrenEvents: null,
    editedAssetId: null
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
      childrenEvents: [ (<div className="connected-event" key="1">
          <div className="info">
            <div className="border-mask" />
            <div className="handleButton" />
            <h4>New orchestration</h4>
            <div className="details">
              <p>Some deatils</p>
            </div>
            <div className="handle" />
          </div>
        </div>)
      ]
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

  editAsset = (id) => {
    this.setState({
      editedAssetId: id
    })
  }

  closeEditPanel = () => {
    this.setState({
      editedAssetId: null
    })
  }

  render() {
    return (
      <Fragment>
        {this.state.editedAssetId && <EditPanel store={new AssetsStore()} assetId={this.state.editedAssetId} onDismiss={this.closeEditPanel} />}
        <div className="App">
          
          <div className="event">
            <div className="info">
              <h4>Some action</h4>
            </div>
            <div className="actions">
              <span onClick={() => this.editAsset('0')}>Edit</span>
            </div>
            <div className="handle">
              <div className="handleButton" onMouseDown={this.onClickOnTarget} />
              <canvas width="300" height="300" id="canvas" onMouseUp={this.onStopDragging} />
            </div>
            { this.state.childrenEvents && <div className="connection" />}
          </div>
          { this.state.startDragging && (
            <div className="new-event" onMouseUp={this.addNewEvent} />
          )}
          { this.state.childrenEvents }
        </div>
      </Fragment>
    );
  }
}

export default App;
