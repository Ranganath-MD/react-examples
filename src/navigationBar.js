import React from 'react';
import clsx from 'clsx';
import {Drawer, CssBaseline, AppBar, Toolbar, List, Typography,
        Divider, IconButton, ListItem, Grid } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {Close} from '@material-ui/icons';
import PropTypes from 'prop-types';
import { withStyles, withTheme} from '@material-ui/core/styles';
import logo from "./logo.svg"
import { Link, Route, Switch } from "react-router-dom"
import { routes } from "./routes-config"

// import DropeeDown from "./Exercises/DropeeDown/DropeeDown"
// import Home from "./Home/Home"
// import DataOnCheck from "./Exercises/DataOnCheck/DataOnCheck"
// import Radiofy from "./Exercises/Radiofy/Radiofy"
// import AddTodo from "./Exercises/AddTodo/AddTodo"
// import EmojiList from "./Exercises/SearchEmoji/emojiList"
// import Form from "./Exercises/Form/Form"

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
      backgroundColor : "black",
      transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    backgroundColor : "black",
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  closeIcon : {
    color : "white"
  },
  content: {
    flexGrow: 1,
    marginTop : 60,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 5,
  },

  heading : {
    fontSize : 20,
    fontFamily : "monospace"
  },
});

class Navigation extends React.Component{
  constructor() {
    super()
    this.state = {
        open : false,
    }
  }


  handleDrawerOpen = () => {
    this.setState({ open : true})
  };

  handleDrawerClose = () => {
    this.setState({ open : false})
  };
  render(){
    const { classes } = this.props
    // const theme = useTheme();
    return (
      <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: this.state.open,
        })}
        >
        <Toolbar>
          <Grid container direction="row" justify="space-between" alignItems="center">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, this.state.open && classes.hide)}
              >
              <MenuIcon />
            </IconButton>

              <Typography className={classes.heading}>
                <Link to="/" className="title">React Exercise</Link>
              </Typography>
              <img src={logo} width="30px" alt="logo" />
            </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={this.state.open}
        classes={{
          paper: classes.drawerPaper,
        }}
        >
        <div className={classes.drawerHeader}>
          <IconButton onClick={this.handleDrawerClose} className={classes.closeIcon}>
            <Close />
          </IconButton>
        </div>
        <Divider />
        <List className={classes.listitems}>
        <Link to="/dropee-down" className="menulink"><ListItem key={1} button>  Dropee Down</ListItem></Link>
        <Link to="/get-data-on-check" className="menulink"><ListItem key={2} button>Get data on Check</ListItem></Link>
        <Link to="/get-data-on-radio-check" className="menulink"><ListItem key={3} button>Radiofy</ListItem></Link>
        <Link to="/add-todo" className="menulink"><ListItem key={4} button>Add Todos</ListItem></Link>
        <Link to="/emoji-list" className="menulink"><ListItem key={5} button>Search an Emoji</ListItem></Link>
        <Link to="/form-submission" className="menulink"><ListItem key={6} button>Form submission</ListItem></Link>
        <Link to="/select-checkbox" className="menulink"><ListItem key={7} button>Select All Checkboxes</ListItem></Link>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: this.state.open,
        })}
      >
      <Switch>
        {
          routes.map((route, index) => (
            <Route key={index} path={route.path} component={route.component} exact={route.exact}/>
          ))
        }
      </Switch>
      </main>
    </div>
  );
}
}
Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

const NavigationBar = withStyles(styles)(Navigation)

export default withTheme(NavigationBar);