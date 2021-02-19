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
      padState: 0, // Selecting drumpad groups from the backend
      sounds: [],
      pads: [],
      currentPad: {} // The drumpad group selected
    }

    this.playAudio = this.playAudio.bind(this); // Playing sounds on click
    this.onKeyDown = this.onKeyDown.bind(this); // Playing sounds on key press
    this.onKeyUp = this.onKeyUp.bind(this); // Stopping sounds on key release
    this.changePadState = this.changePadState.bind(this); // this cycles through pad state
    this.changePad = this.changePad.bind(this); 
    this.soundsData = this.soundsData.bind(this);
    this.drumPadData = this.drumPadData.bind(this)

  }

  soundsData() { // Gets data from backend and puts it into state
    axios.get(SERVER_URL).then((response) => {
      const drumpadId = this.state.currentPad.id
      const padData = _.where(response.data,{ drumpad_id: drumpadId })
      this.setState({sounds: padData})
    })
  }

  drumPadData(padState) { // Gets data from backend and puts it into state
    console.log("pad state received by drumpad data", padState);
    axios.get(SERVER_DP).then((response) => {
    this.setState({pads: response.data});
    this.setState({currentPad: response.data[padState]})
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
    this.drumPadData(this.state.padState);
    this.soundsData(); // Runs the get request
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

  changePadState() {
    if(this.state.padState < this.state.pads.length - 1) {
      console.log("before incrementing padstate", this.state.padState);
      this.setState({padState: this.state.padState + 1});
      console.log("button imcrementing pad state", this.state.padState);
    } else {
      this.setState({padState: 0})
      console.log("button reseting pad state", this.state.padState);
    }
    this.changePad()
  }

  changePad() {
    console.log("pad state sent to drumpad data function",this.state.padState);
    this.drumPadData(this.state.padState)
    this.soundsData(); // Runs the get request
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
            <button className="moresoundsbutton"onClick={this.changePadState}>More Sounds</button>
          </div>
        </div>
        <div className="padname">
        {this.state.currentPad.name}
        </div>
      </div>
    )
  }
}
export default Drumpad ;
