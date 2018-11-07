import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button, Alert } from 'react-bootstrap'
import './EditPanel.css';

const FieldGroup = ({ id, label, help, ...props }) => {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}

class EditPanel extends Component {
    render () {
        return (
            <Alert bsClass="edit-panel" onDismiss={this.props.onDismiss}>
                <div className="info">
                    <h4>Configure "{this.props.name}"</h4>
                </div>
                <div className="actions">
                    <form>
                        <FieldGroup
                            id="formControlsText"
                            type="text"
                            label="Title"
                            placeholder="Enter text"
                        />
                        <Button bsSize="lg" bsStyle="success" block>Done</Button>
                        <Button bsSize="lg" bsStyle="danger" block>Delete</Button>
                    </form>
                </div>
            </Alert>
        )
    }
}

export default EditPanel;
