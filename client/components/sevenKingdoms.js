import React from 'react'

export const SevenKingdoms = props => {
  return (
    <div>
      <ul id="seven-kingdoms" className="circle-container">
        {props.sevenKingdoms.map(kingdom => (
          <li key={kingdom.id}>{kingdom}</li>
        ))}
      </ul>
    </div>
  )
}
