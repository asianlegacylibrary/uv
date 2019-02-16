import React, { Component } from 'react'

export default class UVComponent extends Component {

    openManifest = () => {

        console.log('open sesamanifest', this.uvstate)
        
        this.uv.set(Object.assign({}, this.uvstate, {
            collectionIndex: 0,
            manifestIndex: 0,
            sequenceIndex: 0,
            canvasIndex: 0
        }))

    }

    createUVobj = () => {
        this.urlDataProvider = new window.UV.URLDataProvider()

        let manifest
        if(window.Utils.Urls.getHashParameter('manifest')) {
            manifest = window.Utils.Urls.getHashParameter('manifest') 
        } else {
            manifest = this.props.manifest
        }
            
        console.log('uvloaded with', manifest)

        this.uvstate = {
            root: this.props.root,
            configUri: this.props.configUri,
            locales: [{ name: 'en-GB' }],
            iiifResourceUri: this.props.manifest,
            collectionIndex: Number(this.urlDataProvider.get('c', 0)),
            manifestIndex: Number(this.urlDataProvider.get('m', 0)),
            sequenceIndex: Number(this.urlDataProvider.get('s', 0)),
            canvasIndex: Number(this.urlDataProvider.get('cv', 0)),
            rotation: Number(this.urlDataProvider.get('r', 0)),
            xywh: this.urlDataProvider.get('xywh', '')
        }

        this.uvEl = document.querySelector('#' + this.props.id || '#uv')
        this.uv = window.createUV(this.uvEl, this.uvstate, this.urlDataProvider)

        this.uv.on('created', () => {
            console.log('uv created with', this.uvstate)
            window.Utils.Urls.setHashParameter('manifest', this.uvstate.iiifResourceUri)
        })
    }

    setupUV = async () => {
        console.log('setting up UV with props from App...', this.props)
        // prevent server-side compilation error
        if (typeof window === 'undefined') {
            console.log('window undefined', typeof(window))
            return
        }

        console.log(window)

        window.addEventListener('uvLoaded', (e) => {

            if(!this.uvstate) {
                this.createUVobj()
            }
            
        }, false)
    }

    componentWillMount = () => {
        this.setupUV()
    }

    componentWillReceiveProps = (nextProps) => {
        console.log('next props', nextProps, 'uvstate', this.uvstate)
        if(!this.uvstate) {
            this.setupUV()
        } else if(this.uvstate.iiifResourceUri !== nextProps.manifest) {
            console.log('we need to load a new manifest', this.props.manifest, nextProps.manifest)
            //this.uvstate.iiifResourceUri = nextProps.manifest
        } else {
            console.log('next props the same as current')
        }
    }

    render() {
		return (
			<div id="uv" className="uv"></div>
        )
    }

}