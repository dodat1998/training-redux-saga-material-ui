import React, { Component } from "react";
import styles from "./styles";
import { Grid, Box } from "@material-ui/core";
import TaskItem from "./../TaskItem";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";

class TaskList extends Component {
  render() {
    const { classes, onClickEdit,onClickDelete } = this.props;
    const { tasks, status } = this.props;
    return (
      <Grid item md={4} xs={12}>
        <div className={classes.status}>
          <Box mt={2} mb={2}>
            <div className={classes.status}>{status.label}</div>
          </Box>
          <div className={classes.wrapperListTask}>
            {tasks.map((task, index) => {
              return (
                <TaskItem
                  key={index}
                  task={task}
                  status={status}
                  onClickEdit={() => onClickEdit(task)}
                  onClickDelete={() => onClickDelete(task)}
                />
              );
            })}
          </div>
        </div>
      </Grid>
    );
  }
}
TaskList.propTypes = {
  classes: PropTypes.object,
  onClickEdit: PropTypes.func,
  tasks: PropTypes.array,
  status: PropTypes.object,
};

export default withStyles(styles)(TaskList);
