import React from "react";
import CreateEventForm from "../components/CreateEventForm";
import { connect } from "react-redux";
import { createEvent, resetNewImage } from "../reducers/event_reducer";
import config from "../components/CreateEventForm/awsconfig";
import { withRouter } from "react-router-dom";
import S3 from "react-aws-s3";
const { uuid } = require("uuidv4");

require("dotenv").config();

// Brings in the state newImage
function mapStateToProps(state) {
  return {
    newImage: state.eventReducer.newImage
  };
}

// Sends off data to the reducer
const mapDispatchToProps = dispatch => {
  return {
    createEvent: eventData => {
      dispatch(createEvent(eventData));
    },
    resetNewImage: () => {
      dispatch(resetNewImage());
    }
  };
};


export class CreateEvent extends React.Component {
  handleSubmit = event => {
    let presentersID = [];
    if (event.selectedPresenters) {
      event.selectedPresenters.map(presenter => {
        presentersID.push(presenter.id);
      });
      event.presenters = presentersID;
    }
    console.log(event);
    const ReactS3Client = new S3(config);
    const newFileName = `${uuid()}`;
    if (this.props.newImage) {
      ReactS3Client.uploadFile(this.props.newImage, newFileName)
        .then(data => {
          console.log("Uploaded file...response");
          event.images = [data.location];
          console.log(event);
          this.props.createEvent(event);
          this.setState({
            display_message: "Your event has been created."
          });
          this.props.resetNewImage();
          window.location.href = "/admin";
        })
        .catch(err => console.error(err));
    } else {
      event.image = [];
      this.props.createEvent(event);
      this.setState({
        display_message: "Your event has been created."
      });
      console.log("test");
      window.location.href = "/admin";
    }
  };

  render() {
    return (
      <div>
        <CreateEventForm handleSubmit={this.handleSubmit} />
      </div>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CreateEvent)
);
