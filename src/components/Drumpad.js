import React from 'react';

class Drumpad extends React.Component {
  constructor(){
    super();
    this.state = {url: ""
    };
    this._makeItKick = this._makeItKick.bind(this);
  }

  // const data = [{keyCode: 88, keyTrigger: 'X', id: 'kick', url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' }]

  _makeItKick() {
    console.log('kicking')
    this.setState({url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'})
  }

  render() {
    return(
      <div >
        <button onClick={ this._makeItKick}>kick</button>
        <audio src={this.props.url}></audio>
      </div>
    )
  }
}
export default Drumpad;
