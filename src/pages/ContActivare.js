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
import MetaTags from "react-meta-tags";

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    minHeight: "75vh",
  },
}));

export default function ContActivare() {
  let { token } = useParams();

  const { API } = useContext(RootContext);

  const classes = useStyles();

  const defaultState = {
    data_loaded: false,
    data_loading: false,
    success: false,
    errorMsg: "",
    successMsg: "",
    justOpened: true,
  };

  const [state, setState] = React.useState(defaultState);

  const onLoad = async (event) => {
    setState({
      ...state,
      data_loading: true,
    });

    const request = await API("endpoint/auth/confirm.php", {
      token: token,
    });

    setState({
      ...state,
      errorMsg: request.errorMsg,
      success: request.success,
      successMsg: request.successMsg,
      data_loaded: true,
      data_loading: false,
    });
  };

  if (!state.data_loading && !state.data_loaded) {
    onLoad();
  }

  return (
    <>
      <MetaTags>
        <title>Activează-ți conul | SOLINFO.ro</title>
      </MetaTags>
      <Container maxWidth="md">
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.formWrapper}
        >
          <Grid item xs={12} sm={8} md={5}>
            <Paper className="cool-sha">
              {!state.data_loaded && (
                <Box p={2}>
                  <center>
                    <CircularProgress />
                  </center>
                </Box>
              )}
              {state.data_loaded && state.success && (
                <Box p={2}>
                  <Alert severity="success">{state.successMsg}</Alert>
                  <Box mt={2}>
                    <center>
                      <Link to="/cont">
                        <Button
                          color="primary"
                          variant="contained"
                          disableElevation
                        >
                          Autentifică-te
                        </Button>
                      </Link>
                    </center>
                  </Box>
                </Box>
              )}
              {state.data_loaded && !state.success && (
                <Box p={2}>
                  <Alert severity="error">{state.errorMsg}</Alert>
                  <Box mt={2}>
                    <center>
                      <Link to="/cont">
                        <Button
                          color="primary"
                          variant="contained"
                          disableElevation
                        >
                          Înregistrează-te din nou
                        </Button>
                      </Link>
                    </center>
                  </Box>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
