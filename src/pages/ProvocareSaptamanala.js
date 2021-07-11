import React, { useContext } from "react";
import { fade, makeStyles, withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { RootContext } from "./../contexts/Context";
import Box from "@material-ui/core/Box";
import { Link, useParams } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import MetaTags from "react-meta-tags";
import Divider from "@material-ui/core/Divider";
import Sidebar from "./../components/Sidebar";
import WeeklyChallenge from "./../components/WeeklyChallenge";

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

export default function ProvocareSaptamanala() {

  const { rootState } = useContext(RootContext);

  const classes = useStyles();

  return (
    <>
      <Container maxWidth="md">
        <Grid container>
          {!rootState.authStatusChecked && (
            <Grid item xs={12} className={classes.placeholder}>
              <CircularProgress />
            </Grid>
          )}

          {rootState.authStatusChecked && (
            <>
              <MetaTags>
                <title>
                  Provocarea Săptămânală | SOLINFO.ro
                </title>
              </MetaTags>
              <Grid item xs={12} className={classes.header}>
            <Grid container justify="center" alignItems="center">
              <Grid item xs={12} md={12}>
                <Typography variant="h5" component="h1">
                  Provocarea Săptămânală
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
                  Despre provocare
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Paper className="cool-sha">
                  <Box p={2}>
                    <Typography variant="body1">
                      În fiecare luni, alegem câteva probleme ceva mai complicate și vă provocăm să le rezolvați pe parcursul săptămânii, până duminică inclusiv. Rezolvarea fiecărei probleme din provocare îți va aduce 3 puncte, în loc de unul singur, cât ți-ar aduce rezolvarea oricărei alte probleme.
                    </Typography>
                    <Typography variant="body1">
                      De altfel, rezolvarea problemelor din provocări e singura modalitate prin care poți obține <Link to="/despre-contact">trofeul <i>Ambițios</i></Link>.
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" component="h2">
                  Provocarea curentă
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Paper className="cool-sha">
                  {rootState.weeklyChallengeTotal > 0? <Paper className="cool-sha">
                    <Box>
                      <WeeklyChallenge
                        challenge = {rootState.weeklyChallenge}
                        challengeTotal = {rootState.weeklyChallengeTotal}
                        challengeSolved = {rootState.weeklyChallengeSolved}
                      />
                    </Box>
                  </Paper> : <>
                    <Typography>Se pare că nicio provocare nu este activă momentan. Revino mai târziu.</Typography>
                  </>}
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <Box pt={3} className={classes.displayOnMobile} />
            <Sidebar hideWeeklyChallenge />
          </Grid>
        </>)}
        </Grid>
      </Container>
    </>
  );
}
