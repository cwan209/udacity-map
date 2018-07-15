import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Map from "./view/Map";

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            counter: 0,
        };
    }

    render() {

        return (
            <div className="App">
                <Map/>
            </div>
        );
    }
}

export default App;
