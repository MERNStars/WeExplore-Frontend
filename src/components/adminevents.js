import React, { Component } from "react";
import AdminEventCard from "../components/adminEventCards";
import styles from "../styles/admin.module.scss";
import { Menu, Segment } from "semantic-ui-react";
require("dotenv").config();

export default class AdminEvents extends Component {
  state = { activeItem: 'Published Events' }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  testTab() {  
    const { activeItem } = this.state
    return(
      <>
      <Menu attached='top' tabular>
      <Menu.Item
        name='Published Events'
        active={activeItem === 'Published Events'}
        onClick={this.handleItemClick}
      />
      <Menu.Item
        name='Unpublished Events'
        active={activeItem === 'Unpublished Events'}
        onClick={this.handleItemClick}
      />
      <Menu.Item
        name='Past Events'
        active={activeItem === 'Past Events'}
        onClick={this.handleItemClick}
        />
    </Menu>
        <Segment attached='bottom'>
        <div className={styles.eventsContainer}>
          {this.state.activeItem === "Published Events" ? this.renderPublishedEvents() : this.state.activeItem === "Unpublished Events" ? this.renderUnpublishedEvents() : this.renderPastEvents()}
        </div>
        </Segment>
    </>
  )}

  renderPublishedEvents() {
    return(
    this.props.events &&
      this.props.events.map((event, i) => {
        return event.published && event.status !== "completed" ? (
          <AdminEventCard {...event} index={i} />
        ) : null;
      }))
  }

  renderUnpublishedEvents() {
    return(
    this.props.events &&
      this.props.events.map((event, i) => {
        return event.published ? null : (
          <AdminEventCard {...event} index={i} />
        );
      }))
  }

  renderPastEvents() {
    return(
    this.props.events &&
      this.props.events.map((event, i) => {
        return event.status === "completed" ? (
          <AdminEventCard {...event} index={i} />
        ) : null;
      }))
  }




  render() {
    return (
      this.testTab()
      // <>
      //   <h3>Published Events</h3>
      //   <div className={styles.eventsContainer}>
      //     
      //   </div>
      //   <h3>Unpublished Events</h3>
      //   <div className={styles.eventsContainer}>
      //     {this.props.events &&
      //       this.props.events.map((event, i) => {
      //         return event.published ? null : (
      //           <AdminEventCard {...event} index={i} />
      //         );
      //       })}
      //   </div>
      //   <h3>Past Events</h3>
      //   <div className={styles.eventsContainer}>
      //     {this.props.events &&
      //       this.props.events.map((event, i) => {
      //         return event.status === "completed" ? (
      //           <AdminEventCard {...event} index={i} />
      //         ) : null;
      //       })}
      //   </div>
      // </>
    );
  }
}
