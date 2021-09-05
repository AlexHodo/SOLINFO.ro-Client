import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { RootContext } from "./../contexts/Context";
import AuthForm from "../components/AuthForm";
import Profil from "./Profil";
import { Link, useLocation } from "react-router-dom";
import Box from "@material-ui/core/Box";
import MetaTags from "react-meta-tags";
import CircularProgress from '@material-ui/core/CircularProgress'
import {
  TransitionGroup,
  CSSTransition
} from "react-transition-group";

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    minHeight: "75vh",
  },
  pageTitle: {
    textAlign: "center",
    margin: theme.spacing(3, 0),
  },
}));

export default function Auth() {
  const { rootState } = useContext(RootContext);

  const classes = useStyles();

  let location = useLocation()

  return (
    <>
      <MetaTags>
        <title>Contul meu | Autentifică-te sau înscrie-te | SOLINFO.ro</title>
      </MetaTags>
      {!rootState.authStatusChecked && <Container maxWidth="md" style={{minHeight: "100vh"}}>
        <Grid container>
          <Grid item xs={12} className={classes.placeholder}>
            <Box mt={5}>
              <center>
                <CircularProgress />
              </center>
            </Box>
          </Grid>
        </Grid>
      </Container>}
      {rootState.authStatusChecked && <>
      {rootState.authStatusChecked && rootState.isLoggedIn ? (
        <Profil />
      ) : (
        <Container maxWidth="md">
          <Grid
            container
            justify="center"
            alignItems="center"
            className={classes.formWrapper}
          >
            <Grid item xs={12} sm={8} md={5}>
              <Typography
                variant="h5"
                component="h1"
                className={classes.pageTitle}
              >
                Accesează-ți contul
              </Typography>
              <Paper className="cool-sha">
                <AuthForm />
              </Paper>
              <Box mt={2}>
                <Typography variant="body2" component="p">
                  Ți-ai uitat parola contului? Reseteaz-o{" "}
                  <Link to="/cont/parola">aici</Link>.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      )}
      </>}
    </>
  );
}
