import React, { Component } from 'react'
import axios from "axios"
import Select from 'react-select';
import PropTypes from 'prop-types';
import { withStyles} from '@material-ui/core/styles';
import {Grid, Paper, Typography, List, ListItem, Radio, RadioGroup, FormControlLabel} from '@material-ui/core';

const styles = {
    paperpost : {
        fontSize : 16,
        fontFamily : "monospace"
    },
    info : {
        fontSize: 18,
        fontWeight : 300
    }
}

class Radiofy extends Component {
    state = {
        users : [],
        todos : [],
        filteredTodoList : [],
        selectedOption : null,
        value : "",
        show : false
    }

    componentDidMount(){
        axios.get("http://jsonplaceholder.typicode.com/users")
        .then(response => this.setState({ users : response.data}))
        .catch(err => console.log(err))
    }

    handleChange = selectedOption => {
        this.setState({ selectedOption, show: true, value : "all" });
        const id = selectedOption.id
        axios.get(`https://jsonplaceholder.typicode.com/todos?userId=${id}`)
        .then(response => this.setState({ todos : response.data, filteredTodoList : response.data }))
        .catch(err => console.log(err))
    }

    handleTodos = (e) => {
        this.setState({ value : e.target.value})
        const value = e.target.value
        if(value === "active") {
            this.setState({ filteredTodoList : this.state.todos.filter(todo => todo.completed === true)})
        }
        else if (value === "inactive") {
            this.setState({ filteredTodoList : this.state.todos.filter(todo => todo.completed === false)})
        }else if(value === "all") {
            this.setState({ filteredTodoList : this.state.todos })
        }
    }

    render() {
        const {classes} = this.props
        const userOptions = this.state.users.map(user => {
            return {
                value : user.name,
                label : user.name,
                id : user.id
            }
        })
        return (
            <div>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={8} md={4} lg={4}>
                        <Typography className={classes.info}>Select the User from the dropdown, You will get users Todo list based on the Status</Typography>
                        <Typography className={classes.info}>All : All the Todos for the particular user</Typography>
                        <Typography className={classes.info}>Active  : list of active todos in green color</Typography>
                        <Typography className={classes.info}>Inactive : list of inactive todos in red color </Typography>
                    </Grid>
                    <Grid item xs={12} sm={8} md={4} lg={4}>
                        <Select
                            area-label="Users"
                            value={this.state.selectedOption}
                            onChange={this.handleChange}
                            options={userOptions}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8} md={4} lg={4}>
                       {this.state.show ? <div>
                                <Typography>Number of {this.state.value} todos {this.state.filteredTodoList.length}</Typography>
                                <RadioGroup
                                    aria-label="position"
                                    name="position"
                                    value={this.state.value}
                                    onChange={this.handleTodos}
                                    row
                                    >
                                    <FormControlLabel
                                        value="all"
                                        control={<Radio color="primary" />}
                                        label="All"
                                        labelPlacement="end"
                                        />
                                    <FormControlLabel
                                        value="active"
                                        control={<Radio color="primary" />}
                                        label="Active"
                                        labelPlacement="end"
                                        />
                                    <FormControlLabel
                                        value="inactive"
                                        control={<Radio color="primary" />}
                                        label="In Active"
                                        labelPlacement="end"
                                        />
                                </RadioGroup>
                                <Paper className={classes.paperpost} >
                                    {
                                        this.state.filteredTodoList.map(todo => {
                                            return (
                                                <React.Fragment key={todo.id}>
                                                    <List className={classes.list}>
                                                        {
                                                            todo.completed ?
                                                            <ListItem style={{ color : "green" }}>{todo.title}</ListItem> :
                                                            <ListItem style={{ color : "red" }}>{todo.title}</ListItem>
                                                        }

                                                    </List>
                                                </React.Fragment>
                                            )
                                        })
                                    }
                                </Paper>
                            </div> : null }
                    </Grid>
                </Grid>
            </div>
        )
    }
}

Radiofy.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(Radiofy)