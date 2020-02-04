import React from "react";
import { RenderCategoriesField } from "../../FormFields/FormFields";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import validate from "../../FormFields/validate";
import {RenderTextField, RenderStatusField} from '../../FormFields/FormFields'

function mapStateToProps(state) {
  return {
    categories: state.eventReducer.event_categories,
    status: state.eventReducer.event_statuses
  };
}

const WizardFormFirstPage = props => {
  const { categories, status, handleSubmit, initialValues } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="event_name"
        component={RenderTextField}
        type="text"
        label="Event Name"
      />
      <Field
        name="description"
        component={RenderTextField}
        type="textarea"
        label="Description"
      />
      <Field
        name="event_date"
        component={RenderTextField}
        type="date"
        label="Event Date"
      />
      <Field
        name="event_start_time"
        component={RenderTextField}
        type="time"
        label="Event Start Time"
      />
      <Field
        name="event_end_time"
        component={RenderTextField}
        type="time"
        label="Event End Time"
      />
      <Field
        name="registration_closed_date"
        component={RenderTextField}
        type="date"
        label="Registration close date"
      />
      <Field
        name="is_family_friendly"
        component={RenderTextField}
        type="checkbox"
        label="Family Friendly"
      />
      <Field
        name="minimum_age"
        component={RenderTextField}
        type="number"
        label="Minimum Age"
      />
      <Field
        name="event_capacity"
        component={RenderTextField}
        type="number"
        label="Event Capacity"
      />
      <Field
        name="event_category"
        component={RenderCategoriesField}
        categories={categories}
        type="text"
        label="Event Category"
      />
      {initialValues && initialValues.status ? (
        <Field
          name="status"
          component={RenderStatusField}
          status={status}
          type="text"
          label="Status"
        />
      ) : null}

      <div>
        <button type="submit" className="next">
          Next
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: "wizard",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(connect(mapStateToProps)(WizardFormFirstPage));
