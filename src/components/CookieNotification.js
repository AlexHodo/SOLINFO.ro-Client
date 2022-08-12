import React, { useContext, useState } from "react";
import { RootContext } from "./../contexts/Context";
import Grid from "@material-ui/core/Grid";
import { fade, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import ReactGA from "react-ga";
ReactGA.initialize("UA-199814762-1");

const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: "fixed",
    bottom: "25px",
    left: "50%",
    width: "85%",
    maxWidth: "calc(700px - 15%)",
    zIndex: 9999,
    transform: "translateX(-50%)",
  },
  paper: {
    padding: theme.spacing(2),
    boxShadow:
      "0 5px 10px rgba(48,58,83,.025), 0 15px 40px rgba(48,58,83,.5) !important",
    background: theme.palette.secondary.main,
    color: fade(theme.palette.common.white, 0.95),
  },
  text: {
    fontSize: "0.8rem",
    lineHeight: 1,
    "& a": {
      color: theme.palette.common.white,
      textDecoration: "underline",
    },
  },
}));

export default function CookieNotification() {
  const classes = useStyles();

  const { rootState } = React.useContext(RootContext);

  const [state, setState] = React.useState({
    consent: localStorage.getItem("cookies_consent") !== null,
  });

  const handleConsent = () => {
    localStorage.setItem("cookies_consent", `${Date.now()}~yes`);
    setState({
      consent: localStorage.getItem("cookies_consent"),
    });
    ReactGA.event({
      category: "Cookie",
      action: "Consented to cookies",
    });
  };

  return (
    <>
      {rootState.authStatusChecked && !state.consent && (
        <Box className={`${classes.wrapper}`}>
          <Paper className={classes.paper}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={8} style={{ lineHeight: 1 }}>
                <Typography
                  className={classes.text}
                  variant="body"
                  dangerouslySetInnerHTML={{
                    __html: rootState.cookies,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  disableElevation
                  size="small"
                  onClick={handleConsent}
                >
                  Am înțeles
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      )}
    </>
  );
}
