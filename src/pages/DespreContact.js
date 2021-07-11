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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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
  tableWrapper: {
    width: "600px",
    maxWidth: "100%",
    overflow: "scroll",
    margin: "0 auto",
    marginTop: "1rem"
  },
  tableCell: {
    color: theme.palette.common.black,
    "&--1": {
      background: fade(theme.palette.badge1.main, 0.75)
    },
    "&--2": {
      background: fade(theme.palette.badge2.main, 0.75)
    },
    "&--3": {
      background: fade(theme.palette.badge3.main, 0.75)
    },
    "&--4": {
      background: fade(theme.palette.badge4.main, 0.75)
    },
    "&--1_a": {
      background: theme.palette.badge1.main
    },
    "&--2_a": {
      background: theme.palette.badge2.main
    },
    "&--3_a": {
      background: theme.palette.badge3.main
    },
    "&--4_a": {
      background: theme.palette.badge4.main
    },
  },
  tableCellRoot: {
    border: "1px solid white",
    fontSize: "1rem",
    lineHeight: "1rem",
    textAlign: "left"
  }
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
                <Typography variant="h6" component="h2">
                  Despre trofee
                </Typography>
              </Grid>
              <div id="trofee"/>
              <Grid item xs={12}>
                <Paper className="cool-sha">
                  <Box p={2}>
                    <Typography
                      variant="body1"
                    >
                      Trofeele sunt recompense simbolice pentru cei mai activi utilizatori. Trofeele <b>Staff</b> și <b>Premium</b> (<i>în curând</i>) sunt oferite de către administratori, în timp ce trofeele <b>Contributor</b> și <b>Ambițios</b> sunt oferite automat în funcție de numărul soluțiilor adăugate și, respectiv, numărul de probleme rezolvate în cadrul <Link to="/provocare-saptamanala">Provocărilor Săptămânale</Link>.
                    </Typography>
                    <Typography
                      variant="body1"
                    >
                      Cele din urmă pot fi obținute în 4 nivele, după cum urmează:
                    </Typography>
                    <div className={classes.tableWrapper}>
                      <Table size="small" className={classes.table} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell classes={{root: classes.tableCellRoot}}>Trofeu / Nivel</TableCell>
                            <TableCell classes={{root: classes.tableCellRoot}} className={`${classes.tableCell} ${classes.tableCell}--1_a`} align="right">Nivel 1</TableCell>
                            <TableCell classes={{root: classes.tableCellRoot}} className={`${classes.tableCell} ${classes.tableCell}--2_a`} align="right">Nivel 2</TableCell>
                            <TableCell classes={{root: classes.tableCellRoot}} className={`${classes.tableCell} ${classes.tableCell}--3_a`} align="right">Nivel 3</TableCell>
                            <TableCell classes={{root: classes.tableCellRoot}} className={`${classes.tableCell} ${classes.tableCell}--4_a`} align="right">Nivel 4</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell classes={{root: classes.tableCellRoot}} component="th" scope="row">
                              Contributor
                            </TableCell>
                            <TableCell classes={{root: classes.tableCellRoot}} className={`${classes.tableCell} ${classes.tableCell}--1`} align="right">1+ soluții</TableCell>
                            <TableCell classes={{root: classes.tableCellRoot}} className={`${classes.tableCell} ${classes.tableCell}--2`} align="right">10+ soluții</TableCell>
                            <TableCell classes={{root: classes.tableCellRoot}} className={`${classes.tableCell} ${classes.tableCell}--3`} align="right">100+ soluții</TableCell>
                            <TableCell classes={{root: classes.tableCellRoot}} className={`${classes.tableCell} ${classes.tableCell}--4`} align="right">1000+ soluții</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell classes={{root: classes.tableCellRoot}} component="th" scope="row">
                              Ambițios
                            </TableCell>
                            <TableCell classes={{root: classes.tableCellRoot}} className={`${classes.tableCell} ${classes.tableCell}--1`} align="right">1+ provocări</TableCell>
                            <TableCell classes={{root: classes.tableCellRoot}} className={`${classes.tableCell} ${classes.tableCell}--2`} align="right">5+ provocări</TableCell>
                            <TableCell classes={{root: classes.tableCellRoot}} className={`${classes.tableCell} ${classes.tableCell}--3`} align="right">25+ provocări</TableCell>
                            <TableCell classes={{root: classes.tableCellRoot}} className={`${classes.tableCell} ${classes.tableCell}--4`} align="right">100+ provocări</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
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
