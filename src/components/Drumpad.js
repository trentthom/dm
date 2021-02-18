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
      displayText: '', // For the drum machine screen
      padState: 3, // Selecting drumpad groups from the backend
      sounds: [] // The drumpad group selected
    }

    this.playAudio = this.playAudio.bind(this); // Playing sounds on click
    this.onKeyDown = this.onKeyDown.bind(this); // Playing sounds on key press
    this.onKeyUp = this.onKeyUp.bind(this); // Stopping sounds on key release
    this.pad2 = this.pad2.bind(this); // TODO: Changing the grou of selected drumpads

    const soundsData = (padState) => { // Gets data from backend and puts it into state
      axios.get(SERVER_URL).then((response) => {
        console.log(response.data)
        const padData = _.where(response.data,{ drumpad_id: padState })
        this.setState({sounds: padData})
      })
    }

    soundsData(this.state.padState); // Runs the get request

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

  pad2(event) {
    this.setState({padState: 4});
  }

  render() {
    return (
      <div className="outterdiv">
        <div className="soundname">{ this.state.displayText }</div>
        <div className="row">
          {this.state.sounds.map((sound) => // Mapping the drum pads on the screen.
            <button onClick={this.playAudio} key={sound.id} className="pinkButton" id={sound.name}> // Asigning
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
