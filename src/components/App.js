import React, { Component } from 'react'
import UV from './uvcomponent'
import '../assets/css/App.css'

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
			headerMessage: "",
			uv: {
				root: "/static/uv",
				configUri: "/static/uv.json",
				manifest: ""
			}
		}
  }

  render() {
    console.log(this.state.uv)
    return (
      <div className="App">
        <header className="App-header">
          TESTING UNIVERSAL VIEWER // REACT
        </header>
        <UV
          id="uv" 
          root={this.state.uv.root} 
          configUri={this.state.uv.configUri} 
          manifest={this.state.uv.manifest} 
          scrollIntoView="true" />
      </div>
    );
  }
}
