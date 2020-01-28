import React, { Component } from "react";
import AdminEventCard from "../components/adminEventCards";
import EditEvent from "../components/editEvent";
import styles from "../styles/admin.module.scss";


require('dotenv').config()


export default class AdminEvents extends Component {

  editEvent = event => {
    return(
      <EditEvent {...event}/>
      )
  }
    

  render() {
    return (
      <>
      <h3>Published Events</h3>
        <div className={styles.eventsContainer}>
          {this.props.events
            ? this.props.events.map((event, i) => {
                return ( event.published ? <AdminEventCard {...event} key={i} index={i} /> : null )})
            : null}
        </div>
        <h3>Unpublished Events</h3>
        <div className={styles.eventsContainer}>
          {this.props.events
            ? this.props.events.map((event, i) => {
                return ( event.published ? null : <AdminEventCard {...event} index={i} /> )})
            : null}
        </div>
      </>
    );
  }
}

