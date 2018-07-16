import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Map from "./view/Map";
import LocationList from "./view/LocationList";
import {INITIAL_MARKERS} from "./model/constants";
import Grid from '@material-ui/core/Grid';


class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            counter: 0,
            places: [],
            initialPlaces: []
        };
    }

    setInitialPlaces = places => {
        this.setState({initialPlaces: places}, () => {
            const {initialPlaces} = this.state;
            this.setState({places: initialPlaces})
        })
        console.log(this.state.places);
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

    render() {
        const {places} = this.state;

        return (
            <div className="App">
                <Grid container>
                    <Grid item xs={3}>
                        <LocationList
                            places={places}
                            filterByKeyword={this.filterByKeyword}
                        />
                    </Grid>
                    <Grid item xs={9}>
                        <Map
                            places={places}
                            setInitialPlaces={this.setInitialPlaces}
                        />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default App;
