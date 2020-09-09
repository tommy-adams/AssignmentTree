import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as classAction from "../../actions/classActions";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import FolderIcon from "@material-ui/icons/Folder";
import CreateNewFolderIcon from "@material-ui/icons/CreateNewFolder";
import Header from "../common/Header";
import ClassForm from "../common/ClassForm";
import { withStyles } from "@material-ui/core/styles";
import styles from "./style";

const mapStateToProps = state => {
  const { schedule } = state.sched;
  return { courses: schedule };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...classAction }, dispatch)
});

class Classes extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    courses: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  };

  componentDidMount = () => {
    this.fetchData();
  };

  fetchData = async () => {
    const { actions } = this.props;
    const { loading } = this.state;

    if (!loading) {
      try {
        this.setState({ loading: true });
        await actions.loadClasses();
        this.setState({ loading: false });
      } catch (err) {
        console.error(err);
      }
    }
  };

  render() {
    const { classes, courses } = this.props;

    return (
      <>
        <Header />
        <div className={classes.root}>
          <Grid container>
            <Grid item xs={6}>
              <p className={classes.title}>Class List</p>
              {courses.map(c => {
                return (
                  <div className={classes.classDiv}>
                    <FolderIcon style={{ color: "#FFF", transform: "scale(3)" }}/>
                    <p className={classes.divText}>{c.name}</p>
                  </div>
                );
              })}
              <IconButton style={{ marginLeft: "75%" }}>
                <CreateNewFolderIcon style={{ color: "#FFF", transform: "scale(2)" }}/>
              </IconButton>
            </Grid>
            <Grid item xs={6} style={{ paddingTop: 75 }}>
              <div>
                <ClassForm />
              </div>
            </Grid>
          </Grid>
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Classes));
