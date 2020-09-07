import React, { Component } from "react";
import PropTypes from "prop-types";
import * as assignmentAction from "../../actions/assignmentActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Header from "../common/Header";
import EnhancedTable from "../common/EnhancedTable";
import { withStyles } from "@material-ui/core/styles";
import styles from "./style";

const mapStateToProps = state => {
  const { assignments, total } = state.assignment;
  return { classAssignments: { assignments, total } };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...assignmentAction }, dispatch)
});

const columnData = [
  { id: "class", label: "Class"},
  { id: "name", label: "Assignment"},
  { id: "description", label: "Description"},
  { id: "due", label: "Due"},
  { id: "complete", label: "Complete" }
];

class Home extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    classAssignments: PropTypes.object.isRequired
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
      this.setState({ loading: true });
      try {
        await actions.loadAssignments();
      } catch (err) {
        console.error(err);
      }
      this.setState({ loading: false });
    }
  };

  render() {
    const {
      classes,
      classAssignments: {
        assignments,
        total
      }
    } = this.props;

    return (
      <>
        <Header />
        <div className={classes.root}>
          <p className={classes.title}>Welcome!</p>
          <p className={classes.text}>please use this platform to keep track of your assignments at Stanford University :)</p>
          {total && <EnhancedTable columnData={columnData} data={assignments} rows={total} />}
        </div>
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home));
