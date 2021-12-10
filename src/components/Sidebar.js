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
import AdSense from "react-adsense";
import { DelayedRenderer } from "react-delayed-renderer"
import Credits from "./Credits"
import AvatarGroup from '@material-ui/lab/AvatarGroup';

const useStyles = makeStyles((theme) => ({
  icon: {
    background: theme.palette.secondary.main,
    color: fade(theme.palette.common.white, 0.9),
  },
  topList: {
    background: theme.palette.background.paper,
    borderRadius: "3px",
    padding: 0,
    height: "300px",
    overflowY: "hidden",
    position: "relative",
    "&._e": {
      overflowY: "scroll",
      position: "static"
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
  donateBtn: {
    background: "#FD434D",
    color: "white"
  },
  title: {
    lineHeight: "1.25rem",
    fontSize: "1.25rem",
    margin: theme.spacing(0.75, 0),
    fontWeight: 600,
  }
}));

export default function Sidebar(props) {
  const classes = useStyles();

  const { rootState } = useContext(RootContext);

  const date = new Date();

  const [topExpanded, setTopExpanded] = React.useState(false);
  const [latestProblemsExpanded, setLatestProblemsExpanded] = React.useState(false);

  return (
    <>
      <Grid container spacing={2} justify="flex-end">
        {!props.hideWeeklyChallenge && <Grid item xs={12} sm={11}>
          <Box pb={2}>
            <Link to="/provocare-saptamanala" color="primary">
              <Typography variant="h6" className={classes.title}>Provocarea săptămânii</Typography>
            </Link>
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
                        <b>@{item.username}{' '}</b>
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
        {rootState.staff.length > 0 && <>
          <Grid item xs={12} sm={11}>
            <Box pb={2}>
              <Link to="/despre-contact">
                <Typography variant="h6" className={classes.title}>Membrii staffului</Typography>
              </Link>
            </Box>
            <Box mb={2}>
              <AvatarGroup max={5}>
                {rootState.staff.map((staff, key) => {
                  return <Avatar key={key} alt={`${staff.first_name} ${staff.last_name}`} src={staff.profile_img} />
                })}
              </AvatarGroup>
            </Box>
          </Grid>
        </>}
        {rootState.showDiscord && <Grid item xs={12} sm={11}>
          <DelayedRenderer delay={300}>
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
          </DelayedRenderer>
        </Grid>}
        {props.showAd && rootState.showAds && false && <Grid item xs={12} sm={11}>
          <AdSense.Google
            client='ca-pub-9101356904433905'
            slot='2987546523'
          />
        </Grid>}
        <Grid item xs={12} sm={11} style={{display: "none"}}>
          <Box pb={2}>
            <Typography variant="h6" className={classes.title}>Probleme recomandate</Typography>
          </Box>
          {rootState.home.stats && rootState.home.stats.latest_problems.length > 0 ? (
            <List className={`${classes.topList} ${latestProblemsExpanded? "_e" : "_ne"} cool-sha dense`} dense>
              {rootState.home.stats.latest_problems.map(function (item, index) {
                return (
                  <Link to={`/problema/${item.name}?utm_source=recommended`} key={index}>
                    <ListItem button className={`${classes.topListItem}`}
                      style={{
                        paddingTop: index == 0? "0.75rem" : "0.25rem",
                        paddingBottom: index == rootState.home.stats.latest_problems.length - 1? "0.75rem" : "0.25rem"
                      }}
                    >
                      <ListItemText>
                        <b>{item.name}{' '}</b>
                        <Typography
                          component="span"
                          variant="body2"
                          color="secondary"
                          fontWeight={600}
                        >
                          #{item.id} 
                        </Typography>
                      </ListItemText>
                    </ListItem>
                  </Link>
                );
              })}
              {!latestProblemsExpanded && <Box 
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
                  onClick={() => setLatestProblemsExpanded(true)}
                >
                  Vezi mai mult
                </Button>
              </Box>}
            </List>
          ) : (
            <>
              {}
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
            <Box pb={1}>
              <Credits align="center" />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={11} className={`${rootState.showPersonalAd && classes.hideOnMobile}`}>
          <InstaFollow />
        </Grid>
      </Grid>
    </>
  );
}
