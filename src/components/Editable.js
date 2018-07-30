import React, {Component} from 'react'
import PropTypes from 'prop-types'
import EditPanel from './EditPanel'

class Editable extends Component {
  static propTypes = {
    children: PropTypes.string,
    id: PropTypes.number.isRequired,
    isOpen: PropTypes.bool.isRequired,
    style: PropTypes.object,
    tag: PropTypes.string.isRequired,
    toggleOpen: PropTypes.func.isRequired,
  }

  componentDidUpdate() {
    if(this.update) {
      this.props.handleChange()
      this.update = false
    }
  }

  state = {
    color: null,
    fontSize: null,
    text: null,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.style !== this.props) {

      this.setState({
        color: nextProps.style ? nextProps.style.color : null,
        fontSize: nextProps.style ? nextProps.style.fontSize : null,
        text: nextProps.children || null,
      })
    }
  }

  render() {
    return React.createElement(
      this.props.tag,
      {
        className: 'editable',
        style: {
          color: this.state.color || (this.props.style ? this.props.style.color : null),
          fontSize: this.state.fontSize || (this.props.style ? this.props.style.fontSize : null),
        },
        onClick: this.props.toggleOpen(this.props.id),
      },
      this.state.text || this.props.children,
      this.props.isOpen ? 
        <EditPanel  activeColor={this.state.color}
                    changeColor={this.changeColor}
                    fontSize={parseInt(this.state.fontSize)}
                    changeFontSize={this.changeFontSize}
                    text={this.state.text}
                    changeText={this.changeText}/>
        : null,
    )
  }

  changeColor = color => () => {
    this.setState({color: color})
    this.update = true
  }
  changeFontSize = ev => {
    this.setState({fontSize: ev.target.value + 'px'})
    this.update = true
  }
  changeText = ev => {
    this.setState({text: ev.target.value})
    this.update = true
  }
}

export default Editable