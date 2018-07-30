import React from 'react'
import PropTypes from 'prop-types'
import {colors} from './colors'
import './styles.css'

function ColorPicker({activeColor, changeColor}) {
  const colorElements = colors.map(color => <li key={color} onClick = {changeColor(color)} className={`color ${activeColor === color ? "active-color" : ""}`} style = {{backgroundColor: color}}></li> )
  return (
    <ul className="color-palete">
      {colorElements}
    </ul>
  )
}
ColorPicker.propTypes = {
  activeColor: PropTypes.number,
  changeColor: PropTypes.func.isRequired,
}

export default ColorPicker