import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import { List, ListItem, ListItemText, Input, FormControl, InputLabel, InputAdornment, TextField} from '@material-ui/core';

class LocationList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            keyword: ''
        }
    }

    componentDidMount() {

    }

    render() {
        const { locations } = this.props;
        const { keyword } = this.state;

        return (
            <div>
                <FormControl fullWidth className="Filter">
                    <TextField
                        id="select-currency-native"
                        label="Native select"
                        // className={classes.textField}
                        value={keyword}
                        onChange={event => this.setState({ keyword: event.target.value})}
                        // SelectProps={{
                        //     native: true,
                        //     MenuProps: {
                        //         className: classes.menu,
                        //     },
                        // }}
                        helperText="Please filter"
                        margin="normal"
                    />
                </FormControl>
                <List component="nav">
                {
                    locations.map((location, index) =>
                        <ListItem button key={index}>
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
