import React, { Component } from 'react'

export default class UVComponent extends Component {

    componentWillMount() {
        console.log('mounting, from app...', this.props)
        // prevent server-side compilation error
        if (typeof window === 'undefined') {
            return;
        }

        window.addEventListener('uvLoaded', (e) => {

            this.urlDataProvider = new window.UV.URLDataProvider()

            let manifest
            if(window.Utils.Urls.getHashParameter('manifest')) {
                manifest = window.Utils.Urls.getHashParameter('manifest') 
            } else {
                manifest = this.props.manifest
            }
                
            console.log('manifest is', manifest)

            this.uvstate = {
                root: this.props.root,
                configUri: this.props.configUri,
                locales: [{ name: 'en-GB' }],
                iiifResourceUri: manifest,
                collectionIndex: Number(this.urlDataProvider.get('c', 0)),
                manifestIndex: Number(this.urlDataProvider.get('m', 0)),
                sequenceIndex: Number(this.urlDataProvider.get('s', 0)),
                canvasIndex: Number(this.urlDataProvider.get('cv', 0)),
                rotation: Number(this.urlDataProvider.get('r', 0)),
                xywh: this.urlDataProvider.get('xywh', '')
            }

            console.log('uvloaded with ', this.uvstate)
        
            this.uvEl = document.querySelector('#' + this.props.id || '#uv');
            this.uv = window.createUV(this.uvEl, this.uvstate, this.urlDataProvider);

            // once created add manifest to URL
            this.uv.on('created', () => {
                window.Utils.Urls.setHashParameter('manifest', manifest) // that.uvstate.iiifResourceUri
            })

            // are there uv hash parameters?
            this.uvstate.iiifResourceUri = window.Utils.Urls.getHashParameter('manifest')
            

        }, true);
    }

    componentWillReceiveProps(nextProps) {
        console.log('next props', nextProps)
        // if it's not the initial props, and a manifest has been set, and the current manifest isn't the next one (fix for IE recursion bug)
        if (this.uvstate && nextProps.manifest && this.uvstate.iiifResourceUri !== nextProps.manifest) {
            this.uvstate.iiifResourceUri = nextProps.manifest;
            this.openManifest();
        }
    }

    openManifest() {

        console.log('open sesamanifest')

        // show the UV (if hidden) and scroll into view
        this.uvEl.style.display = 'block';

        if (this.props.scrollIntoView) {
            this.uvEl.scrollIntoView();
        }

        this.uv.set(Object.assign({}, this.uvstate, {
            collectionIndex: 0,
            manifestIndex: 0,
            sequenceIndex: 0,
            canvasIndex: 0
        }));
    }

    render() {
		return (
			<div id="uv" class="uv"></div>
        )
    }

}