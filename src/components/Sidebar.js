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
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles((theme) => ({
  icon: {
    background: theme.palette.secondary.main,
    color: fade(theme.palette.common.white, 0.9),
  },
  topList: {
    background: theme.palette.background.paper,
    borderRadius: "3px",
    padding: 0,
  },
  topListItem: {
    borderRadius: "3px",
    "&:hover": {
      background: fade(theme.palette.secondary.main, 0),
    },
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden"
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
  menuListItem: {
    color: fade(theme.palette.secondary.main, 0.5),
    "&:hover": {
      color: fade(theme.palette.primary.main, 1),
    },
    display: "block",
    textAlign: "center !important",
  },
  menuListBullet: {
    color: fade(theme.palette.secondary.main, 0.5),
    margin: theme.spacing(0, 1),
  },
  heart: {
    color: "#E91E63",
  },
  copyright: {
    marginTop: theme.spacing(2),
    textAlign: "center !important",
  },
  donateBtn: {
    background: "#FD434D",
    color: "white"
  }
}));

export default function Sidebar() {
  const classes = useStyles();

  const { rootState } = useContext(RootContext);

  const date = new Date();

  return (
    <>
      <Grid container spacing={2} justify="flex-end">
        <Grid item xs={12} sm={11}>
          <Box pb={2}>
            <Typography variant="h6">Top utilizatori</Typography>
          </Box>
          {rootState.stats && rootState.stats.top_users.length > 0 ? (
            <List className={`${classes.topList} cool-sha`} dense>
              {rootState.stats.top_users.map(function (item, index) {
                return (
                  <Link to={`/profil/${item.username}`} key={index}>
                    <ListItem button className={`${classes.topListItem}`}>
                      <ListItemIcon>
                        <Avatar
                          src={item.profile_img ? item.profile_img : ""}
                          className={classes.icon}
                        >
                          #{index + 1}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={`@${item.username}`}
                        secondary={`${item.solutions_count}${item.solutions_count >= 20? " de" : ""} soluții`}
                      />
                    </ListItem>
                  </Link>
                );
              })}
            </List>
          ) : (
            <>
              <Skeleton
                variant="rect"
                height={50}
                style={{ marginBottom: "0.5rem" }}
              />
              <Skeleton
                variant="rect"
                height={50}
                style={{ marginBottom: "0.5rem" }}
              />
              <Skeleton
                variant="rect"
                height={50}
                style={{ marginBottom: "0.5rem" }}
              />
            </>
          )}
        </Grid>
        {rootState.showDiscord && <Grid item xs={12} sm={11}>
          <Box pb={2}>
            <Typography variant="h6">Join our Discord</Typography>
          </Box>
          <iframe 
              className="cool-sha"
              src="https://discord.com/widget?id=862041051089600542&theme=dark" 
              width="100%" 
              height="400" 
              allowtransparency="true" 
              frameborder="0" 
              sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
            >
            </iframe>
        </Grid>}
        <Grid item xs={12} sm={11}>
          <Box className={classes.hideOnMobile}>
            <Typography ariant="body2" className={classes.menuList}>
              <Link className={classes.menuListItem} to="/">
                Acasă
              </Link>
              <a className={classes.menuListItem} href="/blog/">
                Blog
              </a>
              <Link className={classes.menuListItem} to="/cont">
                Contul meu
              </Link>
              <Link className={classes.menuListItem} to="/probleme">
                Probleme
              </Link>
              <Link className={classes.menuListItem} to="/solutie-noua">
                Adaugă o soluție
              </Link>
              <Link className={classes.menuListItem} to="/despre-contact">
                Despre & Contact
              </Link>
            </Typography>
            <Typography
              variant="body2"
              className={`${classes.copyright} ${classes.hideOnMobile}`}
            >
              &copy; {date.getFullYear()}
              <br />
              Creat cu <span className={classes.heart}>&#10084;</span> de{" "}
              <a
                href="https://instagram.com/alexhodo"
                rel="noreferrer"
                target="_blank"
              >
                Alex Hodo
              </a>
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={11} className={`${rootState.showPersonalAd && classes.hideOnMobile}`}>
          <InstaFollow />
        </Grid>
      </Grid>
    </>
  );
}
