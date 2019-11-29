import React, { Component } from 'react'
import emojis from "./emoji.json"
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Grid, List, ListItem, InputBase,Divider} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
    emojilist : {
    },
    symbol : {
        fontSize : 30,
        marginRight : 20
    },
    title : {
        fontSize : 20,
        fontWeight : 600,
        fontFamily : "monospace"
    },
    appBar : {
        marginTop : 65,
        backgroundColor : "white",
        marginBottom : 50
    },
    search: {
        position: 'relative',
        borderRadius: 20,
        backgroundColor: "yellow",
        '&:hover': {
          backgroundColor: "white",
        },
        marginLeft: 0,
        width: '100%',
    },
    searchIcon: {
        width: theme.spacing(8),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputInput: {
    padding: theme.spacing(2, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
        width: 200,
    },
}
})


class EmojiList extends Component {
    state = {
        value : "",
        emojiList : []
    }

    handleSearch = (e) => {
        const value = e.target.value
        this.setState({ value })
        const emojiList = emojis.filter(emoji => {
            const value_lower = emoji.title.toLowerCase()
            return value_lower.indexOf(value) !== -1;
        })
        this.setState({ emojiList })
    }

    componentDidMount(){
        this.setState({ emojiList : emojis })
    }

    render() {
        const { classes } = this.props
        return (
            <Grid container spacing={3}>
                <Grid item xs>
                </Grid>
                <Grid item xs={12} sm={8} md={4} lg={4}>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            value={this.state.value}
                            onChange={this.handleSearch}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    <br/>
                    <List className={classes.emojilist}>
                        {
                           this.state.emojiList.map(emoji => {
                                return (
                                    <React.Fragment  key={emoji.title}>
                                        <ListItem  >
                                            <span  className={classes.symbol}>{emoji.symbol}</span><span className={classes.title}>{emoji.title}</span>
                                        </ListItem>
                                        <Divider />
                                    </React.Fragment>
                                )
                            })
                        }
                    </List>
                </Grid>
                <Grid item xs>
                </Grid>
            </Grid>
        )
    }
}

EmojiList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EmojiList)