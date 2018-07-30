import React from 'react'
import PropTypes from 'prop-types'
import ColorPicker from '../ColorPicker'
import './styles.css'

export default class EditPanel extends React.Component {
  static propTypes = {
    activeColor: PropTypes.string,
    changeColor: PropTypes.func.isRequired,
    changeFontSize: PropTypes.func.isRequired,
    changeText: PropTypes.func.isRequired,
    fontSize: PropTypes.number,
    text: PropTypes.string,
  }
  
  render() {
    const {color, changeColor, fontSize, changeFontSize, text, changeText} = this.props
    return  <form className="edit-form" onClick={this.handleClick}>
              <ColorPicker activeColor={color} changeColor={changeColor}/>
              <label>font-size: <input type="number" value={fontSize || 16} onChange={changeFontSize}/> px</label>
              <label>Text: <input type="text" value={text} onChange={changeText}/></label>
            </form>
  }
  
  handleClick(ev) {
    ev.stopPropagation()
  }
}