import React, { useContext } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { RootContext } from "./../contexts/Context";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import Alert from "@material-ui/lab/Alert";
import Cont from "./Cont";
import Sidebar from "./../components/Sidebar";
import MetaTags from "react-meta-tags";

const useStyles = makeStyles((theme) => ({
  header: {
    margin: theme.spacing(3, 0, 0, 0),
    textAlign: "left",
  },
  divider: {
    margin: theme.spacing(3, 0),
  },
  coverPreview: {
    width: "100%",
    height: "100px",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    position: "relative",
    "&:hover": {
      cursor: "pointer",
    },
    "& > *": {
      display: "none",
      position: "absolut",
      left: "50%",
      top: "50%",
      transform: "translateX(-50%) translateY(-50%)",
      zIndex: 2,
    },
    "&:hover > *": {
      display: "block",
    },
    "&::after": {
      content: "''",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      background: fade(theme.palette.common.white, 0.5),
      position: "absolute",
      zIndex: 1,
      display: "none",
      transitionDuration: ".2s",
    },
    "&:hover::after": {
      display: "block",
    },
  },
  coverPreviewActive: {
    "& > *": {
      display: "block !important",
      background: "rgba(255,255,255,0.75) !important",
      color: "black !important",
    },
    "&::after": {
      display: "block !important",
    },
  },
  displayOnMobile: {
    display: "none",
    [theme.breakpoints.down("xs")]: {
      display: "block",
    },
  },
}));

