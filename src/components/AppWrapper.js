import React, { useContext, Suspense } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Menu from "./../components/Menu";
import NotFound from "./NotFound";
import { Switch, Route, useLocation } from "react-router-dom";
import { RootContext } from "./../contexts/Context";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fade from "@material-ui/core/Fade";
import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import DialogContent from "@material-ui/core/DialogContent";
import { TransitionGroup, CSSTransition } from "react-transition-group";
// import { useDetectAdBlock } from "adblock-detect-react";
import PanToolTwoToneIcon from "@material-ui/icons/PanToolTwoTone";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";

import SolutieNoua from "./../pages/SolutieNoua";
import Logo from "../media/logo.svg";

const Cont = React.lazy(() => import("./../pages/Cont"));
const Probleme = React.lazy(() => import("./../pages/Probleme"));
const Problema = React.lazy(() => import("./../pages/Problema"));
const ContActivare = React.lazy(() => import("./../pages/ContActivare"));
const Parola = React.lazy(() => import("./../pages/Parola"));
// const SolutieNoua = React.lazy(() => import('./../pages/SolutieNoua'));
const Profil = React.lazy(() => import("./../pages/Profil"));
const Setari = React.lazy(() => import("./../pages/Setari"));
const DespreContact = React.lazy(() => import("./../pages/DespreContact"));
const ParolaResetare = React.lazy(() => import("./../pages/ParolaResetare"));
const Footer = React.lazy(() => import("./../components/Footer"));
const Home = React.lazy(() => import("./../pages/Home"));
const ProvocareSaptamanala = React.lazy(() =>
  import("./../pages/ProvocareSaptamanala")
);
const ImportSolutii = React.lazy(() => import("./../pages/ImportSolutii"));
const Admin = React.lazy(() => import("./../pages/Admin"));
const PremiumConfirmare = React.lazy(() => import("../pages/Premium"));

const useStylesFacebook = makeStyles((theme) => ({
  root: {
    position: "fixed",
    top: "70px",
    right: "10px",
    background: "#F6F8FF",
    zIndex: 999,
    height: "auto",
    border: "3px solid #F6F8FF",
    borderRadius: "50%",
    height: "25px",
    width: "25px",
    opacity: 0,
    "&.s": {
      opacity: 1,
    },
  },
  bottom: {
    color: theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  top: {
    color: theme.palette.secondary.main,
    animationDuration: "350ms",
    position: "absolute",
    left: 0,
  },
  circle: {
    strokeLinecap: "round",
  },
}));

function FacebookCircularProgress(props) {
  let { show } = props;
  const classes = useStylesFacebook();
  return (
    <div className={`${classes.root} ${show && "s"}`}>
      <CircularProgress
        variant="determinate"
        className={classes.bottom}
        size={25}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        className={classes.top}
        classes={{
          circle: classes.circle,
        }}
        size={25}
        thickness={4}
        {...props}
      />
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: 9999,
    color: "#fff",
    backgroundColor: theme.palette.primary.main,
  },
  app: {
    "&.loaded": {},
  },
  progress: {
    "&.h": {
      display: "none",
      opacity: 0,
    },
  },
  switchWrapper: {
    minHeight: "100vh !important",
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
      opacity: 1,
    },
  },
  suspenseLogo: {
    width: "48px",
    height: "48px",
  },
  adBlockGuardBackDrop: {
    backdropFilter: "blur(5px)",
    backgroundColor: "rgba(0,0,30,0.4)",
  },
  adBlockGuardModalWrapper: {
    maxWidth: "500px",
  },
  adBlockGuardIconWrapper: {
    textAlign: "center",
  },
  adBlockGuardIcon: {
    fontSize: "3rem",
    color: theme.palette.error.main,
  },
  kofiFrame: {
    border: "none",
    width: "400px",
    maxWidth: "100%",
    padding: 0,
    background: "#fff",
  },
  kofiFrameWrapper: {
    padding: "0.5rem",
    paddingBottom: 0,
    background: "#fafafa",
    textAlign: "center",
  },
  closeButton: {
    position: "absolute",
    right: "0.25rem",
    top: "0.25rem",
  },
  kofiTitle: {
    background: "#fafafa",
  },
}));

