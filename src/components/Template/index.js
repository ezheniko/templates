import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import Editable from '../Editable'
import './styles.css'
import accordion from '../../decorators/accordion'
import fetchMock from '../../fetchMock'
import stringFromHtml from '../../stringFromHTML'

class Template extends Component {

  static propTypes = {
    // from accordion
    openItemId: PropTypes.number,
    toggleOpenItem: PropTypes.func,
  }

  render() {
    this.data = fetchMock()
    const template = this.data.find(elem => this.props.match.params.id === elem.id).template
    const doc = document.createElement('div')
    doc.innerHTML = template
    this.editables = doc.querySelectorAll('.editable')

    return (
      <div>
        <Link to="/">To the templates list</Link>
        <h1>Template {this.props.match.params.id}</h1>
        {this.jsxCreate(doc.firstChild)}
      </div>
    )
  }

  jsxCreate = html => {
    if (html.nodeType === 3) return html.nodeValue
    const tag = html.tagName.toLowerCase()
    const attrs = html.attributes
    let attributes = null
    if (attrs.length) {
      attributes = {}
      for (let i = 0; i < attrs.length; i++) {
        switch(attrs[i].nodeName) {
          case 'class':
            if (attrs[i].nodeValue === 'editable') {
              attributes.tag = tag
              attributes.value = html.nodeValue
              attributes.toggleOpen = this.props.toggleOpenItem
              attributes.handleChange = this.handleChange
              for (let i = 0; i < this.editables.length; i++) {
                if (html === this.editables[i]) {
                  attributes.id = i
                }
              }
              attributes.isOpen = (this.props.openItemId === attributes.id)
              break
            }
            attributes.className = attrs[i].nodeValue
            // if (attrs[i].nodeValue === 'template') {
            //   attributes.onClick = this.handleClick
            // }
            break
          case 'style':
            attributes.style = {}
            let styleName = ''
            for (let i = 0; i < html.style.length; i++) {
              let arr = html.style[i].split('-')
              for (let i = 1; i < arr.length; i++) {
                arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1)
              }
              styleName = arr.join('')
              attributes.style[styleName] = html.style[styleName]
            }
            break
          default:
            attributes[attrs[i].nodeName] = attrs[i].nodeValue
            break
        }
      }
    }
    
    const childrens = [].map.call(html.childNodes, elem => this.jsxCreate(elem))
    
    return React.createElement(
      html.classList.contains('editable') ? Editable : tag,
      attributes,
      ...childrens
    )
  }

  handleChange = () => {
    const newTemplate = stringFromHtml('.template', ['form'])
    const id = this.props.match.params.id
    this.data.find(elem => elem.id === id).template = newTemplate
    this.data.find(elem => elem.id === id).modified = Date.now()
    fetchMock(this.data)
  }

  // handleClick = (ev) => {
    // // console.log(!ev.target.closest('.editable'))
    // console.log(this.props.toggleOpenItem)
    // if (!ev.target.closest('.editable')) {
      //   console.log('close please')
      //   console.log(this.props.toggleOpenItem)
      // Why it doesn't work??
    //   this.props.toggleOpenItem(null)
    // }
  // }
}

export default accordion(Template)