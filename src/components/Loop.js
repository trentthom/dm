import React, { Component } from "react";
import * as Tone from 'tone';

const synth = new Tone.MembraneSynth().toDestination();

let bpmNumber = 80;

function bpm(bpmNumber) {
  Tone.Transport.bpm.value = bpmNumber;
}

function loopStart() {
  let loop = new Tone.Loop(time => {
    synth.triggerAttackRelease("C2");
  }, '4n').start(0);
    Tone.Transport.start();
};

function loopStop() {
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
