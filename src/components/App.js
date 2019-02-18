import React, { Component } from 'react'
import UVComponent from './UV'
import '../assets/css/App.css'

import { 
  checkBDRC,
  bdrc,
  getRandomInt,
  princetonManifest } from '../store'

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
			headerMessage: "",
			uv: {
				root: "./static/uv",
				configUri: "./static/uv.json",
				manifest: ''
			}
		}
  }

  checkServer = async () => {
    const manifest = await checkBDRC() ? bdrc[getRandomInt(0, bdrc.length - 1)] : princetonManifest
    this.setState(prevState => ({
      uv: {
        ...prevState.uv,
        manifest: manifest
      }
    }), () => {
      console.log('App did mount', this.state.uv.manifest)
      this.checkStateOfWindow()
    }) 
  }

  componentDidMount() {
    this.checkServer()
  }

  checkStateOfWindow = () => {
    console.log(window)
  }


  render() {
    console.log('render App')
    return (
      <div>
        <header className="app-header">UV TEST</header>
        <UVComponent
          id="uv" 
          root={this.state.uv.root} 
          configUri={this.state.uv.configUri} 
          manifest={this.state.uv.manifest} 
        />
      </div>
    );
  }
}
