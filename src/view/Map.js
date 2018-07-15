import React, {Component} from 'react';
import PropTypes from 'prop-types';
import scriptLoader from 'react-async-script-loader'
import { API_KEY } from "../model/constants";
import { MELBOURNE_CENTRAL } from "../model/constants";

const mapStyle = {
    width: '100%',
    height: 800,
}

class Map extends Component {

    constructor(props) {
        super(props);
        this.map = null;
        this.infoWindow = null;
    }

    componentDidMount() {

    }

    componentWillReceiveProps ({ isScriptLoaded, isScriptLoadSucceed }) {
        if (isScriptLoaded && !this.props.isScriptLoaded) { // load finished
            if (isScriptLoadSucceed) {

                this.infowindow = new window.google.maps.InfoWindow();

                this.loadMap();
                this.loadNearestLocations();
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

    loadNearestLocations = () => {
        const service = new window.google.maps.places.PlacesService(this.map);
        service.nearbySearch({
            location: MELBOURNE_CENTRAL,
            radius: 500,
            // type: ['store']
        }, this.callback);
    }

    callback = (results, status) => {

        const { setPlaces } = this.props;
        setPlaces(results);

        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            for (let i = 0; i < results.length; i++) {
                this.createMarker(results[i]);
            }
        }
    }

    createMarker = (place) => {
        const placeLoc = place.geometry.location;
        const marker = new window.google.maps.Marker({
            map: this.map,
            position: place.geometry.location
        });

        window.google.maps.event.addListener(marker, 'click', function() {
            this.infowindow.setContent(place.name);
            this.infowindow.open(this.map, this);
        });
    }


    render() {
        return (
            <div ref="map" style={mapStyle}/>
        );
    }
}

Map.propTypes = {};

export default scriptLoader(['https://maps.googleapis.com/maps/api/js?key=' + API_KEY + '&libraries=places'])(Map)
