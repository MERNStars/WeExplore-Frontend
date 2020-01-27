import Axios from "axios";
require("dotenv").config();

const initialState = {
  event_categories: [
    "bible seminar",
    "career seminar",
    "exercise class",
    "health seminar",
    "healthy cooking",
    "lifestyle change workshop",
    "mental health workshop",
    "massage service",
    "others",
    "addiction recovery",
    "weight-loss program"
  ],

  event_statuses: [
    "scheduled",
    "canceled",
    "postponed",
    "completed",
    "sold out"
  ],
  
    message: '',

    events: []
}

export const populateEvents = (events) => {
    return {
        type: "POPULATE_EVENTS",
        data: events
    }
}

export const deleteEvents = (events) => {
    return {
        type: "EVENT_DELETED",
        data: events
    }
}

const eventCreated = message => ({
  type: "EVENT_CREATED",
  message: message
});

const eventUpdated = data => ({
  type: "EVENT_EDITED",
  data: data
});

export const createEvent = event => {
  return dispatch => {
    // console.log(`${event.event_date}T${event.event_start_time}`);
    // console.log(`${event.event_date}T${event.event_end_time}`);
    Axios.post(
      `http://localhost:8888/events/create`,
      {
        event_name: event.event_name,
        description: event.description,
        event_date: {
          begin: `${event.event_date}T${event.event_start_time}`,
          end: `${event.event_date}T${event.event_end_time}`
        },
        registration_closed_date: `${event.registration_closed_date}T23:55:55.000Z`,
        presenters: ["5e2001deccc10275c4a1a11f"],
        is_family_friendly: event.is_family_friendly,
        minimum_age: event.minimum_age,
        event_category: event.event_category,
        status: event.status,
        images: event.images,
        event_capacity: event.event_capacity,
        published: event.published
      },
      {
        headers: {
          authorization: `${localStorage.weexplore_token}`
        }
      }
    ).then(response => {
      // console.log(response);
      dispatch(eventCreated(response.data));
    });
  };
};

export const editEvent = event => {
  return dispatch => {
    console.log("Edit Event ...");
    console.log(event);
    Axios({
      url: "http://localhost:8888/events/update",
      method: "PATCH",
      data: event,
      headers: {
          authorization: `${localStorage.weexplore_token}`
        }
    }
    ).then(response => {
        console.log("Data from response...");
        
        console.log(response.data);
        dispatch(eventUpdated(response.data));
    })
    .catch(err => {
      console.error("Ooops...there is a problem.");
      
      console.error(err);
    });
  };
}



const eventReducer = (state=initialState, action) => {

    let newState = {};
    switch(action.type){
        case "EVENT_CREATED":
            newState = { ...state, message: "Your event has been created." };
            break;
        case "EVENT_DELETED":
            newState = { ...state, message: "Your event has been deleted.", events: action.data };
            break;  
        case "POPULATE_EVENTS":
            newState = { ...state, events: action.data };
            break;
        case "EVENT_EDITED":
            let updated_events = state.events;
            console.log("Before data...");
            console.log(updated_events);
                        
            console.log("Returned data...")
            console.log(action.data);
            
            const index = updated_events.findIndex(event => event._id === action.data._id);
            updated_events[index] = action.data;
            newState = { ...state, events: updated_events };
            break;
        default:
            newState = { ...state};
            break;
    }
    return newState;
}

export default eventReducer;
