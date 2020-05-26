import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import styles from "./styles";
import loadingIcon from "./../../assets/image/giphy.gif";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";

class GlobalLoading extends Component {
  render() {
    const { classes, showLoading } = this.props;

    let xhtml = null;
    if (showLoading) {
      xhtml = (
        <div className={classes.globalLoading}>
          <img src={loadingIcon} alt="Loading..." className={classes.icon} />
        </div>
      );
    }

    return xhtml;
  }
}

GlobalLoading.propTypes = {
  classes: PropTypes.object,
  showLoading: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    showLoading: state.ui.showLoading,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     uiActionCreators: bindActionCreators(uiActions, dispatch),
//   };
// };

const withConnect = connect(mapStateToProps, null);

// export default withStyles(styles)(
//   connect(mapStateToProps, mapDispatchToProps)(GlobalLoading)
// );

export default compose(withStyles(styles), withConnect)(GlobalLoading);
