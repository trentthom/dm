import React, { Component } from "react"
import axios from 'axios'
import _ from 'underscore'
import ReactDOM from 'react-dom'
import Loop from './Loop.js'

const SERVER_URL = 'https://drum-machine-server.herokuapp.com/sounds.json'
const SERVER_DP = 'https://drum-machine-server.herokuapp.com/drumpads.json'

class Drumpad extends React.Component {
  constructor(){
    super()
    this.state = {
      displayText: '', // For the drum machine screen
      padState: 3, // Selecting drumpad groups from the backend
      sounds: [], // The drumpad group selected
      firstPadBank: 3,
      lastPadBank: '',
      padBankName: ''
    }

    this.playAudio = this.playAudio.bind(this); // Playing sounds on click
    this.onKeyDown = this.onKeyDown.bind(this); // Playing sounds on key press
    this.onKeyUp = this.onKeyUp.bind(this); // Stopping sounds on key release
    this.changePad = this.changePad.bind(this); // TODO: Changing the grou of selected drumpads
    this.soundsData = this.soundsData.bind(this); // TODO: Changing the grou of selected drumpads
    this.drumPadData = this.drumPadData.bind(this)

  }

  soundsData(padState) { // Gets data from backend and puts it into state
    axios.get(SERVER_URL).then((response) => {
      const padData = _.where(response.data,{ drumpad_id: padState })
      this.setState({sounds: padData})
    })
  }

  drumPadData(padState) { // Gets data from backend and puts it into state
    axios.get(SERVER_DP).then((response) => {
    const firstPad = _.where(response.data,{ id: 3 })
    const lastPad = response.data[response.data.length - 1].id;
    const switchedToPad = _.where(response.data,{ id: this.state.padState })
    const getSwitchedToBankName = switchedToPad[0].name
    this.setState({padState: switchedToPad[0].id});
    this.setState({firstPadBank: firstPad[0].id});
    this.setState({lastPadBank: lastPad});
    this.setState({padBankName: getSwitchedToBankName});
    })
  }

  onKeyDown(event) {
    this.state.sounds.map((sound) => { // creates and array of each sounds object
      if( event.keyCode === sound.key_code){ // if the keyboard key's code matches one of the sounds stored in the backend, it plays the url associated
        const keySound = sound
        const soundId = keySound.id
        const audioEl = document.getElementsByClassName(soundId)[0] // Not sure why we used the DOM? Fill me in.
        const soundName = sound.name;
        this.setState({displayText: soundName}); // Changes the drum machine screen
        document.getElementById(sound.name).classList.add("active"); // For changing button color when pressed
        audioEl.currentTime = 0; // This allows us to play the url sound whenever we click it, instead of waiting for the sound clip to finish
        audioEl.play(); // Plays the audio element
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

  componentDidMount(){ // Not sure. Fill me in.
    document.addEventListener('keydown', this.onKeyDown);
    document.addEventListener('keyup', this.onKeyUp);
    this.soundsData(this.state.padState); // Runs the get request
    this.drumPadData(this.state.padState);
  }

  componentWillUnmount(){ // Not sure. Fill me in.
    document.removeEventListener('keydown', this.onKeyDown);
    document.removeEventListener('keyup', this.onKeyUp);
  }

  playAudio(event) {
    const keyboardKey = event.target.textContent; // Taking the button that the click event targets.
    const clickSound = _.findWhere(this.state.sounds, { key_trigger: keyboardKey }); // Not sure. Fill me in.
    const soundId = clickSound.id;
    const audioEl = document.getElementsByClassName(soundId)[0];
    const soundName = event.target.id;
    this.setState({displayText: soundName});
    audioEl.currentTime = 0;
    audioEl.play();
  }

  changePad(event) {
    if(this.state.padState < this.state.lastPadBank) {
      this.setState({padState: this.state.padState + 1});
    } else {
      this.setState({padState: this.state.firstPadBank})
    }
    this.drumPadData(this.state.padState)
    this.soundsData(this.state.padState); // Runs the get request
  }

  render() {
    return (
      <div className="realOutterDiv">
        <div className="outterdiv">
          <div className="soundname">{ this.state.displayText }
          </div>
          <div className="row">
            {this.state.sounds.map((sound) => // Mapping the drum pads on the screen.
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
          <div className="banksbutton">
            <button className="moresoundsbutton"onClick={this.changePad}>More Sounds</button>
          </div>
        </div>
        <div className="padname">
        {this.state.padBankName}
        </div>
      </div>
    )
  }
}
export default Drumpad ;
