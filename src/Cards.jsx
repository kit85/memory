import React from 'react'
import backside from './backside.jpg'

//om indexen finns är det sant annars är det falsk
export const Cards = (props) => {

  return (
    <img src={props.select? props.src:backside}
    
    onClick={props.onClick}
    />

  )
}

export default Cards;