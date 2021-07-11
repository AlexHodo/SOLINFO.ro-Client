import React, { useContext, useState } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircleTwoToneIcon from "@material-ui/icons/AccountCircleTwoTone";
import NotificationsNoneTwoToneIcon from "@material-ui/icons/NotificationsNoneTwoTone";
import HomeTwoToneIcon from "@material-ui/icons/HomeTwoTone";
import { Link } from "react-router-dom";
import { RootContext } from "./../contexts/Context";
import SettingsTwoToneIcon from "@material-ui/icons/SettingsTwoTone";
import ExitToAppTwoToneIcon from "@material-ui/icons/ExitToAppTwoTone";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Button from "@material-ui/core/Button";
import AddCircleTwoToneIcon from "@material-ui/icons/AddCircleTwoTone";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import CircularProgress from "@material-ui/core/CircularProgress";
import CookieNotification from "./CookieNotification";
import DnsTwoToneIcon from '@material-ui/icons/DnsTwoTone';
import ThumbUpTwoToneIcon from '@material-ui/icons/ThumbUpTwoTone';

const useStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar,
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    color: theme.palette.common.white,
    textDecoration: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  titleContrasted: {},
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(2),
    width: "auto",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      marginLeft: theme.spacing(1),
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "white !important",
    width: `calc(100% - 1em - ${theme.spacing(4)}px)`,
    padding: theme.spacing(1, 0, 0.5, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "25ch",
      "&:hover": {
        boxShadow: theme.shadows[1],
      },
      "&:focus": {
        boxShadow: theme.shadows[3],
      },
    },
    "& *": {
      color: "white",
    },
  },
  inputRootRoot: {
    paddingRight: `${theme.spacing(1)}px !important`,
  },
  sectionDesktop: {
    display: "flex",
  },
  menu: {
    backgroundColor: fade(theme.palette.common.black, 0.9),
    backdropFilter: "saturate(15) blur(15px)",
  },
  menuItemIcon: {
    marginRight: theme.spacing(2),
    color: theme.palette.primary.dark,
  },
  menuItemText: {
    color: theme.palette.primary.dark,
  },
  menuRightSide: {
    minWidth: "90px",
  },
  addSolutionBtn: {
    marginRight: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  searchEndAdornment: {
    display: "none !important",
  },
  notificationsPaper: {
    width: "250px !important",
  },
  notificationsList: {},
  notificationText: {
    fontSize: "1rem",
    lineHeight: "1.1rem",
    color: theme.palette.secondary.main,
  },
  notificationDate: {
    fontSize: "0.8rem",
    marginTop: theme.spacing(0.5),
    textAlign: "left",
  },
  hiddenOnMobile: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  hideOnDesktop: {
    [theme.breakpoints.up("md")]: {
      display: "none",
    }
  },
  menuItem: {
    color: fade(theme.palette.common.white, 0.9)
  },
  logoWrapper: {
    width: "45px",
    height: "45px",
    backgroundSize: "contain",
  }
}));

const defaultFilterOptions = createFilterOptions();

const OPTIONS_LIMIT = 25;

const filterOptions = (options, state) => {
  if (state.inputValue === "") {
    return [];
  }
  return defaultFilterOptions(options, state).slice(0, OPTIONS_LIMIT);
};

