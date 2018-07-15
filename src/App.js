import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Map from "./view/Map";
import LocationList from "./view/LocationList";
import { INITIAL_MARKERS } from "./model/constants";

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
                <Map locations={locations}/>
                <LocationList locations={locations}/>
            </div>
        );
    }
}

export default App;
