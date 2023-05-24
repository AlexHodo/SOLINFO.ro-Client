import React, { useContext } from "react";
import { RootContext } from "./../contexts/Context";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/styles/makeStyles";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import ReactGA from "react-ga";
import InstagramIcon from "@material-ui/icons/Instagram";
ReactGA.initialize("UA-199814762-1");

const useStyles = makeStyles((theme) => ({
  root: {
    // border: `1px solid #DEDEDE`,
    padding: theme.spacing(2),
    borderRadius: "2px",
    maxWidth: 200,
    background: theme.palette.common.white,
    margin: "0 auto",
    "& *": {
      maxWidth: "100%",
    },
  },
  photoContainer: {
    marginBottom: theme.spacing(1),
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  channelUserName: {
    fontWeight: theme.typography.fontWeightBold,
    textAlign: "center",
  },
  chanelNameContainer: {
    marginBottom: theme.spacing(1),
  },
  followButton: {
    textTransform: "none",
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    fontWeight: 600,
    width: "100%",
  },
}));

export const InstaFollow = () => {
  const classes = useStyles();

  const { rootState } = useContext(RootContext);

  const openInstagram = function () {
    ReactGA.event({
      category: "Social",
      action: "Opened Instagram",
    });

    window.open("https://instagram.com/alexhodo", "_blank");
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className={`${classes.root} cool-sha`}
    >
      <div className={classes.photoContainer}>
        <Avatar
          className={classes.avatar}
          alt="Alex Hodo"
          src={`${rootState.fileDomain}/client/insta-profile-pic.jpg`}
        />
      </div>
      <Grid container justify="center" alignItems="center" spacing={5}>
        <Grid item xs={6}>
          <Typography variant="body2" className={classes.channelUserName}>
            @alexhodo
          </Typography>
        </Grid>
      </Grid>
      <div className={classes.chanelNameContainer}>
        <Typography color="textSecondary" variant="caption">
          Alex Hodo
        </Typography>
      </div>
      <Button
        disableElevation
        color="primary"
        variant="contained"
        size="small"
        className={classes.followButton}
        onClick={openInstagram}
        startIcon={<InstagramIcon />}
      >
        Urmărește
      </Button>
    </Grid>
  );
};
