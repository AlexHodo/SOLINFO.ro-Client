import React, { useContext, Suspense } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Menu from "./../components/Menu";
import NotFound from "./NotFound";
import { Switch, Route } from "react-router-dom";
import { RootContext } from "./../contexts/Context";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import LinearProgress from "@material-ui/core/LinearProgress";
import Fade from "@material-ui/core/Fade";
import Box from "@material-ui/core/Box";

const Cont = React.lazy(() => import('./../pages/Cont'));
const Probleme = React.lazy(() => import('./../pages/Probleme'));
const Problema = React.lazy(() => import('./../pages/Problema'));
const ContActivare = React.lazy(() => import('./../pages/ContActivare'));
const Parola = React.lazy(() => import('./../pages/Parola'));
const SolutieNoua = React.lazy(() => import('./../pages/SolutieNoua'));
const Profil = React.lazy(() => import('./../pages/Profil'));
const Setari = React.lazy(() => import('./../pages/Setari'));
const DespreContact = React.lazy(() => import('./../pages/DespreContact'));
const ParolaResetare = React.lazy(() => import('./../pages/ParolaResetare'));
const Footer = React.lazy(() => import('./../components/Footer'));
const Home = React.lazy(() => import('./../pages/Home'));

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
  loader: {
    transitionDuration: "0.25s",
    transitionDelay: "0.25s",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    opacity: 0,
    zIndex: 99999,
    "&.v": {
      opacity: 1
    }
  }
}));


export default function AppWrapper() {

  const { rootState } = useContext(RootContext);

  const classes = useStyles();

  var SuspenseFallback = <Box m={2}>
    <center>
      Se încarcă...
    </center>
  </Box>

  return (
    <>
      <LinearProgress color="secondary" className={`${classes.loader} ${rootState.showLoader && "v"}`}/>
      <div
        className={`${classes.app} ${
          rootState.authStatusChecked && "loaded"
        } App`}
      >
        <Menu />
        <div className={classes.switchWrapper}>
          <Switch>
            <Route path="/" exact children={<Suspense fallback={SuspenseFallback}>
              <Home />
            </Suspense>} />
            <Route
              path="/problema/:name"
              render={(props) => (
                <Suspense fallback={SuspenseFallback}>
                  <Problema {...props} key={window.location.pathname} />
                </Suspense>
              )}
            />
            <Route path="/probleme" children={<Suspense fallback={SuspenseFallback}>
              <Probleme />
            </Suspense>} />
            <Route path="/cont" exact children={<Suspense fallback={SuspenseFallback}>
              <Cont />
            </Suspense>} />
            <Route path="/cont/activare/:token" children={<Suspense fallback={SuspenseFallback}>
              <ContActivare />
            </Suspense>} />
            <Route path="/cont/parola" exact children={<Suspense fallback={SuspenseFallback}>
              <Parola />
            </Suspense>} />
            <Route path="/cont/parola/resetare/:token" children={<Suspense fallback={SuspenseFallback}>
              <ParolaResetare />
            </Suspense>} />
            <Route path="/cont/setari" exact children={<Suspense fallback={SuspenseFallback}>
              <Setari />
            </Suspense>} />
            <Route path="/profil/:username" children={<Suspense fallback={SuspenseFallback}>
              <Profil />
            </Suspense>} />
            <Route path="/solutie-noua" exact children={<Suspense fallback={SuspenseFallback}>
              <SolutieNoua />
            </Suspense>} />
            <Route path="/despre-contact" exact children={<Suspense fallback={SuspenseFallback}>
              <DespreContact />
            </Suspense>} />
            <Route children={<NotFound />} />
          </Switch>
        </div>
        <Suspense fallback={SuspenseFallback}>
          <Footer />
        </Suspense>
      </div>
    </>
  );
}
