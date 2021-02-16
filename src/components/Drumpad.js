import React, { Component } from "react"
import axios from 'axios'
import _ from 'underscore'

// import sounds from './sounds'
const SERVER_URL = 'https://drum-machine-server.herokuapp.com/sounds.json'

class Drumpad extends React.Component {
  constructor(){
    super()
    this.state = {
      displayText: '',
      sounds: []
    }
    this.playAudio = this.playAudio.bind(this);

    const soundsData = () => {
      axios.get(SERVER_URL).then((response) => {
        console.log(response.data)
        const ninePad = _.where(response.data,{ drumpad_id: 3})
        this.setState({sounds: ninePad})
      })
    }
    soundsData();
  }



  playAudio(event) {
    const audioId = Number(event.target.textContent)
    console.log(audioId)
    const audioEl = document.getElementsByClassName('audio-element')[audioId -13]
    console.log(audioEl)
    const soundName = event.target.id;
    console.log(soundName);

    this.setState({displayText: soundName});
    audioEl.play()
  }

  render() {
    return (
      <div className="outterdiv">
        <div className="soundname">{ this.state.displayText }</div>
        <div className="row">
          {this.state.sounds.map((sound) =>
            <button onClick={this.playAudio} key={sound.id} className="button" id={sound.name}>
              {sound.id}
              <audio className="audio-element">
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


// import React from 'react';
// import useSound from 'use-sound';
//
// // const data = [{keyCode: 88, keyTrigger: 'X', id: 'kick', url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' }]
//
//
// class Drumpad extends React.Component {
//
//
//   componentDidMount() {
//   const audioEl = document.getElementsByClassName("audio-element")[0]
//   audioEl.play()
// }
//
// render() {
//   return (
//     <div>
//     //<button onClick={componentDidMount}>bell</button>
//       <audio className="audio-element">
//         <source src="https://assets.coderrocketfuel.com/pomodoro-times-up.mp3"></source>
//       </audio>
//     </div>
//   )
// }
//   // constructor(){
//   //   super();
//   //   this.state = {url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
//   //   };
//   //   this._makeItKick = this._makeItKick.bind(this);
//   // }
//   //
//   //
//   // _makeItKick() {
//   //   console.log('kicking')
//   //   //this.setState({url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'})
//   //   this.audio.play()
//   //   this.audio.currentTime = 0
//   // }
//   //
//   // render() {
//   //   return(
//   //     <div>
//   //       <button onClick={ this._makeItKick}>kick</button>
//   //       <audio ref={ref => this.audio = ref} src={this.props.url}></audio>
//   //     </div>
//   //   )
//   // }
// }
// export default Drumpad;
