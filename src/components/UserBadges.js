import React, { useContext } from "react";
import { RootContext } from "./../contexts/Context";
import { makeStyles, withStyles, fade } from '@material-ui/core/styles';
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from "react-router-dom";
import LinearProgress from '@material-ui/core/LinearProgress';
import Chip from '@material-ui/core/Chip';
import Icon from '@material-ui/core/Icon';
import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';
import ThumbUpTwoToneIcon from '@material-ui/icons/ThumbUpTwoTone';
import PersonOutlineTwoToneIcon from '@material-ui/icons/PersonOutlineTwoTone';
import OfflineBoltTwoToneIcon from '@material-ui/icons/OfflineBoltTwoTone';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  badgeWrapper: {
    "&:not(:first-child)": {
      marginLeft: "-6px !important"
    }
  },
  badge: {
    color: fade(theme.palette.common.white, 0.75),
    border: `1px solid white`,
    padding: "0.125rem",
    borderRadius: "50%",

  },
  badge_level: {
    "&--0": {
      display: "none",
    },
    "&--1": {
      background: theme.palette.badge1.main
    },
    "&--2": {
      background: theme.palette.badge2.main
    },
    "&--3": {
      background: theme.palette.badge3.main
    },
    "&--4": {
      background: theme.palette.badge4.main
    }
  },
  wrapper: {
    "& *": {
      margin: theme.spacing(0, 0.1),
      fontSize: "1rem",
    },
    "& *:nth-child(1)": {
      marginLeft: 0
    }
  },
  points: {
    // padding: "0.5rem 0.25rem"
    textAlign: "center",
    padding: "0 0.35rem",
    borderRadius: "50px",
    background: "white",
    color: fade(theme.palette.secondary.main, 0.85),
    borderColor: fade(theme.palette.secondary.main, 0.25),
    fontSize: "0.85rem"
  },
  pointsWrapper: {
    minWidth: "30px",
    height: "22px",
    marginTop: "-0.4rem",
  }
}));


export default function UserBadges(props) {

  const classes = useStyles();

  const { rootState } = useContext(RootContext);

  const initialState = {
    props: {
      size: props.size? props.size : "small",
      badges: props.badges? props.badges : [],
      points: props.points
    },
    errorMsg: null,
    isLoading: false,
  };



  const [state, setState] = React.useState(initialState);

  return (
    <Box>
      <div className={classes.wrapper}>
        <Grid container alignItems="center" justify="left">
          {state.props.badges.staff && state.props.badges.staff > 0? <Grid item className={classes.badgeWrapper}>
            <div><Tooltip title={`Staff`}>
              <PersonOutlineTwoToneIcon fontSize={state.props.size} className={`${classes.badge} ${classes.badge_level}--4`} />
            </Tooltip></div>
          </Grid> : <></>}
          {state.props.badges.premium && state.props.badges.premium > 0? <Grid item className={classes.badgeWrapper}>
            <div><Tooltip title={`Premium`}> 
              <OfflineBoltTwoToneIcon fontSize={state.props.size} className={`${classes.badge} ${classes.badge_level}--4`} />
            </Tooltip></div>
          </Grid> : <></>}
          {state.props.badges.contributor && state.props.badges.contributor > 0? <Grid item className={classes.badgeWrapper}>
            <div><Tooltip title={`Contributor lvl. ${state.props.badges.contributor}`}>
              <AddCircleTwoToneIcon fontSize={state.props.size} className={`${classes.badge} ${classes.badge_level}--${state.props.badges.contributor}`} />
            </Tooltip></div> 
          </Grid> : <></>}
          {state.props.badges.ambitios && state.props.badges.ambitios > 0? <Grid item className={classes.badgeWrapper}>
            <div><Tooltip title={`Ambițios lvl. ${state.props.badges.ambitios}`}>
              <ThumbUpTwoToneIcon fontSize={state.props.size} className={`${classes.badge} ${classes.badge_level}--${state.props.badges.ambitios}`} />
            </Tooltip></div>
          </Grid> : <></>}
          {state.props.points && state.props.points > 0? <Grid item>
            <div><Tooltip title={`${state.props.points} ${state.props.points >= 20? "de " : ""}puncte`}> 
              <div className={classes.pointsWrapper}>
                <Typography className={`${classes.points} ${classes.badge}`}>
                  {state.props.points}
                </Typography>
              </div>
            </Tooltip></div>
          </Grid> : <></>}
        </Grid>
      </div>
    </Box>
  );
}
