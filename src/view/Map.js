import React, {Component} from 'react';
import PropTypes from 'prop-types';
import scriptLoader from 'react-async-script-loader'
import { API_KEY } from "../model/constants";
import { MELBOURNE_CENTRAL } from "../model/constants";
import { INITIAL_MARKERS } from "../model/constants";

const mapStyle = {
    width: '100%',
    height: 800,
}

class Map extends Component {

    constructor(props) {
        super(props);
        this.map = null;
    }

    componentDidMount() {

    }

    componentWillReceiveProps ({ isScriptLoaded, isScriptLoadSucceed }) {
        if (isScriptLoaded && !this.props.isScriptLoaded) { // load finished
            if (isScriptLoadSucceed) {
                this.loadMap();
                this.loadMarkers();
            }
            else this.props.onError()
        }
    }

    loadMap = () => {
        this.map = new window.google.maps.Map(this.refs.map, {
            center: MELBOURNE_CENTRAL,
            zoom: 14
        });
    }

    loadMarkers = () => {
        INITIAL_MARKERS.map( initial_marker => {
            let marker = new window.google.maps.Marker({
                position: initial_marker.position,
                map: this.map,
                title: initial_marker.title
            })

            const infowindow = new window.google.maps.InfoWindow({
                content: initial_marker.title
            });

            marker.addListener('click', function() {
                infowindow.open(this.map, marker);
            });
        })
    }

    render() {
        return (
                <div ref="map" style={mapStyle}/>
        );
    }
}

Map.propTypes = {};

export default scriptLoader(['https://maps.googleapis.com/maps/api/js?key=' + API_KEY])(Map)
