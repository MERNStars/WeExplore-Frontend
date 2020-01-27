import React, { Component } from "react";
import axios from "axios";
import AdminEvent from "../components/adminevents";
import AdminMembers from "../components/adminmembers";
import { Grid, Card } from "semantic-ui-react";
import { connect } from "react-redux";
import { populateEvents } from '../reducers/event_reducer'
import {loadPresenters} from '../reducers/presenter_reducer';

function mapStateToProps(state) {
  return { isAdmin: state.userReducer.isAdmin, events: state.eventReducer.events, presenters: state.presenterReducer.presenters };
}

const mapDispatchToProps = {
  populateEvents, loadPresenters
}

function AdminDisplay(props) {
  const pageStatus = props.pageStatus;
  if (pageStatus === "events") {
    return <AdminEvent events={props.events} />;
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
      .get("https://weexplorebackend.herokuapp.com/events")
      .catch(error => {
        console.log(`ERROR: ${error}`);
      });
    const data = await response.data;
    this.props.populateEvents(data);
    // console.log("No. presenters" + this.props.presenters.length);
  }


  renderAdminPage() {
      const { pageStatus } = this.state;
      const { events } = this.props
      return (
        <>
          <Grid columns={2} divided>
            <Grid.Row></Grid.Row>
            <Grid.Row>
              <Grid.Column width={2}></Grid.Column>
              <div>
                <button onClick={this.handleClick2}>Events</button>
                <br />
                <button onClick={this.handleClick}>Members</button>
              </div>
              <Grid.Column width={10}>
                <Card 
                href="/create-event"
                header='+'
                description="Add New Event"
                />
                <AdminDisplay
                  page={true}
                  events={events}
                  pageStatus={pageStatus}/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </>
      );
  }

  render() {
    return this.renderAdminPage();
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);
