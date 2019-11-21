import React from 'react';
import Card from '@material-ui/core/Card';
import PropTypes from 'prop-types';
import { withStyles} from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import {CardContent} from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
// import { Container } from './styles';
import avatar from "../resources/images/avatarImage.jpg"


const styles = ({
    card: {
      maxWidth: 345,
      textAlign : "center"
    },
    media: {
      height: 140,
    },
    name : {
        fontSize : 25,
        fontWeight : "bold",
        textAlign : "center",
        fontFamily : "monospace"
    }
});

class DataCard extends React.Component {
    render(){
        const { classes } = this.props
        return (
            <div>
                {
                    this.props.showCard ?
                    <Card className={classes.card}>
                        <CardActionArea>
                            <CardMedia
                            className={classes.media}
                            image={avatar}
                            />
                            <CardContent>
                            <Typography className={classes.name}>
                                {this.props.name}
                            </Typography>
                            <Typography>Post</Typography>
                            <Typography variant="body2" color="textSecondary" component="h4">
                                {this.props.post}
                            </Typography>
                            <br/>
                            <Typography>Comment</Typography>
                            <Typography variant="body2" color="textSecondary" component="h4">
                            {this.props.comment}
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>  : null
                }
            </div>
        );
    }
}

DataCard.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(DataCard)