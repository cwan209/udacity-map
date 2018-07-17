import React, {Component} from 'react';
import PropTypes from 'prop-types';
import scriptLoader from 'react-async-script-loader'
import {API_KEY} from "../model/constants";
import {MELBOURNE_CENTRAL} from "../model/constants";
import {CLIENT_ID} from "../model/constants";
import {CLIENT_SECRET} from "../model/constants";

const mapStyle = {
    width: '100%',
    height: 1000,
}

class Map extends Component {

    constructor(props) {
        super(props);
        this.map = null;
        this.markers = [];

    }

    componentDidUpdate() {
        const {places} = this.props;

        console.log('componentDidUpdate')

        // reset markers
        this.markers.forEach(marker => {
            marker.setMap(null);
        })

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

    componentDidMount() {

    }

    loadMap = () => {
        this.map = new window.google.maps.Map(this.refs.map, {
            center: MELBOURNE_CENTRAL,
            zoom: 16
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

    createMarkerAndInfoWindow = (place) => {
        const placeLoc = place.geometry.location;
        const marker = new window.google.maps.Marker({
            map: this.map,
            position: placeLoc,
            animation: window.google.maps.Animation.DROP,
        });

        marker.addListener('click', function () {
            if (marker.getAnimation() !== null) {
                marker.setAnimation(null);
            } else {
                marker.setAnimation(window.google.maps.Animation.BOUNCE);
            }
        });

        this.fetchVenueDetails(place).then(venue => {

            if (typeof venue === 'undefined') {
                return
            }
            const formattedPhone = venue.contact.formattedPhone;
            const name = venue.name;
            let photoHTML = '';
            if (venue.hasOwnProperty('bestPhoto')) {
                const photoUrl = venue.bestPhoto.prefix + '400x300' + venue.bestPhoto.suffix;
                photoHTML = '<img src="' + photoUrl + '" alt="' + name + '"/>';
            }
            const rating = venue.rating;

            const contentString =
                '<div id="content">' +
                '<h1 id="firstHeading" class="firstHeading">' + name + '</h1>' +
                '<div id="bodyContent">' +
                photoHTML +
                '<p>Rating: ' + rating + '</p>' +
                '<p>Contact Number: ' + formattedPhone + '</p>' +
                '</div>' +
                '</div>';

            const infowindow = new window.google.maps.InfoWindow({
                content: contentString
            });

            marker.addListener('click', function () {
                infowindow.open(this.map, marker);
            });

            this.markers.push(marker);
        }).catch(error => {
            console.error(error);
        });
    };

    fetchVenueDetails = place => {
        return this.searchByLocation(place).then(id => {
            const url = "https://api.foursquare.com/v2/venues/" + id
                + '?&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET + '&v=20180715';

            return fetch(url, {
                method: "GET",
            })
                .then(this.parseResponse)
                .then(responseJson => {
                    return responseJson.response.venue;
                }).catch(error => {
                    console.error(error);
                })
        });
    };

    searchByLocation = place => {
        const url = "https://api.foursquare.com/v2/venues/search?ll=" + place.geometry.location.lat() + ',' + place.geometry.location.lng()
            + '&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET + '&v=20180715&limit=1';

        return fetch(url, {
            method: "GET",
        })
        .then(this.parseResponse)
        .then(responseJson => {
            return responseJson.response.venues[0].id;
        })
        .catch(error => {
            console.error(error);
        })
    };

    parseResponse = response => {
        const {handleOpen,isModalOpen} = this.props;
        if (response.status >= 200 && response.status < 300) {
            return response.json();
        } else {
            const error = new Error(response.statusText);
            error.response = response;

            if(!isModalOpen) {
                handleOpen();
            }

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
