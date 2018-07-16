import React, {Component} from 'react';
import PropTypes from 'prop-types';
import scriptLoader from 'react-async-script-loader'
import {API_KEY} from "../model/constants";
import {MELBOURNE_CENTRAL} from "../model/constants";
import {CLIENT_ID} from "../model/constants";
import {CLIENT_SECRET} from "../model/constants";

const mapStyle = {
    width: '100%',
    height: 800,
}

class Map extends Component {

    constructor(props) {
        super(props);
        this.map = null;
    }

    componentDidUpdate() {
        const {places} = this.props;

        places.map(place => {
            this.createMarkerAndInfoWindow(place);
        })
    }

    componentWillReceiveProps({isScriptLoaded, isScriptLoadSucceed}) {
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
    };

    loadNearestLocations = () => {
        const service = new window.google.maps.places.PlacesService(this.map);
        service.nearbySearch({
            location: MELBOURNE_CENTRAL,
            radius: 500,
            // type: ['store']
        }, this.callback);
    };

    callback = (results, status) => {

        const {setInitialPlaces} = this.props;
        setInitialPlaces(results);

        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            for (let i = 0; i < results.length; i++) {
                this.createMarkerAndInfoWindow(results[i]);
            }
        }
    };

    toggleBounce = (marker) => {
        if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
        } else {
            marker.setAnimation(window.google.maps.Animation.BOUNCE);
        }
    }

    createMarkerAndInfoWindow = (place) => {
        const placeLoc = place.geometry.location;
        const marker = new window.google.maps.Marker({
            map: this.map,
            position: place.geometry.location,
            animation: window.google.maps.Animation.DROP,
        });

        marker.addListener('click', function () {
            if (marker.getAnimation() !== null) {
                marker.setAnimation(null);
            } else {
                marker.setAnimation(window.google.maps.Animation.BOUNCE);
            }
        });

        const infowindow = new window.google.maps.InfoWindow({
            content: place.name
        });

        // this.fetchImage(place);

        marker.addListener('click', function () {
            infowindow.open(this.map, marker);
        });
    };

    fetchImage = place => {

        this.searchByLocation(place).then(id => {
            const url = "https://api.foursquare.com/v2/venues/" + id
                + '?&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET + '&v=20180715';

            return fetch(url, {
                        method: "GET",
                    }).then(response => this.parseResponse(response))
            .then(responseJson => {
                let url = '';
                if (responseJson.response.venue.photos[0].hasOwnProperty('groups') && responseJson.response.venue.photos.groups[0].hasOwnProperty('items')) {
                    const photo = responseJson.response.venue.photos.groups[0].items[0];
                    url = photo.prefix + '300x300' + photo.suffix;

                }
                console.log(url)
                return url;
            })
        });
    };

    searchByLocation = place => {
        const url = "https://api.foursquare.com/v2/venues/search?ll=" + place.geometry.location.lat() + ',' + place.geometry.location.lng()
            + '&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET + '&v=20180715&limit=1';

        return fetch(url, {
            method: "GET",
        })
        .then(response => this.parseResponse(response))
        .then(responseJson => {
            return responseJson.response.venues[0].id;
        })
        .catch(error => {
            console.error(error);
        })
    };

    parseResponse = response => {
        if (response.status >= 200 && response.status < 300) {
            return response.json();
        } else {
            const error = new Error(response.statusText);
            error.response = response;

            throw error;
        }
    };


    render() {
        return (
            <div ref="map" style={mapStyle}/>
        );
    }
}

Map.propTypes = {};

export default scriptLoader(['https://maps.googleapis.com/maps/api/js?key=' + API_KEY + '&libraries=places'])(Map)
