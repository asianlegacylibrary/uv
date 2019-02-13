import React, { Component } from 'react'
import UVComponent from './UV'
import '../assets/css/App.css'

import { bdrc, getRandomInt } from '../store'

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
			headerMessage: "",
			uv: {
				root: "./static/uv",
				configUri: "./static/uv.json",
				manifest: bdrc[getRandomInt(0, bdrc.length - 1)]
			}
		}
  }

  render() {
    console.log(this.state.uv)
    return (
      <div>
        <header className="app-header">UV TEST</header>
        <UVComponent
          id="uv" 
          root={this.state.uv.root} 
          configUri={this.state.uv.configUri} 
          manifest={this.state.uv.manifest} 
          scrollIntoView="true" />
      </div>
    );
  }
}
