import React from 'react'
import './FullScreenComponent.css'
function FullScreenCompo({handleFullScreen , handleReset}) {
  return (
    <div className="full-container">
     <h1 className="text-2xl font-bold mb-4">Please enable fullscreen mode to take the quiz.</h1>
      <button  onClick={handleFullScreen} className="button-87">
        Go Fullscreen
      </button>
    <button onClick={handleReset} className='button-87'> Back To home</button>
  </div>
)
}

export default FullScreenCompo