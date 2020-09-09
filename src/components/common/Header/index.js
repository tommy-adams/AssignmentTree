import React, { Component } from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "../Menu";
import { withStyles } from "@material-ui/core/styles";
import styles from "./style";

class Header extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false
    };
  };

  onMenuClick = () => {
    const { menuOpen } = this.state;
    this.setState({ menuOpen: !menuOpen });
  };

  render() {
    const { classes } = this.props;
    const { menuOpen } = this.state;

    return (
      <>
        {menuOpen && <Menu closeHandler={this.onMenuClick} />}
        <div className={classes.root}>
          <IconButton onClick={this.onMenuClick} className={classes.menuBtn}>
            <MenuIcon className={classes.icon} />
          </IconButton>
          <p className={classes.text}>Assignment Tree</p>
        </div>
      </>
    );
  }
}

export default withStyles(styles)(Header);
