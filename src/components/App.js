import React, { Component } from 'react'
import {
  Link,
} from 'react-router-dom'
import fetchMock from '../fetchMock'

class App extends Component {
  state = {
    data: [],
    loading: false,
    loaded: false,
  }

  componentDidMount() {
    if (!this.state.loaded) {
      this.setState({
        loading: true,
        loaded: false,
      })
      setTimeout(() => {
        this.setState({
          data: fetchMock() || [],
          loading: false,
          loaded: true,
        })
      }, 1000)
    }
  }
  
  render() {
    return (
          <table>
            <caption>Template list</caption>
            <tbody>
              {this.getBody()}
            </tbody>
          </table>
    )
  }
  
  getBody = () => {
    if (this.state.loading) return(
      <tr>
        <td>Loading...</td>
      </tr>
    )
    if (!this.state.data.length && this.state.loaded) return (
      <tr>
        <td>No templates</td>
      </tr>
    )
    const tableContent = this.state.data.map(template => {
      return (
        <tr key={template.id}>
          <td>
            <Link to={`/template/${template.id}`}>{template.name}</Link>
          </td>
          <td>
            {new Date(template.modified).toLocaleString()}
          </td>
        </tr>
    )})
    return tableContent
  }
  
}

export default App