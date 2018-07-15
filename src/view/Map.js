import React, {Component} from 'react';
import PropTypes from 'prop-types';
import scriptLoader from 'react-async-script-loader'

const API_KEY = 'AIzaSyD8_R3TB_8b6h3yDE3eg_zcGhbRrrfrzEQ';
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
            }
            else this.props.onError()
        }
    }

    loadMap = () => {
        this.map = new window.google.maps.Map(this.refs.map, {
            center: {lat: 10.794234, lng: 106.706541},
            zoom: 20
        });
    }

    render() {
        return (
                <div ref="map" style={mapStyle}/>
        );
    }
}

Map.propTypes = {};

export default scriptLoader(['https://maps.googleapis.com/maps/api/js?key=' + API_KEY])(Map)
