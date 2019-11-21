import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles} from '@material-ui/core/styles';
import {Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, Checkbox, List, ListItem} from '@material-ui/core';
import axios from "axios"
import { textAlign } from '@material-ui/system';
const styles = {
    root: {
        flexGrow: 1,
    },
    paper : {
        width: '80%',
        overflowX: 'auto',
    },
    row : {
        height : 10,
        padding:"1px"
    },
    list : {
        padding : 1
    },
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
    }
}
class DataOnCheck extends Component {
    constructor(){
        super()
        this.state = {
            users : [],
            posts : []
        }
    }

    handleCheck = (selectedUser) => {
        selectedUser.isChecked = !selectedUser.isChecked
        selectedUser.isChecked ?
            axios.get(`http://jsonplaceholder.typicode.com/posts?userId=${selectedUser.id}`)
            .then(response => this.setState(prevState => ({
                posts : response.data.concat(prevState.posts)
            })))
            .catch(err => console.log(err))
        :
        this.setState(prevState => ({
            posts : prevState.posts.filter(post => post.userId !== selectedUser.id)
        }))
    }
    componentDidMount(){
        axios.get("http://jsonplaceholder.typicode.com/users")
        .then(response => this.setState({users : response.data}))
        .catch(err => console.log(err))
    }
    render() {
        const { classes } = this.props
        return (
            <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs>

              </Grid>
              <Grid item xs>
                <Paper className={classes.paper} >
                    <Table aria-label="simple table">
                        <TableHead >
                            <TableRow>
                                <TableCell className={classes.head}>Action</TableCell>
                                <TableCell align="left" className={classes.head}>Users</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                                {
                                    this.state.users.map(user => {
                                        return (
                                            <TableRow key={user.id}>
                                                <TableCell component="th" scope="row" className={classes.row}>
                                                <Checkbox
                                                    // checked={state.checkedA}
                                                    onChange={() => this.handleCheck(user)}
                                                    value="checked"
                                                    color="primary"
                                                    inputProps={{
                                                    'aria-label': 'secondary checkbox',
                                                    }}
                                                />
                                                </TableCell>
                                                <TableCell align="left" className={classes.name}>{user.name}</TableCell>
                                            </TableRow>
                                        )
                                    })
                                }


                        </TableBody>
                    </Table>
                </Paper>
              </Grid>
              <Grid item xs>
                <Paper className={classes.paper} >
                    {
                        this.state.posts.map(post => {
                            return (
                                <React.Fragment key={post.id}>
                                    <List className={classes.list}>
                                        <ListItem>{post.title}</ListItem>
                                    </List>
                                </React.Fragment>
                            )
                        })
                    }
                </Paper>
              </Grid>
            </Grid>
          </div>
        )
    }
}

DataOnCheck.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles)(DataOnCheck)