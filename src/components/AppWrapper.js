import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Menu from "./../components/Menu";
import Footer from "./../components/Footer";
import Home from "./../pages/Home";
import Problema from "./../pages/Problema";
import Cont from "./../pages/Cont";
import ContActivare from "./../pages/ContActivare";
import SolutieNoua from "./../pages/SolutieNoua";
import Profil from "./../pages/Profil";
import Setari from "./../pages/Setari";
import DespreContact from "./../pages/DespreContact";
import Parola from "./../pages/Parola";
import ParolaResetare from "./../pages/ParolaResetare";
import NotFound from "./NotFound";
import { Switch, Route } from "react-router-dom";
import { RootContext } from "./../contexts/Context";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: 9999,
    color: "#fff",
    backgroundColor: theme.palette.primary.main,
  },
  app: {
    //transitionDuration: "0.2s",
    // opacity: 0,
    "&.loaded": {
      opacity: 1,
    },
  },
  progress: {
    "&.h": {
      display: "none",
      opacity: 0,
    },
  },
  switchWrapper: {
    minHeight: "100vh",
  },
}));

export default function AppWrapper() {
  const { rootState } = useContext(RootContext);

  const classes = useStyles();

  return (
    <>
      <Backdrop
        className={classes.backdrop}
        open={!rootState.authStatusChecked && false}
      >
        <Fade
          in
          style={{
            transitionDelay: "300ms",
          }}
          unmountOnExit
        >
          <CircularProgress
            className={`${classes.progress} ${
              rootState.authStatusChecked && " h"
            }`}
            color="inherit"
          />
        </Fade>
      </Backdrop>
      <div
        className={`${classes.app} ${
          rootState.authStatusChecked && "loaded"
        } App`}
      >
        <Menu />
        <div className={classes.switchWrapper}>
          <Switch>
            <Route path="/" exact children={<Home />} />
            <Route
              path="/problema/:name"
              render={(props) => (
                <Problema {...props} key={window.location.pathname} />
              )}
            />
            <Route path="/cont" exact children={<Cont />} />
            <Route path="/cont/activare/:token" children={<ContActivare />} />
            <Route path="/cont/parola" exact children={<Parola />} />
            <Route
              path="/cont/parola/resetare/:token"
              children={<ParolaResetare />}
            />
            <Route path="/cont/setari" exact children={<Setari />} />
            <Route path="/profil/:username" children={<Profil />} />
            <Route path="/solutie-noua" exact children={<SolutieNoua />} />
            <Route path="/despre-contact" exact children={<DespreContact />} />
            <Route children={<NotFound />} />
          </Switch>
        </div>
        <Footer />
      </div>
    </>
  );
}
