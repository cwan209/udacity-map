import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
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

    onChangeKeyword = event => {
        const { filterByKeyword } = this.props;
        const keyword = event.target.value;

        this.setState({ keyword: keyword});
        filterByKeyword(keyword);
    }

    render() {
        const { places } = this.props;
        const { keyword } = this.state;

        return (
            <div>
                <FormControl fullWidth className="Filter">
                    <TextField
                        id="search-place"
                        label="Please search"
                        // className={classes.textField}
                        value={keyword}
                        onChange={event => this.onChangeKeyword(event)}
                        // SelectProps={{
                        //     native: true,
                        //     MenuProps: {
                        //         className: classes.menu,
                        //     },
                        // }}
                        helperText="Type in place name or type"
                        margin="normal"
                    />
                </FormControl>
                <List component="nav">
                {
                    places.map((place, index) =>
                        <ListItem button key={index}>
                            <ListItemText primary={place.name} />
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
