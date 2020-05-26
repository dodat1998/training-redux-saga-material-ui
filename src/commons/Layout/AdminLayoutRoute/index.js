import React, { Component } from "react";

import { Route } from "react-router-dom";
import Dashboard from "./../../../components/Dashboard";

import PropTypes from "prop-types";

class AdminLayoutRoute extends Component {
  render() {
    const { component: YourComponent,name ,remainProps } = this.props;
    return (
      <Route
        {...remainProps}
        render={(routeProps) => {
          return (
            <Dashboard name={name}>
              <YourComponent {...routeProps} />
            </Dashboard>
          );
        }}
      />
    );
  }
}
AdminLayoutRoute.propTypes = {
  path: PropTypes.string,
  exact: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.object,PropTypes.func]),
  name: PropTypes.string,
};

export default AdminLayoutRoute;
