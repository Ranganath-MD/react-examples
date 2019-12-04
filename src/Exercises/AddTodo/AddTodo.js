import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles} from '@material-ui/core/styles';
import {Grid, Typography, Button, Input} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import TodoList from './TodoList'

const styles = theme => ({
    input : {
        marginTop : 50,
    },
    title : {
        fontSize : 50,
        fontWeight : 700,
        fontFamily : "monospace",
        textAlign : "center",

    },
    button: {
        marginTop : 50,
        fontFamily : "monospace",
        fontSize : 18
    },
})
class AddTodo extends Component {
    state = {
        todo : "",
        todos : []
    }

    handleChange = (e) => {
        e.persist()
        this.setState(() => ({
            [e.target.name] : e.target.value
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            id : new Date(),
            todo : this.state.todo
        }
        this.state.todos.push(formData)
        this.setState({ todo : ""})
    }
    render() {
        const { classes } = this.props
        return (
            <div>
                <Grid container spacing={3}>
                    <Grid item xs={1}>
                    </Grid>
                    <Grid item xs={12} sm={8} md={4} lg={4}>
                        <Typography className={classes.title}>Add Todo </Typography>
                        <form onSubmit={this.handleSubmit}>
                            <Input
                                fullWidth={true}
                                required
                                placeholder = "Add your todo here"
                                name="todo"
                                onChange={this.handleChange}
                                value={this.state.todo}
                                className={classes.input}
                                inputProps={{
                                    'aria-label': 'description',
                                }}
                                />
                            <br/>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth={true}
                                size="medium"
                                className={classes.button}
                                startIcon={<SaveIcon />}
                            >
                                Save
                            </Button>
                        </form>
                    </Grid>
                    <Grid item xs={4}>
                        <TodoList todos = {this.state.todos} />
                    </Grid>
                    <Grid item xs={3}>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

AddTodo.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddTodo)