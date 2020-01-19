import React, { Component } from "react";
import Checkbox from "./checkbox";
import PropTypes from 'prop-types';
import { withStyles} from '@material-ui/core/styles';
import {Grid, Button, Fab} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import CloseSharpIcon from '@material-ui/icons/CloseSharp';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    btn : {
        margin: 10,
        right: 0
    },
});

const technos = ["HTML", "CSS", "Javascript", "ReactJs", "NodeJs", "MongoDB", "ExpressJs", "React Native", "Material UI"];

class SelectAll extends Component {

    // convert an array to object for getting unique key
    // check out below url
    // https://dev.to/afewminutesofcode/how-to-convert-an-array-into-an-object-in-javascript-25a4
  state = {
    checkboxes: technos.reduce((options, option) => ({
        ...options,
        [option]: false
      }),
      {}
    ),
    save: false
  };

  selectAllCheckboxes = isSelected => {
      this.setState({ save : false })
    Object.keys(this.state.checkboxes).forEach(checkbox => {
      // BONUS: Can you explain why we pass updater function to setState instead of an object?
      this.setState(prevState => ({
        checkboxes: {
          ...prevState.checkboxes,
          [checkbox]: isSelected
        }
      }));
    });
  };

  selectAll = () => this.selectAllCheckboxes(true);

  deselectAll = () => this.selectAllCheckboxes(false);

  handleCheckboxChange = e => {
    const { name } = e.target;

    this.setState(prevState => ({
      checkboxes: {
        ...prevState.checkboxes,
        [name]: !prevState.checkboxes[name]
      }
    }));
  };

  handleFormSubmit = event => {
    event.preventDefault();
    var selected = Object.keys(this.state.checkboxes)
      .filter(checkbox => this.state.checkboxes[checkbox])
    this.setState({ save: true })
  };

  createCheckboxes = () => technos.map(option => {
      return (
        <Checkbox
            label={option}
            isSelected={this.state.checkboxes[option]}
            onCheckboxChange={this.handleCheckboxChange}
            key={option}
            selected={this.state.selected}
            save={this.state.save}
        />
      )
  });

  render() {
      const { classes } = this.props
    return (
        <div className={classes.root}>
        <Grid container spacing={3}>
            <Grid item xs></Grid>
            <Grid item xs={12} sm={8} md={6} lg={4}>
                <h2>
                    CheckBox Exercise
                </h2>
                <form onSubmit={this.handleFormSubmit}>
                    <Fab
                        color="primary"
                        size="small"
                        onClick={this.selectAll}
                        className={classes.btn}
                    >
                        <CheckIcon />
                    </Fab>
                    <Fab
                        color="secondary"
                        size="small"
                        onClick={this.deselectAll}
                        className={classes.btn}
                    >
                        <CloseSharpIcon />
                    </Fab>

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="small"
                        className={classes.btn}
                        >
                        Save
                    </Button>
                    {this.createCheckboxes()}
                </form>
            </Grid>
            <Grid item xs></Grid>
        </Grid>
        </div>
    );
  }
}

SelectAll.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(SelectAll)