import React, { Component } from "react"
import axios from 'axios'
import _ from 'underscore'
import ReactDOM from 'react-dom'
import Loop from './Loop.js'

const SERVER_URL = 'https://drum-machine-server.herokuapp.com/sounds.json'

class Drumpad extends React.Component {
  constructor(){
    super()
    this.state = {
      displayText: '',
      padState: 3,
      sounds: []
    }

    this.playAudio = this.playAudio.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.pad2 = this.pad2.bind(this);

    const soundsData = (padState) => {
      axios.get(SERVER_URL).then((response) => {
        console.log(response.data)
        const padData = _.where(response.data,{ drumpad_id: padState })
        this.setState({sounds: padData})
      })
    }

    soundsData(this.state.padState);

  }

  onKeyDown(event) {
    this.state.sounds.map((sound) => {
      if( event.keyCode === sound.key_code){
        const keySound = sound
        const soundId = keySound.id
        const audioEl = document.getElementsByClassName(soundId)[0]
        const soundName = sound.name;
        this.setState({displayText: soundName});
        document.getElementById(sound.name).classList.add("active");
        audioEl.currentTime = 0;
        audioEl.play();
      }
    })
  }

  onKeyUp(event) {
    this.state.sounds.map((sound) => {
      if( event.keyCode === sound.key_code){
        const keySound = sound
        const soundId = keySound.id
        const audioEl = document.getElementsByClassName(soundId)[0]
        const soundName = sound.name;
        document.getElementById(sound.name).classList.remove("active");
      }
    })
  }

  componentDidMount(){
    document.addEventListener('keydown', this.onKeyDown);
    document.addEventListener('keyup', this.onKeyUp);
  }

  componentWillUnmount(){
    document.removeEventListener('keydown', this.onKeyDown);
    document.removeEventListener('keyup', this.onKeyUp);
  }

  playAudio(event) {
    const keyboardKey = event.target.textContent;
    const clickSound = _.findWhere(this.state.sounds, { key_trigger: keyboardKey });
    const soundId = clickSound.id;
    const audioEl = document.getElementsByClassName(soundId)[0];
    const soundName = event.target.id;
    this.setState({displayText: soundName});
    audioEl.currentTime = 0;
    audioEl.play();
  }

  pad2(event) {
    this.setState({padState: 4});
  }

  render() {
    return (
      <div className="outterdiv">
        <div className="soundname">{ this.state.displayText }</div>
        <div className="row">
          {this.state.sounds.map((sound) =>
            <button onClick={this.playAudio} key={sound.id} className="pinkButton" id={sound.name}>
              {sound.key_trigger}
              <audio className={sound.id}>
                <source src={sound.url}></source>
              </audio>
            </button>
          )}
        </div>
        <div>
          <Loop />
        </div>
        <div>
          <button onClick={this.pad2}>Pad 2</button> //TODO
        </div>
      </div>
    )
  }
}
export default Drumpad ;
