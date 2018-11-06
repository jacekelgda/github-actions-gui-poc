import React, { Component } from 'react';
import './App.css';

class App extends Component {
  drawLine (e) {
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

  componentDidMount () {
    document.addEventListener("mousemove", this.drawLine);
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
              <div className="handleButton" />
              <canvas width="300" height="300" id="canvas" />
            </div>
          </div>
      </div>
    );
  }
}

export default App;
