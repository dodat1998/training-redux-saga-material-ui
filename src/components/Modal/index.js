import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import styles from "./styles";
import { Cancel } from "@material-ui/icons";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose, bindActionCreators } from "redux";
import * as modalActions from "./../../actions/modal";
import { Modal } from "@material-ui/core";

class ModalForm extends Component {
  render() {
    const { classes, open, component, modalActionCreators, title } = this.props;
    const { hideModal } = modalActionCreators;
    return (
      <Modal open={open} onClose={hideModal}>
        <div className={classes.modalStyle}>
          <div className={classes.header}>
            <span className={classes.title}>{title}</span>
            <Cancel size="large" className={classes.icon} onClick={hideModal} />
          </div>
          <div className={classes.content}>{component}</div>
        </div>
      </Modal>
    );
  }
}

ModalForm.propTypes = {
  classes: PropTypes.object,
  title: PropTypes.string,
  open: PropTypes.bool,
  modalActionCreators: PropTypes.shape({
    hideModal: PropTypes.func,
  }),
};

const mapStateToProps = (state) => ({
  open: state.modals.showModal,
  component: state.modals.component,
  title: state.modals.title,
});

const mapDispatchToProps = (dispatch) => ({
  modalActionCreators: bindActionCreators(modalActions, dispatch),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withStyles(styles), withConnect)(ModalForm);
