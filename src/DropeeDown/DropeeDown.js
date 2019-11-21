import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles} from '@material-ui/core/styles';
import {Grid, Button, Typography, List, ListItem, Link} from '@material-ui/core';
import Select from 'react-select';
import axios from "axios"
import { Modal } from 'react-bootstrap'
import DataCard from "./dataCard"

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    button: {
        margin: theme.spacing(4),
        marginLeft : "30%"
    },
  });



class DropeeDown extends Component {
    state = {
        selectedOption: null,
        selectedPost : null,
        selectedComment : null,
        users : [],
        posts : [],
        comments : [],
        showPost : false,
        showComments : false,
        msg: "",
        showCard : false,
        show : false,
        data : {},
        name : "",
        post : "",
        comment : ""
      };

    handleClose = () => this.setState({ show : false });
    handleShow = () => this.setState({ show : true })

    componentDidMount(){
        axios.get("http://jsonplaceholder.typicode.com/users")
        .then(response => this.setState({ users : response.data, showPost : true }))
        .catch(err => console.log(err))
    }

    handlePostChange = selectedPost => {
        this.setState({ selectedPost, post : selectedPost.value })
        const id = selectedPost.id
        axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
        .then(response => this.setState({ comments : response.data, showComments : true}))
        .catch(err => console.log(err))
    }

    handleCommentChange = selectedComment => {
        this.setState({ selectedComment, comment: selectedComment.value })
    }

    handleChange = selectedOption => {
        this.setState({ selectedOption, name: selectedOption.value});
        const id = selectedOption.id
        axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
        .then(response => this.setState({ posts : response.data }))
        .catch(err => console.log(err))
    };



    handleSubmit = () => {
        const { selectedComment, selectedOption, selectedPost } = this.state
        if(selectedComment==null && selectedOption==null && selectedPost==null){
            this.setState({ msg : "Please select an item from dropdown", show : true })
        }else if(selectedComment==null || selectedOption==null || selectedPost==null){
            this.setState({ msg : "Required : Select items from all fields", show : true})
        }else {
            const data = {
                user : this.state.selectedOption,
                post : this.state.selectedPost,
                comment : this.state.selectedComment
            }
            this.setState({ data, showCard : true })
        }
    }

    render() {
        const userOptions = this.state.users.map(user => {
            return {
                value : user.name,
                label : user.name,
                id : user.id
            }
        })

        const postOptions = this.state.posts.map(post => {
            return {
                value : post.title,
                label : post.title,
                id : post.id
            }
        })
        const commentOptions = this.state.comments.map(comment => {
            return {
                value : comment.body,
                label : comment.body,
                id : comment.id
            }
        })

        const { selectedOption, selectedPost, selectedComment, name, post, comment, showCard} = this.state;
        const { classes } = this.props
        return (
            <div className={classes.root}>
                <Modal
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={this.state.show}
                    onHide={this.handleClose}
                >
                    <Modal.Header closeButton>
                    </Modal.Header>
                        <Modal.Body>{this.state.msg}</Modal.Body>
                    <Modal.Footer>
                    <Button onClick={this.handleClose}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
                <Grid container spacing={3}>
                    <Grid item xs>
                        <List className="info-list">
                            <ListItem>
                                <Typography>Get the users name in users dropdown using<br/>
                                <Link href="http://jsonplaceholder.typicode.com/users" target="_blank">
                                    http://jsonplaceholder.typicode.com/users
                                </Link></Typography>
                            </ListItem>
                            <ListItem>
                                <Typography>
                                Get the posts based on particular user name in post dropdown using<br/>
                                <Link href="http://jsonplaceholder.typicode.com/posts" target="_blank">
                                    http://jsonplaceholder.typicode.com/posts
                                </Link></Typography>
                            </ListItem>
                            <ListItem>
                                <Typography>
                                Get the comments for particular post in comment dropdown using<br/>
                                <Link href="http://jsonplaceholder.typicode.com/comments" target="_blank">
                                    http://jsonplaceholder.typicode.com/comments
                                </Link></Typography>
                            </ListItem>
                            <ListItem><Typography>Then print all the data from the dropdown in card layout</Typography></ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={12} sm={8} md={4} lg={4} >
                        <Typography>USERS:</Typography>
                        <Select
                            area-label="Users"
                            value={selectedOption}
                            onChange={this.handleChange}
                            options={userOptions}
                            />
                        <br/>
                        <Typography>POSTS:</Typography>
                        <Select
                            value={selectedPost}
                            onChange={this.handlePostChange}
                            options={postOptions}
                            />
                        <br/>
                        <Typography>COMMENTS:</Typography>
                        <Select
                            value={selectedComment}
                            onChange={this.handleCommentChange}
                            options={commentOptions}
                        />
                        <Button
                            variant="contained"
                            onClick={this.handleSubmit}
                            color="primary"
                            size="medium"
                            className={classes.button}
                        >
                            Submit
                        </Button>
                        <div>
                        </div>
                    </Grid>
                    <Grid item xs>
                        <DataCard
                            name={name} post={post} comment={comment} showCard={showCard}/>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

DropeeDown.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles)(DropeeDown)