import React, { useContext, useEffect } from "react";
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
    dataLoaded: false,
    success: false,
    errorMsg: "",
    successMsg: "",
    justOpened: true,
  };

  const [state, setState] = React.useState(defaultState);

  useEffect(() => {

    async function logon() {

      await API("endpoint/auth/confirm.php", {
        token: token,
      }).then((logonResponse) => {
        setState({
          ...state,
          errorMsg: logonResponse.errorMsg,
          success: logonResponse.success,
          successMsg: logonResponse.successMsg,
          dataLoaded: true,
        });
      })
      
    }

    logon()

  }, [])

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
          style={{minHeight: "calc(100vh - 100px)"}}
        >
          <Grid item xs={12} sm={8} md={5}>
            <Paper className="cool-sha">
              {!state.dataLoaded && (
                <Box p={2}>
                  <center>
                    <CircularProgress />
                  </center>
                </Box>
              )}
              {state.dataLoaded && state.success && (
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
              {state.dataLoaded && !state.success && (
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
