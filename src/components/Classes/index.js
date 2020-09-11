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
import orderBy from "lodash/orderBy";

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
      loading: false,
      formOpen: false,
      formMode: "",
      activeData: {}
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

  toggleForm = (mode, stayOpen) => {
    const { formOpen, formMode } = this.state;

    if (!stayOpen && formMode !== "") {
      this.setState({ formMode: "" });
    } else {
      this.setState({ formMode: mode });
    }

    if (stayOpen) {
      this.setState({ formOpen: false });
      setTimeout(() => this.setState({ formOpen: true }), 100);
    } else {
      this.setState({ formOpen: !formOpen });
    }
  };

  onEdit = item => {
    this.setState({ activeData: item });
    this.setState({ formMode: "edit" });
    this.setState({ formOpen: false });
    setTimeout(() => this.setState({ formOpen: true }), 100);
  };

  render() {
    const { classes, courses } = this.props;
    const { formOpen, formMode, activeData } = this.state;

    const orderedCourses = orderBy(courses, "name", "asc");

    return (
      <>
        <Header />
        <div className={classes.root}>
          <Grid container>
            <Grid item xs={6}>
              <p className={classes.title}>Class List</p>
              {orderedCourses.map(c => {
                return (
                  <div key={c._id} className={classes.classDiv} onClick={e => this.onEdit(c)}>
                    <FolderIcon style={{ color: "#FFF", transform: "scale(3)" }}/>
                    <p className={classes.divText}>{c.name}</p>
                  </div>
                );
              })}
              <IconButton
                onClick={e => formOpen ? this.toggleForm("create", true) : this.toggleForm("create", false)}
                style={{ marginLeft: "75%" }}
              >
                <CreateNewFolderIcon style={{ color: "#FFF", transform: "scale(2)" }}/>
              </IconButton>
            </Grid>
            <Grid item xs={6} style={{ paddingTop: 75 }}>
              <div>
                {formOpen && <ClassForm closeHandler={this.toggleForm} mode={formMode} activeData={activeData} />}
              </div>
            </Grid>
          </Grid>
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Classes));
