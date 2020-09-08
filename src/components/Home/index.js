import React, { Component } from "react";
import PropTypes from "prop-types";
import * as assignmentAction from "../../actions/assignmentActions";
import * as classAction from "../../actions/classActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Header from "../common/Header";
import EnhancedTable from "../common/EnhancedTable";
import AssignmentModal from "../common/AssignmentModal";
import { withStyles } from "@material-ui/core/styles";
import styles from "./style";

const mapStateToProps = state => {
  const { assignments, total } = state.assignment;
  const { schedule } = state.sched;
  const classList = schedule.map(c => ({
    value: c._id,
    label: c.name
  }));
  classList.unshift({ value: 0, label: "All" });
  return {
    classAssignments: { assignments, total },
    classList
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...assignmentAction, ...classAction }, dispatch)
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
    classAssignments: PropTypes.object.isRequired,
    classList: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      selectedClass: 0,
      modalOpen: false,
      modalMode: ""
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
        await actions.loadClasses();
      } catch (err) {
        console.error(err);
      }
      this.setState({ loading: false });
    }
  };

  handleSelect = e => {
    this.setState({ selectedClass: e.target.value });
  };

  toggleModal = () => {
    const { modalOpen } = this.state;
    this.setState({ modalOpen: !modalOpen });
  };

  render() {
    const {
      classes,
      classAssignments: {
        assignments,
        total
      },
      classList
    } = this.props;
    const { selectedClass, modalOpen, modalMode } = this.state;

    const filteredData = selectedClass === 0 ? assignments : assignments.filter(a => a.class_id === selectedClass);
    const numRows = selectedClass === 0 ? total : filteredData.length;

    return (
      <>
        <Header />
        {modalOpen &&
          <AssignmentModal
            mode={modalMode}
            closeHandler={this.toggleModal}
            classList={classList}
          />
        }
        <div className={classes.root}>
          <p className={classes.title}>Welcome!</p>
          <p className={classes.text}>please use this platform to keep track of your assignments at Stanford University :)</p>
          {classList.length > 1 &&
            <FormControl variant="filled" className={classes.selectForm}>
              <InputLabel style={{ color: "#FFF" }}>Class</InputLabel>
              <Select
                disableUnderline
                value={selectedClass}
                onChange={this.handleSelect}
                IconComponent={ExpandMoreIcon}
                style={{ color: "#FFF" }}
                inputProps={{
                  classes: {
                    icon: classes.selectIcon
                  }
                }}
              >
                {classList.map(c => {
                  return <MenuItem key={c.value} value={c.value}>{c.label}</MenuItem>
                })}
              </Select>
            </FormControl>
          }
          {total && <EnhancedTable columnData={columnData} data={filteredData} rows={numRows} />}
          <Fab 
            className={classes.fab}
            onClick={() => this.setState({ modalOpen: true, modalMode: "create" })}
          >
            <AddIcon />
          </Fab>
        </div>
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home));
