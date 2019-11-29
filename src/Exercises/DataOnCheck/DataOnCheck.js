import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles} from '@material-ui/core/styles';
import {Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, Checkbox, List, ListItem, Typography} from '@material-ui/core';
import axios from "axios"
const styles = {
    root: {
        flexGrow: 1,
    },
    paper : {
        width: '100%',
        // overflowX: 'auto',
    },
    row : {
        height : 10,
        padding:0
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
    quest : {
        fontSize: 20,
        fontWeight : 600
    },
    ans : {
        fontSize: 18,
        fontWeight : 300
    },
    count : {
        textAlign : "center",
        fontSize: 20,
        fontFamily:"monospace",
        fontWeight : 500
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
                <Grid item xs={12} sm={8} md={4} lg={4}>
                    <Typography className={classes.quest}>What is the problem Statement?</Typography>
                    <Typography className={classes.ans}>Once you check the user, you should get the posts of particular user and if you uncheck, the posts from the particular user gets removed</Typography>
              </Grid>
              <Grid item xs={12} sm={8} md={4} lg={4}>
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
              <Grid item xs={12} sm={8} md={4} lg={4}>
                <Typography className={classes.count}>Number of posts - {this.state.posts.length}</Typography>
                <Paper className={classes.paperpost} >

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