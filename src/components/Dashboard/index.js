import React, { Component } from "react";
import styles from "./styles";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as uiAction from "./../../actions/ui";
import cn from "classnames";

import Header from "./Header";
import Sidebar from "./Sidebar";

class Dashboard extends Component {
  onToggleSidebar = (value) => {
    const { uiActionCreators } = this.props;
    const { showSidebar, hideSidebar } = uiActionCreators;
    if (value === true) {
      showSidebar();
    } else {
      hideSidebar();
    }
  };

  render() {
    const { children, classes, name, showSidebar } = this.props;
    return (
      <div className={classes.dashboard}>
        <Header
          name={name}
          showSidebar={showSidebar}
          onToggleSidebar={this.onToggleSidebar}
        />
        <div className={classes.wrapperSidebar}>
          <Sidebar
            showSidebar={showSidebar}
            onToggleSidebar={this.onToggleSidebar}
          />
          <div
            className={cn(classes.wrapperContent, {
              [classes.shiftLeft]: showSidebar === false,
            })}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  children: PropTypes.object,
  showSidebar: PropTypes.bool,
  classes: PropTypes.object,
  name: PropTypes.string,
  uiActionCreators: PropTypes.shape({
    hideSidebar: PropTypes.func,
    showSidebar: PropTypes.func,
  }),
};

const mapStateToProps = (state) => {
  return {
    showSidebar: state.ui.showSidebar,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    uiActionCreators: bindActionCreators(uiAction, dispatch),
  };
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Dashboard)
);