export default function Setari() {
  const { API, rootState, checkSession } = useContext(RootContext);

  const defaultState = {
    data_loaded: false,
    data_loading: false,
    initial_values: {
      first_name: rootState.userInfo.firstName,
      last_name: rootState.userInfo.lastName,
      email_address: rootState.userInfo.emailAddress,
      username: rootState.userInfo.username,
    },
    input: {
      first_name: rootState.userInfo.firstName,
      last_name: rootState.userInfo.lastName,
      email_address: rootState.userInfo.emailAddress,
      username: rootState.userInfo.username,
    },
    error: {
      first_name: null,
      last_name: null,
      email_address: null,
      username: null,
    },
    success: {
      first_name: null,
      last_name: null,
      email_address: null,
      username: null,
    },
    initialized: false,
    is_disabled: false,
    currently_loading: null,
  };

  const [state, setState] = React.useState(defaultState);

  if (
    !state.initialized &&
    rootState.authStatusChecked &&
    rootState.isLoggedIn
  ) {
    setState({
      ...state,
      input: {
        first_name: rootState.userInfo.firstName,
        last_name: rootState.userInfo.lastName,
        email_address: rootState.userInfo.emailAddress,
        username: rootState.userInfo.username,
        coverId: -1,
      },
      initial_values: {
        first_name: rootState.userInfo.firstName,
        last_name: rootState.userInfo.lastName,
        email_address: rootState.userInfo.emailAddress,
        username: rootState.userInfo.username,
        coverId: -1,
      },
      initialized: true,
    });
  }

  const classes = useStyles();

  const handleChange = (prop) => (event) => {
    setState({
      ...state,
      input: {
        ...state.input,
        [prop]: event.target.value,
      },
      changed: {
        ...state.changed,
        [prop]: true,
      },
      error: {
        ...state.error,
        [prop]: null,
      },
      success: {
        ...state.success,
        [prop]: null,
      },
    });
  };

  const submit = (prop) => async (event) => {
    setState({
      ...state,
      is_disabled: true,
      currently_loading: prop,
    });

    const request = await API("endpoint/page/setari.php", {
      [prop]: state.input[prop],
    });

    if (request.success) {
      await checkSession();
      setState({
        ...state,
        initial_values: {
          ...state.initial_values,
          [prop]: state.input[prop],
        },
        success: {
          ...state.success,
          [prop]: request.successMsg,
        },
        error: {
          ...state.error,
          [prop]: null,
        },
        is_disabled: false,
      });
    } else {
      setState({
        ...state,
        error: {
          ...state.error,
          [prop]: request.errorMsg,
        },
        success: {
          ...state.success,
          [prop]: null,
        },
        is_disabled: false,
      });
    }
  };

  const chooseCover = (prop) => async (event) => {
    setState({
      ...state,
      input: {
        ...state.input,
        coverId: prop,
      },
      is_disabled: true,
      currently_loading: "coverId",
    });

    const request = await API("endpoint/page/setari.php", {
      coverId: prop,
    });

    if (request.success) {
      setState({
        ...state,
        initial_values: {
          ...state.initial_values,
          coverId: prop,
        },
        currently_loading: null,
      });
    } else {
      setState({
        ...state,
        currently_loading: null,
        error: {
          ...state.error,
          coverId: request.errorMsg,
        },
      });
    }
  };

  return (
    <>
      <MetaTags>
        <title>Setări | SOLINFO.ro</title>
      </MetaTags>
      {rootState.authStatusChecked && rootState.isLoggedIn ? (
        <Container maxWidth="md">
          <Grid container>
            <Grid item xs={12} className={classes.header}>
              <Grid container justify="center" alignItems="center">
                <Grid item xs={12} md={12}>
                  <Typography variant="h5" component="h1">
                    Setări
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Divider className={classes.divider} />
            </Grid>
            <Grid item xs={12} sm={8} md={9}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h6" component="h2">
                    Setările contului
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Paper className="cool-sha">
                    <Box p={2}>
                      <Grid container spacing={2} alignItems="flex-end">
                        <Grid item xs={12} sm={8}>
                          <TextField
                            fullWidth
                            label="Nume"
                            value={state.input.last_name}
                            onChange={handleChange("last_name")}
                            disabled={state.is_disabled}
                          />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Button
                            fullWidth
                            disableElevation
                            color="primary"
                            variant="contained"
                            disabled={
                              state.input.last_name ===
                                state.initial_values.last_name ||
                              state.is_disabled
                            }
                            onClick={submit("last_name")}
                          >
                            {state.currently_loading === "last_name"
                              ? "Se încarcă..."
                              : "Salvează"}
                          </Button>
                        </Grid>
                        {state.success.last_name && (
                          <Grid item xs={12}>
                            <Alert severity="success">
                              {state.success.last_name}
                            </Alert>
                          </Grid>
                        )}
                        {state.error.last_name && (
                          <Grid item xs={12}>
                            <Alert severity="error">
                              {state.error.last_name}
                            </Alert>
                          </Grid>
                        )}
                        <Grid item xs={12} sm={8}>
                          <TextField
                            fullWidth
                            label="Prenume"
                            value={state.input.first_name}
                            onChange={handleChange("first_name")}
                            disabled={state.is_disabled}
                          />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Button
                            fullWidth
                            disableElevation
                            color="primary"
                            variant="contained"
                            disabled={
                              state.input.first_name ===
                                state.initial_values.first_name ||
                              state.is_disabled
                            }
                            onClick={submit("first_name")}
                          >
                            {state.currently_loading === "first_name"
                              ? "Se încarcă..."
                              : "Salvează"}
                          </Button>
                        </Grid>
                        {state.success.first_name && (
                          <Grid item xs={12}>
                            <Alert severity="success">
                              {state.success.first_name}
                            </Alert>
                          </Grid>
                        )}
                        {state.error.first_name && (
                          <Grid item xs={12}>
                            <Alert severity="error">
                              {state.error.first_name}
                            </Alert>
                          </Grid>
                        )}
                        <Grid item xs={12} sm={8}>
                          <TextField
                            fullWidth
                            label="Nume de utilizator"
                            value={state.input.username}
                            onChange={handleChange("username")}
                            disabled={state.is_disabled}
                          />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Button
                            fullWidth
                            disableElevation
                            color="primary"
                            variant="contained"
                            disabled={
                              state.input.username ===
                                state.initial_values.username ||
                              state.is_disabled
                            }
                            onClick={submit("username")}
                          >
                            {state.currently_loading === "username"
                              ? "Se încarcă..."
                              : "Salvează"}
                          </Button>
                        </Grid>
                        {state.success.username && (
                          <Grid item xs={12}>
                            <Alert severity="success">
                              {state.success.username}
                            </Alert>
                          </Grid>
                        )}
                        {state.error.username && (
                          <Grid item xs={12}>
                            <Alert severity="error">
                              {state.error.username}
                            </Alert>
                          </Grid>
                        )}
                        <Grid item xs={12} sm={8}>
                          <TextField
                            fullWidth
                            label="Adresă de email"
                            value={state.input.email_address}
                            onChange={handleChange("email_address")}
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Button
                            fullWidth
                            disableElevation
                            color="primary"
                            variant="contained"
                            disabled={
                              state.input.email_address ===
                                state.initial_values.email_address ||
                              state.is_disabled
                            }
                            onClick={submit("email_address")}
                          >
                            {state.currently_loading === "email_address"
                              ? "Se încarcă..."
                              : "Salvează"}
                          </Button>
                        </Grid>
                        {state.success.email_address && (
                          <Grid item xs={12}>
                            <Alert severity="success">
                              {state.success.email_address}
                            </Alert>
                          </Grid>
                        )}
                        {state.error.email_address && (
                          <Grid item xs={12}>
                            <Alert severity="errror">
                              {state.error.email_address}
                            </Alert>
                          </Grid>
                        )}
                      </Grid>
                      <Box mt={3}>
                        <Typography>
                          Dacă dorești să îți resetezi parola, intră{" "}
                          <Link to="/cont/parola">aici</Link>.
                        </Typography>
                        <Typography>
                          Dacă unele din câmpurile de mai sus nu pot fi editate,
                          te rugăm să ne contactezi{" "}
                          <Link to="/despre-contact">aici</Link>.
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Box mb={1}>
                    <Typography variant="h6" component="h2">
                      Setările profilului
                    </Typography>
                  </Box>
                  <Paper className="cool-sha">
                    <Box p={2} pb={0}>
                      <Typography>
                        <b>Alege o nouă imagine de copertă</b>
                      </Typography>
                      <br />
                      <Grid container spacing={1}>
                        {Array.from(Array(12)).map((index, key) => {
                          return (
                            <Grid item xs={12} sm={6} md={4}>
                              <div
                                className={`${classes.coverPreview} ${
                                  state.initial_values.coverId === key &&
                                  classes.coverPreviewActive
                                }`}
                                style={{
                                  backgroundImage: `url(${rootState.fileDomain}/cover/cover_${key}_small.jpg)`,
                                }}
                              >
                                <Button
                                  className={classes.previewButton}
                                  variant="contained"
                                  disableElevation
                                  color="secondary"
                                  onClick={chooseCover(key)}
                                  disabled={
                                    state.initial_values.coverId === key ||
                                    state.currently_loading === "coverId"
                                  }
                                >
                                  {state.initial_values.coverId === key
                                    ? "Activă"
                                    : "Alege"}
                                </Button>
                              </div>
                            </Grid>
                          );
                        })}
                      </Grid>
                    </Box>
                    <Box p={2}>
                      <Typography>
                        <b>Imaginea de profil</b>
                      </Typography>
                      <br />
                      <Typography>
                        Imaginea ta de profil este preluată din baza de date{" "}
                        <a href="https://gravatar.com" target="_blank">
                          Gravatar
                        </a>{" "}
                        în funcție de adresa ta de email. Dacă dorești să o
                        modifici, creează-ți un cont Gravatar cu aceeași adresă
                        de email și încarcă imaginea dorită pe profilul tău
                        Gravatar.
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Box pt={3} className={classes.displayOnMobile} />
              <Sidebar />
            </Grid>
          </Grid>
        </Container>
      ) : (
        <Cont />
      )}
    </>
  );
}
