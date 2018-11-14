import React, { Component } from "react";
import { observer } from "mobx-react";
import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Button,
  Alert
} from "react-bootstrap";
import "./css/EditPanel.css";
import { withBus } from "react-bus";

const FieldGroup = ({ id, label, help, ...props }) => {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
};

const AssetsList = ({ assets }) => {
  return (
    <div className="assets-list">
      {assets.length > 0 && <h4>Assets:</h4>}
      <ul>
        {assets.map((asset, index) => (
          <li key={index}>{asset}</li>
        ))}
      </ul>
    </div>
  );
};

const EditPanelPopup = withBus()(
  observer(
    class EditPanelPopup extends Component {
      state = {
        value: ""
      };

      onSubmit = e => {
        e.preventDefault();
        this.props.store.addAsset(this.state.value);
        this.setState({ value: "" });
        this.props.bus.emit("master.assetAdded");
      };

      onChange = e => {
        this.setState({ value: e.target.value });
      };

      render() {
        return (
          <Alert bsClass="edit-panel" onDismiss={this.props.onDismiss}>
            <div className="info">
              <h4>Configure something ...</h4>
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
                <Button bsSize="lg" bsStyle="success" block type="submit">
                  Add
                </Button>
              </form>
              <AssetsList
                key={this.props.store.assets}
                assets={this.props.store.assets}
              />
            </div>
          </Alert>
        );
      }
    }
  )
);

const EditPanel = withBus()(
  observer(
    class EditPanel extends Component {
      state = {
        showPopup: false
      };

      openPopup = () => this.setState({ showPopup: true });

      closePopup = () => this.setState({ showPopup: false });

      render() {
        return (
          <div>
            <span onClick={this.openPopup}>Edit</span>
            {this.state.showPopup && (
              <EditPanelPopup onDismiss={this.closePopup} {...this.props} />
            )}
          </div>
        );
      }
    }
  )
);

export default EditPanel;
