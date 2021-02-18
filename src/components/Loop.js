import React, { Component } from "react";
import * as Tone from 'tone';

const plucky = new Tone.PluckSynth().toDestination(); // Plucky is a synth

let bpmNumber = 80; // Speed of the beat saved to variable... TODO: Make it interactive, slider?

function bpm(bpmNumber) { // Plugging the bpm into tone's little media player called tone.trasport
  Tone.Transport.bpm.value = bpmNumber;
}

let loop = new Tone.Loop((time) => {
  plucky.triggerAttackRelease("C4"); // Synth note to loop.
}, "4n").start(0); // fix

function loopStart() { // Function to start the "player"
    Tone.Transport.start();
};

function loopStop() { // Function to start the "player"
  Tone.Transport.stop();
}

function Loop() {
  return (
    <div className="loop">
      <div className="metrobutton">
        <button onClick={loopStart} className="metrobuttonstart">
          Start Metronome
        </button>
        <button onClick={loopStop} className="metrobuttonstart">
          Stop Metronome
        </button>
      </div>
    </div>
  );
}

export default Loop ;
