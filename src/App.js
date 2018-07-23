import React, {PureComponent} from 'react';
import './App.css';
import Map from "./view/Map";
import LocationList from "./view/LocationList";
import {INITIAL_MARKERS} from "./model/constants";
import Grid from '@material-ui/core/Grid';
import ErrorModal from "./view/Modal";


class App extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            counter: 0,
            places: [],
            initialPlaces: [],
            isModalOpen: false,
            selectedPlace: null
        };
    }

    handleOpen = () => {
        this.setState({ isModalOpen: true });
    };

    handleClose = () => {
        this.setState({ isModalOpen: false });
    };

    setInitialPlaces = places => {
        this.setState({initialPlaces: places}, () => {
            const {initialPlaces} = this.state;
            this.setState({places: initialPlaces})
        })
    }

    filterByKeyword = keyword => {
        const {initialPlaces} = this.state;
        const trimmedKeyword = keyword.toLowerCase().trim();

        if (trimmedKeyword.length !== 0) {
            const filteredPlaces = initialPlaces.filter(place => {

                // Search by name
                if (place.hasOwnProperty('name') && place.name.toLowerCase().trim().search(trimmedKeyword) !== -1) {
                    return true;
                }

                // Search by type
                if (place.hasOwnProperty('types')) {
                    let hasKeyword = false;
                    place.types.forEach(type => {
                        if (type.toLowerCase().trim().search(trimmedKeyword) !== -1) {
                            hasKeyword = true;
                        }
                    })
                    console.log(hasKeyword)
                    return hasKeyword;
                }

            })
            this.setState({places: filteredPlaces});
        } else {
            this.setState({places: initialPlaces});
        }
    }

    setSelectedPlace = selectedPlace => {
        this.setState({selectedPlace : selectedPlace})
    }

    render() {
        const {places, isModalOpen, selectedPlace} = this.state;

        return (
            <div className="App">
                <Grid container>
                    <Grid item xs={12} sm={3} className="LocationList">
                        <LocationList
                            places={places}
                            filterByKeyword={this.filterByKeyword}
                            setSelectedPlace={this.setSelectedPlace}
                        />
                    </Grid>
                    <Grid item xs={12} sm={9} className="Map">
                        <Map
                            places={places}
                            setInitialPlaces={this.setInitialPlaces}
                            handleOpen={this.handleOpen}
                            // selectedPlace={selectedPlace}
                        />
                    </Grid>
                </Grid>
                <ErrorModal
                    handleClose={this.handleClose}
                    isModalOpen={isModalOpen}
                />
            </div>
        );
    }
}

export default App;
