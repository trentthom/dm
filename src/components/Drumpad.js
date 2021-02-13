import React, { Component } from 'react';
import UIfx from 'uifx';
import kickAudio from './my-sounds/kick.mp3';
import hhclosedAudio from './my-sounds/HHclosed.mp3';
import hhopenAudio from './my-sounds/HHopen.mp3';
import snareAudio from './my-sounds/snare.mp3';


const kick = new UIfx(
  kickAudio,
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
