import React, { Component } from 'react';
import { observer } from 'mobx-react' 
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

const AssetsList = ({ assets }) => {
    return (
        <div className="assets-list">
            {assets.length > 0 && <h4>Assets:</h4>}
            <ul>
                {assets.map((asset, index) => (<li key={index}>{asset}</li>))}
            </ul>
        </div>
    )
}


const EditPanel = observer(class EditPanel extends Component {
    state = {
        value: ''
    }

    onSubmit = (e) => {
        e.preventDefault()
        this.props.store.addAsset(this.state.value)
        this.setState({ value: ''})
    }

    onChange = (e) => {
        this.setState({ value: e.target.value })
    }

    render () {
        return (
            <Alert bsClass="edit-panel" onDismiss={this.props.onDismiss}>
                <div className="info">
                    <h4>Configure "{this.props.assetId}"</h4>
                </div>
                <div className="actions">
                    <form onSubmit={this.onSubmit}>
                        <FieldGroup
                            type="text"
                            label="Asset value"
                            placeholder="Enter text"
                            value={this.state.value}
                            onChange={this.onChange}
                        />
                        <Button bsSize="lg" bsStyle="success" block type="submit">Add</Button>
                    </form>
                    <AssetsList key={this.props.store.assets} assets={this.props.store.assets} />
                </div>
            </Alert>
        )
    }
})

export default EditPanel;