const DonateDialog = (props) => {
  const classes = useStyles();
  const { rootState, setRootState } = useContext(RootContext);

  return (
    <Dialog open={rootState.donationModalOpen} maxWidth="md">
      <DialogTitle disableTypography className={classes.kofiTitle}>
        <Typography variant="h6">Susține SOLINFO.ro</Typography>
        <Typography variant="body2">
          Alternativ, ne poți susține achiziționând{" "}
          <Link
            to="/premium"
            onClick={() => {
              setRootState({ ...rootState, donationModalOpen: false });
            }}
          >
            pachetul Premium
          </Link>{" "}
          pentru numeroase beneficii!
        </Typography>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={() => {
            setRootState({ ...rootState, donationModalOpen: false });
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Box className={classes.kofiFrameWrapper}>
        <iframe
          id="kofiframe"
          src="https://ko-fi.com/alexhodo/?hidefeed=true&widget=true&embed=true&preview=true"
          className={classes.kofiFrame}
          height="712"
          title="alexhodo"
        ></iframe>
      </Box>
    </Dialog>
  );
};

const AdBlockGuard = (props) => {
  const classes = useStyles();
  return (
    <>
      <Dialog
        open
        BackdropProps={{
          classes: {
            root: classes.adBlockGuardBackDrop,
          },
        }}
        onClose={() => {}}
      >
        <DialogContent
          style={{ textAlign: "center" }}
          className={classes.adBlockGuardModalWrapper}
        >
          <Box>
            <Typography variant="h6" align="center" style={{ lineHeight: 1 }}>
              SOLINFO.ro este o aplicație gratuită
            </Typography>
            <Typography variant="body1" align="center">
              ...însă întreținerea sa costă.
            </Typography>
          </Box>
          <Box p={2}>
            <div className={classes.adBlockGuardIconWrapper}>
              <PanToolTwoToneIcon className={classes.adBlockGuardIcon} />
            </div>
          </Box>
          <Box>
            <Typography variant="body2" align="center">
              Am detectat că folosești o extensie care blochează afișarea
              anunțurilor.
            </Typography>
            <Typography variant="body2" align="center">
              Ne bazăm pe afișarea anunțurilor pentru a putea susține acest
              proiect.
            </Typography>
            <Typography variant="body2" align="center">
              Te rugăm să dezactivezi <b>AdBlockerul</b> folosit pentru a putea
              accesa SOLINFO.ro
            </Typography>
          </Box>
          <Box mt={3} mb={1} style={{ textAlign: "center" }}>
            <Button
              variant="contained"
              disableElevation
              color="primary"
              onClick={() => window.location.reload()}
              size="small"
            >
              L-am dezactivat
            </Button>
          </Box>
          <Box style={{ textAlign: "center" }} mb={1}>
            <Button
              variant="contained"
              disableElevation
              color="secondary"
              component="a"
              href="https://help.getadblock.com/support/solutions/articles/6000055743-how-to-disable-adblock-on-specific-sites"
              target="_blank"
              size="small"
            >
              Am nevoie de ajutor
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default function AppWrapper() {
  // const adBlockDetected = useDetectAdBlock();
  let location = useLocation();
  let inExt = location.pathname.startsWith("/solutie-noua-ext"); // viewed from extension

  const { rootState, setRootState } = useContext(RootContext);

  const classes = useStyles();

  var SuspenseFallback = (
    <Box m={2} style={{ minHeight: "100vh" }}>
      <center>
        <img src={Logo} className={`${classes.suspenseLogo} spinning`} />
      </center>
    </Box>
  );

  return (
    <>
      {/* Legacy top loader */
      /* <LinearProgress color="secondary" className={`${classes.loader} ${rootState.showLoader && "v"}`}/>*/}
      <FacebookCircularProgress show={rootState.showLoader} />
      <DonateDialog />
      <div
        className={`${classes.app} ${
          rootState.authStatusChecked && "loaded"
        } App`}
      >
        {!inExt && <Menu />}
        <TransitionGroup className={classes.switchWrapper}>
          <CSSTransition classNames="_anim--1" timeout={300} key={location.key}>
            <Switch location={location}>
              <Route
                path="/"
                exact
                children={
                  <Suspense fallback={SuspenseFallback}>
                    <Home />
                  </Suspense>
                }
              />
              <Route
                path="/problema/:name"
                children={
                  <Suspense fallback={SuspenseFallback}>
                    <Problema />
                  </Suspense>
                }
              />
              <Route
                path="/probleme"
                children={
                  <Suspense fallback={SuspenseFallback}>
                    <Probleme />
                  </Suspense>
                }
              />
              <Route
                path="/cont"
                exact
                children={
                  <Suspense fallback={SuspenseFallback}>
                    <Cont />
                  </Suspense>
                }
              />
              <Route
                path="/cont/activare/:token"
                children={
                  <Suspense fallback={SuspenseFallback}>
                    <ContActivare />
                  </Suspense>
                }
              />
              <Route
                path="/cont/parola"
                exact
                children={
                  <Suspense fallback={SuspenseFallback}>
                    <Parola />
                  </Suspense>
                }
              />
              <Route
                path="/cont/parola/resetare/:token"
                children={
                  <Suspense fallback={SuspenseFallback}>
                    <ParolaResetare />
                  </Suspense>
                }
              />
              <Route
                path="/cont/setari"
                exact
                children={
                  <Suspense fallback={SuspenseFallback}>
                    <Setari />
                  </Suspense>
                }
              />
              <Route
                path="/profil/:username"
                children={
                  <Suspense fallback={SuspenseFallback}>
                    <Profil />
                  </Suspense>
                }
              />
              <Route
                path="/solutie-noua"
                exact
                children={
                  <Suspense fallback={SuspenseFallback}>
                    <SolutieNoua />
                  </Suspense>
                }
              />
              <Route
                path="/despre-contact"
                exact
                children={
                  <Suspense fallback={SuspenseFallback}>
                    <DespreContact />
                  </Suspense>
                }
              />
              <Route
                path="/provocare-saptamanala"
                exact
                children={
                  <Suspense fallback={SuspenseFallback}>
                    <ProvocareSaptamanala />
                  </Suspense>
                }
              />
              <Route
                path="/solutie-noua-ext/:problemId/:content"
                exact
                children={
                  <Suspense fallback={SuspenseFallback}>
                    <SolutieNoua fromExtension />
                  </Suspense>
                }
              />
              <Route
                path="/solutie-noua-ext/"
                exact
                children={
                  <Suspense fallback={SuspenseFallback}>
                    <SolutieNoua fromExtension />
                  </Suspense>
                }
              />
              <Route
                path="/import-solutii"
                exact
                children={
                  <Suspense fallback={SuspenseFallback}>
                    <ImportSolutii />
                  </Suspense>
                }
              />
              <Route
                path="/admin"
                exact
                children={
                  <Suspense fallback={SuspenseFallback}>
                    <Admin />
                  </Suspense>
                }
              />
              <Route
                path="/premium"
                exact
                children={
                  <Suspense fallback={SuspenseFallback}>
                    <PremiumConfirmare />
                  </Suspense>
                }
              />
              <Route children={<NotFound />} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        {!inExt && (
          <Suspense fallback={SuspenseFallback}>
            <Footer />
          </Suspense>
        )}
      </div>
      {/*adBlockDetected && <AdBlockGuard />*/}
    </>
  );
}
