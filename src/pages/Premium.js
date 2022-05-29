import React, { useContext } from "react";
import { fade, makeStyles, withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { RootContext } from "../contexts/Context";
import Box from "@material-ui/core/Box";
import { Link, useParams } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import MetaTags from "react-meta-tags";
import Divider from "@material-ui/core/Divider";
import Sidebar from "../components/Sidebar";
import WeeklyChallenge from "../components/WeeklyChallenge";

const useStyles = makeStyles((theme) => ({
  placeholder: {
    margin: theme.spacing(6, 0),
    textAlign: "center",
  },
  header: {
    margin: theme.spacing(3, 0, 0, 0),
    textAlign: "left",
  },
  divider: {
    margin: theme.spacing(3, 0),
  },
  displayOnMobile: {
    display: "none",
    [theme.breakpoints.down("xs")]: {
      display: "block",
    },
  },
}));

export default function Premium() {
  const { rootState } = useContext(RootContext);

  const classes = useStyles();

  return (
    <>
      <Container maxWidth="md">
        <Grid container>
          {!rootState.authStatusChecked && (
            <Grid
              item
              xs={12}
              className={classes.placeholder}
              style={{ minHeight: "100vh" }}
            >
              <CircularProgress />
            </Grid>
          )}

          {rootState.authStatusChecked && (
            <>
              <MetaTags>
                <title>Pachetul Premium | SOLINFO.ro</title>
              </MetaTags>
              <Grid item xs={12} className={classes.header}>
                <Grid container justify="center" alignItems="center">
                  <Grid item xs={12} md={12}>
                    <Typography variant="h5" component="h1">
                      Pachetul Premium
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
                      Despre pachetul Premium
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper className="cool-sha">
                      <Box p={2}>
                        <Typography variant="body1">
                          Pachetul Premium aduce diverse beneficii conturilor
                          celor care susțin platforma SOLINFO.ro.
                        </Typography>
                        <Typography variant="body1">
                          Printre beneficii se numără eliminarea reclamelor,
                          precum și un badge super exclusiv!
                        </Typography>
                        <Typography variant="body1">
                          Odată obținut, pachetul Premium va fi activ pe cont
                          pentru tot restul vieții.
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6" component="h2">
                      Cum pot obține pachetul Premium?
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper className="cool-sha">
                      <Box p={2}>
                        <Typography variant="body1">
                          Pachetul Premium este oferit de către admini
                          utilizatorilor care aduc contribuții semnificative
                          platformei.
                        </Typography>
                        <Typography variant="body1">
                          De altfel, pachetul poate fi obținut prin efectuarea
                          unei donații{" "}
                          <a
                            href="https://ko-fi.com/s/4c3ff8ac1a"
                            target="_blank"
                          >
                            aici
                          </a>
                          .
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6" component="h2">
                      Ai făcut deja o donație?
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper className="cool-sha">
                      <Box p={2}>
                        <Typography variant="body1">
                          Dacă ai făcut deja o donație și dorești să intri în
                          posesia pachetului, te rugăm să ne contactezi pe
                          adresa de email contact@solinfo.ro sau pe serverul de
                          Discord!
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <Box pt={3} className={classes.displayOnMobile} />
                <Sidebar hideWeeklyChallenge />
              </Grid>
            </>
          )}
        </Grid>
      </Container>
    </>
  );
}
