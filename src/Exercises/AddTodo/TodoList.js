import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles} from '@material-ui/core/styles';
import {List, ListItem} from '@material-ui/core';

const styles = theme => ({
    name : {
        fontSize : 18,
        fontFamily : "monospace",
        fontWeight: "bold",
        color : "#42046B",
        textAlign : "center"
    },
    head : {
        fontFamily : "monospace",
        fontSize : 20,
        fontWeight : "bold",
        textAlign : "center"
    },
    emptyText : {
        fontSize : 18,
        fontFamily : "monospace",
        fontWeight : 600,
        color : "gray",
    }
})

class TodoList extends Component {
    render() {
        const { todos, classes } = this.props
        return (
            <div className={classes.head}>
                {
                    todos.length === 0 ? <span className={classes.emptyText}>No todo list yet, Add todos</span> :
                    todos.map(todo => {
                            return (
                                <List key={todo.todo}>
                                    <ListItem>{todo.todo}</ListItem>
                                </List>
                            )
                    })
                }
            </div>
        )
    }
}

TodoList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TodoList)