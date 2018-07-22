import React, {Component, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {
    Modal,
    Typography,
    ListItemText,
    Input,
    FormControl,
    InputLabel,
    InputAdornment,
    TextField
} from '@material-ui/core';
import './Modal.css';

class ErrorModal extends PureComponent {


    getModalStyle() {
        const top = 50;
        const left = 50;

        return {
            top: `${top}%`,
            left: `${left}%`,
        };
    }

    render() {
        const {handleOpen, handleClose, isModalOpen} = this.props;

        return (
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={isModalOpen}
                onClose={handleClose}
            >
                <div style={this.getModalStyle()} className="error-modal" >
                    <Typography variant="title" id="modal-title">
                        Network Error
                    </Typography>
                    <Typography variant="subheading" id="simple-modal-description">
                        There's some network errors, you may not be able to view all information..
                    </Typography>
                </div>
            </Modal>
        );
    }
}

ErrorModal.propTypes = {};

export default ErrorModal;
