import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { RootContext } from "./../contexts/Context";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { Link, useParams } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import MetaTags from "react-meta-tags";

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    minHeight: "85vh",
  },
  wrapperPaper: {
    padding: theme.spacing(3),
  },
}));

export default function ParolaResetare() {
  const { API, logout, checkSession } = useContext(RootContext);

  let { token } = useParams();

  const classes = useStyles();

  const initialState = {
    data_loaded: false,
    data_loading: false,
    success: false,
    errorMsg: "",
    successMsg: "",
    justOpened: true,
    input: {
      password: "",
      token: token,
      step: 1,
    },
  };

  const [state, setState] = React.useState(initialState);

  const handleChange = (prop) => (event) => {
    setState({
      ...state,
      input: {
        ...state.input,
        [prop]: event.target.value,
      },
    });
  };

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      submit();
    }
  }

  const submit = async (event) => {
    setState({
      ...state,
      isLoading: true,
    });

    const request = await API("endpoint/auth/password-new.php", state.input);

    if (!request.success) {
      setState({
        ...state,
        errorMsg: request.errorMsg,
        isLoading: false,
      });
    } else {
      setState({
        ...state,
        isLoading: false,
        successMsg: request.successMsg,
      });
      logout();
      await checkSession();
    }
  };

  const onLoad = async (event) => {
    setState({
      ...state,
      data_loading: true,
    });

    const request = await API("endpoint/auth/password-new.php", state.input);

    if (request.success) {
      setState({
        ...state,
        data_loading: false,
        data_loaded: true,
        input: {
          ...state.input,
          step: 2,
        },
      });
    } else {
      setState({
        ...state,
        data_loaded: true,
        data_loading: false,
        errorMsg: request.errorMsg,
        inpit: {
          ...state.input,
          step: 1,
        },
      });
    }
  };

  if (!state.data_loading && !state.data_loaded) {
    onLoad();
  }

  return (
    <>
      <MetaTags>
        <title>Resetare parolă | SOLINFO.ro</title>
      </MetaTags>
      <Container maxWidth="md">
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.formWrapper}
        >
          <Grid item xs={12} sm={8} md={5}>
            <Box mb={3} mt={3}>
              <Typography variant="h5" component="h1" align="center">
                Resetare parolă
              </Typography>
            </Box>
            <Paper className={`cool-sha ${classes.wrapperPaper}`}>
              <Grid container spacing={3}>
                {!state.data_loaded && (
                  <Grid item xs={12}>
                    <center>
                      <CircularProgress />
                    </center>
                  </Grid>
                )}
                {state.data_loaded && state.input.step === 1 && state.errorMsg && (
                  <Grid item xs={12}>
                    <Alert severity="error">{state.errorMsg}</Alert>
                  </Grid>
                )}
                {state.input.step === 2 && state.successMsg && (
                  <>
                    <Grid item xs={12}>
                      <Alert severity="success">{state.successMsg}</Alert>
                    </Grid>
                    <Grid item xs={12}>
                      <Link to="/cont">
                        <Button
                          variant="contained"
                          color="primary"
                          disableElevation
                          fullWidth
                        >
                          Autentifică-te
                        </Button>
                      </Link>
                    </Grid>
                  </>
                )}
                {state.input.step === 2 && !state.successMsg && (
                  <>
                    <Grid item xs={12}>
                      <Typography variant="body1" component="p">
                        Pentru a finaliza schimbarea parolei contului tău,
                        introdu o nouă parolă în câmpul de mai jos.
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="password"
                        value={state.input.password}
                        onChange={handleChange("password")}
                        onKeyDown={handleKeyDown}
                        type="password"
                        required
                        fullWidth
                        label="Parolă nouă"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        color="primary"
                        disableElevation
                        fullWidth
                        onClick={submit}
                        disabled={state.isLoading}
                      >
                        {state.isLoading ? (
                          <>Se încarcă...</>
                        ) : (
                          <>Resetare parolă</>
                        )}
                      </Button>
                    </Grid>
                    {state.errorMsg && (
                      <Grid item xs={12}>
                        <Alert severity="error">{state.errorMsg}</Alert>
                      </Grid>
                    )}
                  </>
                )}
              </Grid>
            </Paper>
            <Box mt={2}>
              <Typography variant="body2" component="p">
                Vrei să te autentifici sau să te înregistrezi? Intră{" "}
                <Link to="/cont">aici</Link>.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
