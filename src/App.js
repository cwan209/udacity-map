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
            locations: INITIAL_MARKERS
        };
    }

    render() {
        const { locations } = this.state;

        return (
            <div className="App">
                <Grid container>
                    <Grid item xs={3}>
                        <LocationList locations={locations}/>
                    </Grid>
                    <Grid item xs={9}>
                        <Map locations={locations}/>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default App;
