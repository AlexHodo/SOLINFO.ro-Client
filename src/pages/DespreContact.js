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
  displayOnMobile: {
    display: "none",
    [theme.breakpoints.down("xs")]: {
      display: "block",
    },
  },
}));

export default function DespreContact() {
  const { rootState } = useContext(RootContext);

  const classes = useStyles();

  return (
    <>
      <MetaTags>
        <title>Despre noi & Contact | SOLINFO.ro</title>
      </MetaTags>
      <Container maxWidth="md">
        <Grid container>
          <Grid item xs={12} className={classes.header}>
            <Grid container justify="center" alignItems="center">
              <Grid item xs={12} md={12}>
                <Typography variant="h5" component="h1">
                  Despre noi & Contact
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
                  Despre noi
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Paper className="cool-sha">
                  <Box p={2}>
                    <Typography
                      variant="body1"
                      dangerouslySetInnerHTML={{ __html: rootState.about }}
                    />
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Box mb={1}>
                  <Typography variant="h6" component="h2">
                    Contact
                  </Typography>
                </Box>
                <Paper className="cool-sha">
                  <Box p={2}>
                    <Typography
                      variant="body1"
                      dangerouslySetInnerHTML={{ __html: rootState.contact }}
                    />
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
    </>
  );
}
