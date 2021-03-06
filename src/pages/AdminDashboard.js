import React, { Component } from "react";
import axios from "axios";
import AdminEvent from "../components/AdminDashboard/adminevents";
import AdminMembers from "../components/AdminDashboard/adminmembers";
import { Grid, Menu } from "semantic-ui-react";
import { connect } from "react-redux";
import Moment from "moment";
import { populateEvents } from "../reducers/event_reducer";
import { NotificationManager } from "react-notifications";
import { loadPresenters } from "../reducers/presenter_reducer";
import styles from "../styles/admin.module.scss";
require("dotenv").config();

function mapStateToProps(state) {
  return {
    isAdmin: state.userReducer.isAdmin,
    events: state.eventReducer.events,
    presenters: state.presenterReducer.presenters,
    message: state.eventReducer.message
  };
}

const mapDispatchToProps = {
  populateEvents,
  loadPresenters
};

function AdminDisplay(props) {
  const pageStatus = props.pageStatus;
  if (pageStatus === "events") {
    return <AdminEvent events={props.events} presenters={props.presenters} />;
  }
  return <AdminMembers />;
}

class AdminDashboard extends Component {
  state = {
    pageStatus: "events"
  };

  handleClick = e => {
    e.preventDefault();
    this.setState({ pageStatus: "members" });
  };

  handleClick2 = e => {
    e.preventDefault();
    this.setState({ pageStatus: "events" });
  };

  async componentDidMount() {
    this.props.loadPresenters();
    const response = await axios
      .get(`${process.env.REACT_APP_BACKEND_DB_URL}/events`)
      .catch(error => {
        console.log(`ERROR: ${error}`);
      });
    const data = await response.data;

    const sortedArray = data.sort(
      (a, b) =>
        new Moment(a.event_date.begin).format("YYYYMMDD") -
        new Moment(b.event_date.begin).format("YYYYMMDD")
    );
    this.props.populateEvents(sortedArray);

    if (localStorage.message) {
      NotificationManager.success(null, localStorage.message);
      localStorage.removeItem("message");
    }
  }

  renderAdminPage() {
    const { pageStatus } = this.state;
    const { events } = this.props;
    return (
      <div className={styles.adminDashboard}>
        <Grid columns={2} divided>
          <Grid.Row>
            <Grid.Column width={1}></Grid.Column>
            <Menu pointing secondary vertical size="huge">
              <Menu.Header>Admin Dashboard</Menu.Header><br />
              <Menu.Item
                name="Events"
                active={pageStatus === "events"}
                onClick={this.handleClick2}
              />
              <Menu.Item
                name="Members"
                active={pageStatus === "members"}
                onClick={this.handleClick}
              />
            </Menu>
            <Grid.Column width={10}>
              <AdminDisplay
                page={true}
                events={events}
                pageStatus={pageStatus}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }

  render() {
    return this.renderAdminPage();
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);
