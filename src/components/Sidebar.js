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
import Paper from "@material-ui/core/Paper"
import WeeklyChallenge from "./WeeklyChallenge";
import UserBadges from "./UserBadges";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  icon: {
    background: theme.palette.secondary.main,
    color: fade(theme.palette.common.white, 0.9),
  },
  topList: {
    background: theme.palette.background.paper,
    borderRadius: "3px",
    padding: 0,
    maxHeight: "300px",
    overflow: "hidden",
    position: "relative",
    "&._e": {
      overflow: "auto",
    }
  },
  expandTopWrapper: {
    position: "absolute",
    left: 0,
    top: "250px",
    width: `calc(100% - 2 * ${theme.spacing(1)}px)`,
    background: "white",
    height: `calc(50px - 2 * ${theme.spacing(1)}px)`,
    boxShadow: "0px -20px 25px 10px #fff",
    padding: theme.spacing(1),
    textAlign: "center"
  },
  expandTopBtn: {
    margin: "0 auto"
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
  },
  title: {
    lineHeight: "1.25rem",
    fontSize: "1.25rem",
    margin: theme.spacing(0.75, 0)
  }
}));

export default function Sidebar(props) {
  const classes = useStyles();

  const { rootState } = useContext(RootContext);

  const date = new Date();

  const [topExpanded, setTopExpanded] = React.useState(false);

  return (
    <>
      <Grid container spacing={2} justify="flex-end">
        {!props.hideWeeklyChallenge && <Grid item xs={12} sm={11}>
          <Box pb={2}>
            <Typography variant="h6" className={classes.title}>Provocarea săptămânii</Typography>
          </Box>
          {rootState.weeklyChallengeTotal > -1? <Paper className="cool-sha">
            <Box>
              <WeeklyChallenge
                challenge = {rootState.weeklyChallenge}
                challengeTotal = {rootState.weeklyChallengeTotal}
                challengeSolved = {rootState.weeklyChallengeSolved}
              />
            </Box>
          </Paper> : <>
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
          }
        </Grid>}
        <Grid item xs={12} sm={11}>
          <Box pb={2}>
            <Typography variant="h6" className={classes.title}>Top contributori</Typography>
          </Box>
          {rootState.home.stats && rootState.home.stats.top_users.length > 0 ? (
            <List className={`${classes.topList} ${topExpanded? "_e" : "_ne"} cool-sha`} dense>
              {rootState.home.stats.top_users.map(function (item, index) {
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
                      <ListItemText>
                        @{item.username}{' '}
                        <Typography
                          component="span"
                          variant="body2"
                          color="secondary"
                          fontWeight={600}
                        >
                          #{index + 1} 
                        </Typography>
                        <UserBadges size="small" badges={item.badges} points={item.points} />
                      </ListItemText>
                    </ListItem>
                  </Link>
                );
              })}
              {!topExpanded && <Box 
                className={classes.expandTopWrapper} display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Button 
                  className={classes.expandTopBtn}
                  variant="contained"
                  color="primary"
                  size="small"
                  disableElevation
                  onClick={() => setTopExpanded(true)}
                >
                  Vezi mai mult
                </Button>
              </Box>}
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
          <iframe 
              className="cool-sha"
              src="https://discord.com/widget?id=862041051089600542&theme=dark" 
              width="100%" 
              height="350" 
              allowtransparency="true" 
              frameborder="0" 
              sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
            >
            </iframe>
        </Grid>}
        <Grid item xs={12} sm={11}>
          <Box className={classes.hideOnMobile}>
            <Typography ariant="body2" className={classes.menuList} style={{display: "none"}}>
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
