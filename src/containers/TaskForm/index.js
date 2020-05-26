import React, { Component } from "react";
import styles from "./styles";
import { withStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import { Button, Box, MenuItem } from "@material-ui/core";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose, bindActionCreators } from "redux";
import * as modalActions from "./../../actions/modal";
import * as taskActions from "./../../actions/task";
import { Field, reduxForm } from "redux-form";
import RenderField from "./../../components/FormHelper/TextField";
import RenderSelectField from "./../../components/FormHelper/Select";
import validate from "./validate";

class TaskForm extends Component {
  handelSubmitForm = (data) => {
    const { taskActionCreators, taskEditing } = this.props;
    const { addTask, editTask } = taskActionCreators;
    const { title, description, status } = data;
    if (taskEditing && taskEditing.id) {
      editTask(title, description, status);
    } else {
      addTask({ title, description });
    }
  };

  renderStatusSelection = () => {
    const { taskEditing, classes } = this.props;
    let xhtml = null;
    if (taskEditing && taskEditing.id) {
      xhtml = (
        <Field
          id={"status"}
          label={"Trạng thái"}
          className={classes.select}
          component={RenderSelectField}
          name={"status"}
        >
          <MenuItem value={0}>Ready</MenuItem>
          <MenuItem value={1}>In progress</MenuItem>
          <MenuItem value={2}>Complete</MenuItem>
        </Field>
      );
    }
    return xhtml;
  };

  render() {
    var {
      classes,
      modalActionCreators,
      handleSubmit,
      submitting,
      invalid,
    } = this.props;
    const { hideModal } = modalActionCreators;
    return (
      <div className={classes.content}>
        <form onSubmit={handleSubmit(this.handelSubmitForm)}>
          <Grid container>
            <Grid item md={12}>
              <Field
                name="title"
                id={"title"}
                label={"title"}
                className={classes.textField}
                margin="normal"
                component={RenderField}
              />
            </Grid>
            <Grid item md={12}>
              <Field
                name="description"
                id={"description"}
                label={"description"}
                className={classes.textField}
                margin="normal"
                component={RenderField}
                multiline
                rowsMax={4}
              />
            </Grid>
            {this.renderStatusSelection()}
            <Grid item md={12}>
              <Box display="flex" flexDirection="row-reverse" mt={2}>
                <Button variant="contained" onClick={hideModal}>
                  Cancel
                </Button>
                <Box mr={2} ml={2}>
                  <Button
                    disabled={invalid || submitting}
                    type={"submit"}
                    variant="contained"
                    color="primary"
                  >
                    Save
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

TaskForm.propTypes = {
  classes: PropTypes.object,
  modalActionCreators: PropTypes.shape({
    hideModal: PropTypes.func,
  }),
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  taskActionCreators: PropTypes.shape({
    addTask: PropTypes.func,
    editTask: PropTypes.func,
  }),
  taskEditing: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    taskEditing: state.tasks.taskEditing,
    initialValues: {
      title: state.tasks.taskEditing ? state.tasks.taskEditing.title : null,
      description: state.tasks.taskEditing
        ? state.tasks.taskEditing.description
        : null,
      status: state.tasks.taskEditing ? state.tasks.taskEditing.status : null,
    },
  };
};

const mapDispatchToProps = (dispatch) => ({
  modalActionCreators: bindActionCreators(modalActions, dispatch),
  taskActionCreators: bindActionCreators(taskActions, dispatch),
});

const formName = "TASK_MANAGEMENT";

const withReduxForm = reduxForm({
  form: formName,
  validate,
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withStyles(styles),
  withConnect,
  withReduxForm
)(TaskForm);
