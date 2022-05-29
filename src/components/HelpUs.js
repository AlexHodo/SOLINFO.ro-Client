import React, { useContext } from "react";
import { RootContext } from "./../contexts/Context";
import { fade, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
  },
  img: {
    width: "50%",
    minWidth: "200px",
    margin: "0 auto",
    [theme.breakpoints.up("md")]: {
      marginLeft: theme.spacing(1),
    },
  },
  title: {
    fontWeight: 500,
    fontSize: "1.25rem",
    fontStyle: "italic",
  },
  head: {
    "& *": {
      textAlign: "center",
    },
  },
}));

export default function HelpUs() {
  const classes = useStyles();

  const { rootState } = useContext(RootContext);

  return (
    <>
      {rootState.showHelpUs && (
        <div>
          <Box p={2}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} className={classes.head}>
                <Typography className={classes.title}>
                  Când viața îți dă pbinfo.ro, intră pe SOLINFO.ro!
                </Typography>
                <Typography variant="body2">
                  SOLINFO.ro este un proiect aflat încă la început de drum.
                </Typography>
                <Typography variant="body2">
                  Dacă îți place ideea și dorești să contribui, uite 3 moduri în
                  care o poți face:
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <center>
                  <img
                    src={`${rootState.fileDomain}/client/illustration_programmer.svg`}
                    className={classes.img}
                  />
                </center>
              </Grid>
              <Grid item xs={12} md={8}>
                <Paper className={`cool-sha ${classes.paper}`}>
                  <Typography>
                    <ul>
                      <li>
                        <Typography variant="body1">Adaugă soluții.</Typography>
                        <Typography variant="body2">
                          <Link to="/solutie-noua">Adaugă</Link> una, două, sau
                          chiar 100 de soluții pe site. Cu toții îți vom fi
                          recunoscători!
                        </Typography>
                      </li>
                      <li>
                        <Typography variant="body1">
                          Spune-le și prietenilor.
                        </Typography>
                        <Typography variant="body2">
                          Arată site-ul și prietenilor tăi. Poate îi va încânta
                          ideea, sau poate ne vor încânta și ei cu o soluție
                          nouă.
                        </Typography>
                      </li>
                      <li>
                        <Typography variant="body1">Susține-ne.</Typography>
                        <Typography variant="body2">
                          Site-ul va fi mereu gratuit, dar întreținerea sa
                          presupune diverse costuri. Poți să ne susții prin{" "}
                          <a href="https://ko-fi.com/alexhodo" target="_blank">
                            Ko-Fi
                          </a>
                          .
                        </Typography>
                      </li>
                    </ul>
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </div>
      )}
    </>
  );
}
