import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import { List, ListItem, ListItemText} from '@material-ui/core';

class LocationList extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    shouldComponentUpdate(nextProps, nextState) {

    }

    componentWillUpdate(nextProps, nextState) {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    componentWillUnmount() {

    }

    render() {
        const { locations } = this.props;

        return (
            <div>
                <List component="nav">
                {
                    locations.map(location =>
                        <ListItem button>
                            <ListItemText primary={location.title} />
                        </ListItem>
                    )
                }
                </List>
            </div>
        );
    }
}

LocationList.propTypes = {};

export default LocationList;
