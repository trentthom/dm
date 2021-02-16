import React, { Component } from "react"
import axios from 'axios'
import _ from 'underscore'
import ReactDOM from 'react-dom'


const SERVER_URL = 'https://drum-machine-server.herokuapp.com/sounds.json'

class Drumpad extends React.Component {
  constructor(){
    super()
    this.state = {
      displayText: '',
      sounds: []
    }
    this.playAudio = this.playAudio.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    // this.onKeyUp = this.onKeyUp.bind(this);

    const soundsData = () => {
      axios.get(SERVER_URL).then((response) => {
        console.log(response.data)
        const ninePad = _.where(response.data,{ drumpad_id: 3})
        this.setState({sounds: ninePad})
      })
    }
    soundsData();
  }

  onKeyDown(event) {
    this.state.sounds.map((sound) => {
      if( event.keyCode === sound.key_code){
        const keySound = sound
        const soundId = keySound.id
        const audioEl = document.getElementsByClassName(soundId)[0]
        const soundName = event.target.id;
        this.setState({displayText: soundName});
        audioEl.currentTime = 0;
        audioEl.play()
      }
    })
  }


  componentDidMount(){
    document.addEventListener('keydown', this.onKeyDown)
    document.addEventListener('keyup', this.onKeyUp)
  }

  componentWillUnmount(){
    document.removeEventListener('keydown', this.onKeyDown)
    document.removeEventListener('keyup', this.onKeyUp)
  }


  playAudio(event) {
    const keyboardKey = event.target.textContent
    const clickSound = _.findWhere(this.state.sounds, { key_trigger: keyboardKey })
    const soundId = clickSound.id
    const audioEl = document.getElementsByClassName(soundId)[0]
    const soundName = event.target.id;
    this.setState({displayText: soundName});
    audioEl.currentTime = 0;
    audioEl.play()
  }



  render() {
    return (
      <div className="outterdiv">
        <div className="soundname">{ this.state.displayText }</div>
        <div className="row">
          {this.state.sounds.map((sound) =>
            <button onClick={this.playAudio} key={sound.id} className="button" id={sound.name}>
              {sound.key_trigger}
              <audio className={sound.id}>
                <source src={sound.url}></source>
              </audio>
            </button>
          )}
        </div>
      </div>
    )
  }
}
export default Drumpad ;