export default function Navbar() {
  const { rootState, logout, API, getProblems } = useContext(RootContext);

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [anchorElNotifications, setAnchorElNotifications] =
    React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const isNotificationsOpen = Boolean(anchorElNotifications);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationsMenuOpen = (event) => {
    setAnchorElNotifications(event.currentTarget);
    setNotificationsCount(0);
  };

  const handleNotificationsClose = () => {
    setAnchorElNotifications(null);
  };

  const menuId = "primary-menu";
  const notificationsId = "notifications-menu";

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id={menuId}
      keepMounted
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      transformOrigin={{ vertical: "top", horizontal: "center" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      disableScrollLock={true}
    >
      {rootState.authStatusChecked && rootState.isLoggedIn ? (
        <>
          <Link to="/cont">
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <AccountCircleTwoToneIcon className={classes.menuItemIcon} />
              </ListItemIcon>
              <Typography variant="inherit" className={classes.menuItemText}>
                @{rootState.userInfo.username}
              </Typography>
            </MenuItem>
          </Link>
          <Link to="/cont/setari">
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <SettingsTwoToneIcon className={classes.menuItemIcon} />
              </ListItemIcon>
              <Typography variant="inherit" className={classes.menuItemText}>
                Setări
              </Typography>
            </MenuItem>
          </Link>
          <Link to="/solutie-noua">
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <AddCircleTwoToneIcon className={classes.menuItemIcon} />
              </ListItemIcon>
              <Typography variant="inherit" className={classes.menuItemText}>
                Adaugă o soluție
              </Typography>
            </MenuItem>
          </Link>
          <Link to="/probleme" className={classes.hideOnDesktop}>
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <DnsTwoToneIcon className={classes.menuItemIcon} />
              </ListItemIcon>
              <Typography variant="inherit" className={classes.menuItemText}>
                Probleme
              </Typography>
            </MenuItem>
          </Link>
          <Link to="/provocare-saptamanala" className={classes.hideOnDesktop}>
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <ThumbUpTwoToneIcon className={classes.menuItemIcon} />
              </ListItemIcon>
              <Typography variant="inherit" className={classes.menuItemText}>
                Provocarea săptămânală
              </Typography>
            </MenuItem>
          </Link>
          <Link to="/">
            <MenuItem onClick={logout}>
              <ListItemIcon>
                <ExitToAppTwoToneIcon className={classes.menuItemIcon} />
              </ListItemIcon>
              <Typography variant="inherit" className={classes.menuItemText}>
                Părăsește contul
              </Typography>
            </MenuItem>
          </Link>
        </>
      ) : (
        <>
          <Link to="/cont">
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <AccountCircleTwoToneIcon className={classes.menuItemIcon} />
              </ListItemIcon>
              <Typography variant="inherit" className={classes.menuItemText}>
                Contul meu
              </Typography>
            </MenuItem>
          </Link>
          <Link to="/solutie-noua">
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <AddCircleTwoToneIcon className={classes.menuItemIcon} />
              </ListItemIcon>
              <Typography variant="inherit" className={classes.menuItemText}>
                Adaugă o soluție
              </Typography>
            </MenuItem>
          </Link>
          <Link to="/probleme" className={classes.hideOnDesktop}>
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <DnsTwoToneIcon className={classes.menuItemIcon} />
              </ListItemIcon>
              <Typography variant="inherit" className={classes.menuItemText}>
                Probleme
              </Typography>
            </MenuItem>
          </Link>
          <Link to="/provocare-saptamanala" className={classes.hideOnDesktop}>
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <ThumbUpTwoToneIcon className={classes.menuItemIcon} />
              </ListItemIcon>
              <Typography variant="inherit" className={classes.menuItemText}>
                Provocarea săptămânală
              </Typography>
            </MenuItem>
          </Link>
        </>
      )}
    </Menu>
  );

  let history = useHistory();

  const [searchInputValue, setSearchInputValue] = useState("");

  // NOTIFICATIONS
  const [notifications, setNotifications] = useState({
    count: 0,
    data: [],
    is_loading_data: false,
  });

  const [notificationsCount, setNotificationsCount] = useState(0);
  const [notificationsData, setNotificationsData] = useState([]);
  const [notificationsDataLoading, setNotificationsDataLoading] =
    useState(false);

  const getData = async (event) => {
    setNotificationsDataLoading(true);

    const request = await API("/endpoint/module/notifications.php", {
      action: "get",
    });

    if (request.success) {
      setNotificationsData(request.data);
    }

    setNotificationsDataLoading(false);
  };

  // NOTIFICATIONS DATA
  const getCount = async (event) => {
    const request = await API("/endpoint/module/notifications.php", {
      action: "count",
    });

    if (request.success) {
      setNotificationsCount(request.data.count);
    }
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      getCount();
    }, 30000); // every 30 seconds

    return () => {
      clearInterval(interval);
    };
  }, []);

  const renderNotificationsMenu = (
    <Menu
      anchorEl={anchorElNotifications}
      id={notificationsId}
      keepMounted
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      transformOrigin={{ vertical: "top", horizontal: "center" }}
      style={{ top: "50px" }}
      classes={{
        list: classes.notificationsList,
        paper: classes.notificationsPaper,
      }}
      open={isNotificationsOpen}
      onClose={handleNotificationsClose}
      onEntering={getData}
      disableScrollLock={true}
    >
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography
            style={{ marginTop: ".5rem" }}
            variant="h6"
            component="p"
            align="center"
          >
            Notificări
          </Typography>
        </Grid>

        <Grid item xs={12}>
          {notificationsDataLoading && (
            <Typography align="center" variant="body2">
              Se încarcă...
            </Typography>
          )}
          {!notificationsDataLoading &&
            (notificationsData == null || notificationsData.length === 0) && (
              <Typography align="center" variant="body2">
                Nicio notificare nouă.
              </Typography>
            )}
          {!notificationsDataLoading && notificationsData && (
            <>
              {notificationsData.map(function (item, index) {
                return (
                  <Link to={item.link} onClick={handleNotificationsClose}>
                    <ListItem button>
                      <ListItemText
                        primary={item.content}
                        secondary={item.date}
                        classes={{
                          primary: classes.notificationText,
                          secondary: classes.notificationDate,
                        }}
                      />
                    </ListItem>
                  </Link>
                );
              })}
            </>
          )}
        </Grid>
      </Grid>
    </Menu>
  );

  return (
    <>
    <div className={classes.grow}>
      <AppBar position="fixed" className={classes.menu}>
        <Toolbar>
          <Link to="/">
            <div 
              className={classes.logoWrapper}
              style={{backgroundImage: `url(${rootState.fileDomain}/client/logo.svg)`}}
            />
            <div style={{display: "none"}}>
              <h1>SOLINFO.ro</h1>
            </div>
          </Link>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <Autocomplete
              filterOptions={filterOptions}
              options={rootState.problems}
              getOptionLabel={(option) =>
                option.name + " (ID " + option.id + ")"
              }
              classes={{ endAdornment: classes.searchEndAdornment }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  placeholder="Nume sau ID problemă..."
                  classes={{
                    root: classes.inputRoot,
                  }}
                  InputProps={{
                    ...params.InputProps,
                    disableUnderline: true,
                    classes: { root: classes.inputRootRoot },
                  }}
                />
              )}
              onChange={(event: any, option: any) => {
                setSearchInputValue("");
                if (option && option.name) {
                  history.push(`/problema/${option.name}`);
                }
              }}
              inputValue={searchInputValue}
              onInputChange={(event) =>
                event && setSearchInputValue(event.target.value)
              }
              open={searchInputValue.length > 0}
              noOptionsText={
                !rootState.problemsDataLoaded
                  ? "Se caută..."
                  : "Niciun rezultat"
              }
              onFocus={getProblems}
            />
          </div>
          <Link to="/provocare-saptamanala" className={`${classes.menuItem} ${classes.hiddenOnMobile}`}>
            <MenuItem>
              Provocare săptămânală 
            </MenuItem>
          </Link>
          <Link to="/probleme" className={`${classes.menuItem} ${classes.hiddenOnMobile}`}>
            <MenuItem>
              Probleme
            </MenuItem>
          </Link>
          <div className={classes.grow} />
          <Link to="/solutie-noua">
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddCircleTwoToneIcon />}
              className={classes.addSolutionBtn}
              disableElevation
            >
              Adaugă o soluție
            </Button>
          </Link>
          <div className={classes.menuRightSide}>
            <Badge
              badgeContent={notificationsCount}
              color="secondary"
              style={{ margin: "0 10px" }}
            >
              <NotificationsNoneTwoToneIcon
                edge="end"
                aria-label="Contul meu"
                aria-controls={notificationsId}
                aria-haspopup="true"
                onClick={handleNotificationsMenuOpen}
                color="inherit"
                style={{ cursor: "pointer" }}
              />
            </Badge>
            <IconButton
              edge="end"
              aria-label="Contul meu"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircleTwoToneIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
      {renderNotificationsMenu}
      <div className={classes.offset} />
    </div>
    <CookieNotification />
    </>
  );
}
