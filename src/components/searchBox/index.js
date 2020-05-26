import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import styles from "./styles";
import { TextField } from "@material-ui/core";
import PropTypes from "prop-types";

class SearchBox extends Component {
  render() {
    const { classes, handleChange } = this.props;
    return (
      <div>
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            className={classes.textField}
            onChange={handleChange}
            margin="normal"
            autoComplete="off"
            placeholder="Enter keyword ..."
            fontSize={16}
          />
        </form>
      </div>
    );
  }
}

SearchBox.propTypes = {
  classes: PropTypes.object,
  handleChange: PropTypes.func,
};

export default withStyles(styles)(SearchBox);
