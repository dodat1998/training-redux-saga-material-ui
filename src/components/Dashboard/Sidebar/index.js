import React, { Component } from "react";
import styles from "./styles";
import { withStyles } from "@material-ui/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { NavLink } from "react-router-dom";
import { ADMIN_ROUTES } from "./../../../constants";

class Sidebar extends Component {
  toggleDrawer = (value) => {
    const { onToggleSidebar } = this.props;
    if (onToggleSidebar) {
      onToggleSidebar(value);
    }
  };

  renderList = () => {
    const { classes } = this.props;
    let xhtml = null;
    xhtml = (
      <div className={classes.list}>
        <List component={"div"}>
          {ADMIN_ROUTES.map((route, index) => {
            return (
              <NavLink
                to={route.path}
                exact={route.exact}
                className={classes.menuLink}
                activeClassName={classes.activeMenuLink}
                key={index}
              >
                <ListItem className={classes.menuItem} button>
                  {route.name}
                </ListItem>
              </NavLink>
            );
          })}
        </List>
      </div>
    );
    return xhtml;
  };

  render() {
    const { classes, showSidebar } = this.props;
    return (
      <Drawer
        variant="persistent"
        open={showSidebar}
        onClose={() => this.toggleDrawer(false)}
        classes={{ paper: classes.drawPaper }}
      >
        {this.renderList()}
      </Drawer>
    );
  }
}

export default withStyles(styles)(Sidebar);
