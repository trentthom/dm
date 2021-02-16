import React, { Component } from "react"
import Drumpad from './Drumpad'
import axios from 'axios'

export default class extends Component {

  render(){
    return(
      <div>
        <h1>PLT Drum9</h1>
          <Drumpad/>
      </div>
    )
  }
}
