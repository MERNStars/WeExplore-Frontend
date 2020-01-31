import React from 'react';

import styles from '../styles/event.module.scss';

class Presenters extends React.Component {

  adminDisplay = event => {
    
    return(
      event.presenters.map( (presenter) => {
        return(
          <p>{presenter.title} {presenter.first_name} {presenter.last_name}</p>
        )
      }))
  }

  eventDisplay = event => {
    const { presenters } = event;
      return presenters
        ? presenters.map(presenter => {
            return (
              <div className={styles.presenterBox}>
                <div>
                <span>
                  {presenter.title} {presenter.first_name} {presenter.last_name}
                </span>
                <br></br>
                <span>
                  <sub>{presenter.qualification}</sub>
                </span>
                <span>
                  <p>{presenter.short_description}</p>
                </span>
                </div>
                <img id={styles.profileImg} src={require("../assets/profile-photo.jpg")} alt="profile of presenter"/>
              </div>
            );
          })
        : null;
  }

  render() {
    if( this.props.location.pathname === "/admin")
    return (  
      this.adminDisplay(this.props)
    ); else 
    return( 
      this.eventDisplay(this.props)
     )
  } 
}

export default Presenters