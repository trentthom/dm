import React, { Component } from 'react';
import UIfx from 'uifx';
import tickAudio from './my-sounds/kick.mp3';

const kick = new UIfx(
  tickAudio,
  {
    volume: 0.4, // number between 0.0 ~ 1.0
    throttleMs: 100
  }
);

export default class Drumpad extends Component {
  onClick = () => {
    kick.play();
  }
  render() {
    return (
      <div>
        <button onClick={this.onClick}>Kick</button>
      </div>
    )
  }
}
