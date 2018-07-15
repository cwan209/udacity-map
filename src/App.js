import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Map from "./view/Map";
import LocationList from "./view/LocationList";
import { INITIAL_MARKERS } from "./model/constants";
import Grid from '@material-ui/core/Grid';


class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            counter: 0,
            places: []
        };
    }

    setPlaces = places => {
        this.setState({ places: places})
        console.log(this.state.places);
    }

    render() {
        const { places } = this.state;

        return (
            <div className="App">
                <Grid container>
                    <Grid item xs={3}>
                        <LocationList places={places}/>
                    </Grid>
                    <Grid item xs={9}>
                        <Map
                            places={places}
                            setPlaces={this.setPlaces}
                        />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default App;
