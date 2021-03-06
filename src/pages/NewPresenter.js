import React, { Component } from "react";
import AddNewPresenter from "../components/Presenters/AddNewPresenter";
import Axios from "axios";
import {Segment} from 'semantic-ui-react';
import styles from '../styles/form.module.scss';

require("dotenv").config();

const token = {
  authorization: `${localStorage.weexplore_token}`
};

class NewPresenter extends Component {
  handleSubmit = data => {
    console.log(data);
    try {
      Axios.post(
        `${process.env.REACT_APP_BACKEND_DB_URL}/presenters/create`,
        data,
        {
          headers: token
        }
      ).then(response => {
        console.log(response);
        if (response.statusText === "Created") {
          this.props.history.goBack();
        }
      });
    } catch (error) {
      console.log(`You have an error: ${error}`);
    }
  };


  // Passed through this.props.history to be able to go back to previous page

  render() {
    return (
      <div className={styles.FormContainer}>
        <Segment id={styles.eventFormSegment} raised color='green'>
          <AddNewPresenter onSubmit={this.handleSubmit} previousPage={this.props.history} /><br />
        </Segment>
     </div>
    );
  }
}

export default NewPresenter;
