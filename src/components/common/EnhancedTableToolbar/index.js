import React, { Component } from "react";
import PropTypes from "prop-types";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Logo from "./media/logo.png";
import { withStyles } from "@material-ui/core/styles";
import styles from "./style";

class EnhancedTableToolbar extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    onSearch: PropTypes.func.isRequired
  };

  render() {
    const { classes, onSearch } = this.props;

    return (
      <Toolbar>
        <p className={classes.title}>Assignments</p>
        <div className={classes.search}>
          <SearchIcon className={classes.searchIcon}/>
          <InputBase
            placeholder="Search by class or assignment"
            className={classes.searchInput}
            onChange={onSearch}
          />
        </div>
        <img src={Logo} className={classes.image} alt="Stanford University logo" />
      </Toolbar>
    )
  }
}

export default withStyles(styles)(EnhancedTableToolbar);
