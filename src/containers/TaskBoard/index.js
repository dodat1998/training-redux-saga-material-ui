import React, { Component } from "react";
import styles from "./styles";
import { withStyles } from "@material-ui/styles";
import { Grid, Box } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { STATUS } from "../../constants";
import TaskList from "./../../components/TaskList";
import TaskForm from "./../../containers/TaskForm";
import SearchBox from "./../../components/searchBox";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as taskAction from "./../../actions/task";
import * as modalAction from "./../../actions/modal";

class TaskBoard extends Component {
  componentDidMount() {
    const { taskActionCreators } = this.props;
    const { fetchListTask } = taskActionCreators;
    fetchListTask();
  }

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  openForm = () => {
    const { modalActionCreators, taskActionCreators } = this.props;
    const { setTaskEditing } = taskActionCreators;
    setTaskEditing(null);
    const {
      showModal,
      changeModalTitle,
      changeModalContent,
    } = modalActionCreators;
    showModal();
    changeModalTitle("Thêm mới công việc ");
    changeModalContent(<TaskForm />);
  };

  handleFilter = (e) => {
    const { value } = e.target;
    const { taskActionCreators } = this.props;
    const { filterTask } = taskActionCreators;
    filterTask(value);
  };

  handleEditTask = (task) => {
    const { taskActionCreators, modalActionCreators } = this.props;
    const { setTaskEditing } = taskActionCreators;
    setTaskEditing(task);
    const {
      showModal,
      changeModalTitle,
      changeModalContent,
    } = modalActionCreators;
    showModal();
    changeModalTitle("Chỉnh sủa công việc");
    changeModalContent(<TaskForm />);
  };
  handleDeleteTask = (task) => {
    const { id } = task;
    const { taskActionCreators } = this.props;
    const { deleteTask } = taskActionCreators;
    deleteTask(id);
  };

  showModalDeleteTask = (task) => {
    const { modalActionCreators, classes } = this.props;
    const {
      showModal,
      changeModalTitle,
      changeModalContent,
      hideModal,
    } = modalActionCreators;
    showModal();
    changeModalTitle("Xoá công việc");
    changeModalContent(
      <div className={classes.modalDelete}>
        <div className={classes.modalConfirmText}>
          Bạn chắc chắn muốn xoá <span>{task.title}</span> ?
        </div>
        <Box display={"flex"} flexDirection="row-reverse" mt={2}>
          <Box ml={1}>
            <Button variant="contained" onClick={hideModal}>
              Cancel
            </Button>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.handleDeleteTask(task)}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </div>
    );
  };
  renderBoards = () => {
    const { listTask } = this.props;
    let xhtml = null;
    xhtml = (
      <Grid container spacing={2}>
        {STATUS.map((status, index) => {
          var taskFilter = listTask.filter(
            (task) => task.status === status.value
          );
          return (
            <TaskList
              key={index}
              tasks={taskFilter}
              status={status}
              onClickEdit={this.handleEditTask}
              onClickDelete={this.showModalDeleteTask}
            />
          );
        })}
      </Grid>
    );
    return xhtml;
  };

  renderSearchBox = () => {
    let xhtml = null;
    xhtml = <SearchBox handleChange={this.handleFilter} />;
    return xhtml;
  };

  render() {
    var { classes } = this.props;
    return (
      <div className={classes.TaskBoard}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={this.openForm}
        >
          <Add /> Thêm công việc
        </Button>
        {this.renderSearchBox()}
        {this.renderBoards()}
      </div>
    );
  }
}

TaskBoard.propTypes = {
  classes: PropTypes.object,
  taskActionCreators: PropTypes.shape({
    fetchListTask: PropTypes.func,
    filterTask: PropTypes.func,
    setTaskEditing: PropTypes.func,
    deleteTask: PropTypes.func,
  }),
  modalActionCreators: PropTypes.shape({
    showModal: PropTypes.func,
    hideModal: PropTypes.func,
    changeModalTitle: PropTypes.func,
    changeModalContent: PropTypes.func,
  }),
  listTask: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    listTask: state.tasks.listTask,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    taskActionCreators: bindActionCreators(taskAction, dispatch),
    modalActionCreators: bindActionCreators(modalAction, dispatch),
  };
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(TaskBoard)
);
