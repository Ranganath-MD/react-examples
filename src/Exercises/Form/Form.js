import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles} from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import ReactJson from 'react-json-view'
import {Grid, Typography, Button, Paper, TextField, Avatar} from '@material-ui/core';

const styles = theme => ({
    paper: {
        marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(4),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: "yellow",
        color : "black"
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    json : {
        marginTop: theme.spacing(4),
        backgroundColor : "black"
    }
})

class Form extends Component {
    constructor(){
        super()
        this.state = {
            name : "",
            email : "",
            password : "",
            formData : {}
        }
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
            name : this.state.name,
            email : this.state.email,
            password : this.state.password
        }
        this.setState({ formData, name : "", email : "", password : "" })

    }
    render() {
        const { classes } = this.props
        return (
            <div>
                <Grid container spacing={3}>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={12} sm={8} md={4} lg={4}>
                        <Paper className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign up
                            </Typography>
                            <form onSubmit={this.handleSubmit}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="name"
                                    onChange={this.handleChange}
                                    value={this.state.name}
                                    label="Username"
                                    name="name"
                                    autoComplete="name"
                                    autoFocus
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    onChange={this.handleChange}
                                    value={this.state.email}
                                    id="email"
                                    type="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    type="password"
                                    required
                                    fullWidth
                                    onChange={this.handleChange}
                                    value={this.state.password}
                                    id="password"
                                    label="Password"
                                    name="password"
                                    autoComplete="password"
                                />
                                 <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Submit
                                </Button>
                            </form>
                        </Paper>
                    </Grid>
                    <Grid item xs>
                        <Paper className={classes.json}>
                            <ReactJson
                                src={this.state.formData}
                                theme="monokai"
                                name="user"
                                style={{ fontSize : 20, fontFamily : "monospace"}}
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}


Form.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Form)