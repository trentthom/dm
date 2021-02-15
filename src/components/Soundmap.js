import React from "react"
import sounds from './sounds'
import Drumpad from './Drumpad'

function soundMap(){

  const soundComponents = sounds.map(sounds => {
    return <Drumpad key={sounds.id} sound={sounds.sound} url={sounds.url}/>
    console.log(soundComponents)
  })

  return(
    <div>
      {soundComponents}
    </div>
  )
}


export default soundMap
