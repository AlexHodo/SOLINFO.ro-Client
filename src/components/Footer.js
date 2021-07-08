import React, { useContext } from "react";
import { RootContext } from "./../contexts/Context";
import { fade, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";
import { InstaFollow } from "./InstaFollow";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    marginTop: theme.spacing(5),
    background: theme.palette.common.white,
    padding: theme.spacing(3, 0),
  },
  displayOnMobile: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
  hideOnMobile: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  menuList: {
    textAlign: "right",
  },
  menuListItem: {
    color: fade(theme.palette.secondary.main, 0.5),
    "&:hover": {
      color: fade(theme.palette.primary.main, 1),
    },
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
      display: "block",
    },
  },
  menuListBullet: {
    color: fade(theme.palette.secondary.main, 0.5),
    margin: theme.spacing(0, 1),
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  copyright: {
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
    },
    color: fade(theme.palette.secondary.main, 0.5),
  },
  advertiseMyself: {
    textAlign: "center",
    margin: theme.spacing(5, 0),
  },
  adTitle: {
    textAlign: "center",
    fontSize: "1.5rem",
    lineHeight: "1.5rem",
  },
  adSubtitle: {
    textAlign: "center",
    fontSize: "1.25rem",
    lineHeight: "1.25rem",
    margin: theme.spacing(2, 0),
    fontWeight: 400,
  },
  adNote: {
    color: fade(theme.palette.secondary.main, 0.75),
    textAlign: "center",
    marginTop: theme.spacing(1),
  },
}));

export default function Footer() {
  const classes = useStyles();

  const { rootState } = useContext(RootContext);

  const date = new Date();

  return (
    <>
      {rootState.showPersonalAd && (
        <div className={classes.advertiseMyself}>
          <Container maxWidth="sm">
            <Typography variant="h5" component="p" className={classes.adTitle}>
              Îți place site-ul?
            </Typography>
            <Typography
              variant="h6"
              component="p"
              className={classes.adSubtitle}
            >
              Dacă da, atunci te invit să mă urmărești pe Instagram pentru a fi
              la curent cu ce mai <i>codez</i>.
            </Typography>
            <InstaFollow />
            <Typography
              variant="body2"
              component="p"
              className={classes.adNote}
            >
              De altfel, îmi poți vizita site-ul{" "}
              <a href="https://hodo.codes" target="_blank" rel="noreferral">
                hodo.codes
              </a>{" "}
              și profilul de{" "}
              <a
                href="https://github.com/AlexHodo"
                target="_blank"
                rel="noreferral"
              >
                Github
              </a>
              .
            </Typography>
          </Container>
        </div>
      )}
      <div className={`cool-sha ${classes.wrapper}`}>
        <Container maxWidth="lg">
          <Grid container>
            <Grid item xs={12} sm={4}>
              <Typography ariant="body2" className={classes.copyright}>
                &copy; {date.getFullYear()} | Toate drepturile rezervate.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography ariant="body2" className={classes.menuList}>
                <Link className={classes.menuListItem} to="/">
                  Acasă
                </Link>
                <span className={classes.menuListBullet}>&#8226;</span>
                <a className={classes.menuListItem} href="/blog/">
                  Blog
                </a>
                <span className={classes.menuListBullet}>&#8226;</span>
                <Link className={classes.menuListItem} to="/probleme">
                  Probleme
                </Link>
                <span className={classes.menuListBullet}>&#8226;</span>
                <Link className={classes.menuListItem} to="/cont">
                  Contul meu
                </Link>
                <span className={classes.menuListBullet}>&#8226;</span>
                <Link className={classes.menuListItem} to="/solutie-noua">
                  Adaugă o soluție
                </Link>
                <span className={classes.menuListBullet}>&#8226;</span>
                <Link className={classes.menuListItem} to="/despre-contact">
                  Despre & Contact
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
}
