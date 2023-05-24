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
import Paper from "@material-ui/core/Paper";
import WeeklyChallenge from "./WeeklyChallenge";
import UserBadges from "./UserBadges";
import Button from "@material-ui/core/Button";
import AdSense from "react-adsense";
import { DelayedRenderer } from "react-delayed-renderer";
import Credits from "./Credits";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import GitHubIcon from "@material-ui/icons/GitHub";
import InstagramIcon from "@material-ui/icons/Instagram";
import DraftsTwoTone from "@material-ui/icons/DraftsTwoTone";
import { Icon, SvgIcon } from "@material-ui/core";

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
      position: "static",
    },
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
    textAlign: "center",
  },
  expandTopBtn: {
    margin: "0 auto",
  },
  topListItem: {
    borderRadius: "3px",
    "&:hover": {
      background: fade(theme.palette.secondary.main, 0),
    },
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
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
    color: "white",
  },
  title: {
    lineHeight: "1.25rem",
    fontSize: "1.25rem",
    margin: theme.spacing(0.75, 0),
    fontWeight: 600,
  },
  socialIconsWrapper: {
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& a": {
      color: theme.palette.secondary.main,
    },
  },
  socialIcon: {
    fontSize: "2rem",
    margin: "0.25rem 0.5rem",
    opacity: 0.5,
    transitionDuration: "0.2s",
    display: "inline-block",
    "&:hover": {
      opacity: 1,
    },
    "&.github": {
      fontSize: "1.75rem",
    },
    "&.discord": {
      paddingTop: "9px",
      width: "30px",
    },
  },
}));

export default function Sidebar(props) {
  const classes = useStyles();

  const { rootState } = useContext(RootContext);

  const date = new Date();

  const [topExpanded, setTopExpanded] = React.useState(false);
  const [latestProblemsExpanded, setLatestProblemsExpanded] =
    React.useState(false);

  return (
    <>
      <Grid container spacing={2} justify="flex-end">
        {!props.hideWeeklyChallenge && (
          <Grid item xs={12} sm={11}>
            <Box pb={2}>
              <Link to="/provocare-saptamanala" color="primary">
                <Typography variant="h6" className={classes.title}>
                  Provocarea săptămânii
                </Typography>
              </Link>
            </Box>
            {rootState.weeklyChallengeTotal > -1 ? (
              <Paper className="cool-sha">
                <Box>
                  <WeeklyChallenge
                    challenge={rootState.weeklyChallenge}
                    challengeTotal={rootState.weeklyChallengeTotal}
                    challengeSolved={rootState.weeklyChallengeSolved}
                  />
                </Box>
              </Paper>
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
        )}
        <Grid item xs={12} sm={11}>
          {rootState.showAds && rootState.affiliate_banner_1 && (
            <Box mb={3}>
              <Box
                dangerouslySetInnerHTML={{
                  __html: rootState.affiliate_banner_1,
                }}
              />
            </Box>
          )}
          <Box pb={2}>
            <Typography variant="h6" className={classes.title}>
              Top contributori
            </Typography>
          </Box>
          {rootState.home.stats && rootState.home.stats.top_users.length > 0 ? (
            <List
              className={`${classes.topList} ${
                topExpanded ? "_e" : "_ne"
              } cool-sha`}
              dense
            >
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
                        <b>@{item.username} </b>
                        <Typography
                          component="span"
                          variant="body2"
                          color="secondary"
                          fontWeight={600}
                        >
                          #{index + 1}
                        </Typography>
                        <UserBadges
                          size="small"
                          badges={item.badges}
                          points={item.points}
                        />
                      </ListItemText>
                    </ListItem>
                  </Link>
                );
              })}
              {!topExpanded && (
                <Box
                  className={classes.expandTopWrapper}
                  display="flex"
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
                </Box>
              )}
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
        {rootState.staff.length > 0 && (
          <>
            <Grid item xs={12} sm={11}>
              <Box pb={1}>
                <Link to="/despre-contact">
                  <Typography variant="h6" className={classes.title}>
                    Membrii staffului
                  </Typography>
                </Link>
              </Box>
              <Box mb={2}>
                <AvatarGroup max={5}>
                  {rootState.staff.map((staff, key) => {
                    return (
                      <Avatar
                        key={key}
                        alt={`${staff.first_name} ${staff.last_name}`}
                        src={staff.profile_img}
                      />
                    );
                  })}
                </AvatarGroup>
              </Box>
            </Grid>
          </>
        )}
        {/*rootState.showDiscord && (
          <Grid item xs={12} sm={11}>
            <DelayedRenderer delay={300}>
              <iframe
                className="cool-sha"
                src="https://discord.com/widget?id=862041051089600542&theme=dark"
                width="100%"
                height="350"
                allowtransparency="true"
                frameborder="0"
                sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
              ></iframe>
            </DelayedRenderer>
          </Grid>
        )*/}
        {props.showAd && rootState.showAds && false && (
          <Grid item xs={12} sm={11}>
            <AdSense.Google
              client="ca-pub-9101356904433905"
              slot="2987546523"
            />
          </Grid>
        )}
        <Grid item xs={12} sm={11} style={{ display: "none" }}>
          <Box pb={2}>
            <Typography variant="h6" className={classes.title}>
              Probleme recomandate
            </Typography>
          </Box>
          {rootState.home.stats &&
          rootState.home.stats.latest_problems.length > 0 ? (
            <List
              className={`${classes.topList} ${
                latestProblemsExpanded ? "_e" : "_ne"
              } cool-sha dense`}
              dense
            >
              {rootState.home.stats.latest_problems.map(function (item, index) {
                return (
                  <Link
                    to={`/problema/${item.name}?utm_source=recommended`}
                    key={index}
                  >
                    <ListItem
                      button
                      className={`${classes.topListItem}`}
                      style={{
                        paddingTop: index == 0 ? "0.75rem" : "0.25rem",
                        paddingBottom:
                          index ==
                          rootState.home.stats.latest_problems.length - 1
                            ? "0.75rem"
                            : "0.25rem",
                      }}
                    >
                      <ListItemText>
                        <b>{item.name} </b>
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
              {!latestProblemsExpanded && (
                <Box
                  className={classes.expandTopWrapper}
                  display="flex"
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
                </Box>
              )}
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
            <Typography
              ariant="body2"
              className={classes.menuList}
              style={{ display: "none" }}
            >
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
        <Grid
          item
          xs={12}
          sm={11}
          className={`${rootState.showPersonalAd && classes.hideOnMobile}`}
        >
          <InstaFollow />
        </Grid>
        <Grid item xs={12} sm={11} className={classes.socialIconsWrapper}>
          <a href="https://discord.gg/7u7YC2PK7w" target="_blank">
            <SvgIcon className={`${classes.socialIcon} discord`}>
              <path d="M 19.460938 1.507812 C 17.953125 0.792969 16.363281 0.285156 14.730469 0 C 14.507812 0.414062 14.304688 0.839844 14.125 1.277344 C 12.382812 1.003906 10.613281 1.003906 8.871094 1.277344 C 8.691406 0.839844 8.488281 0.414062 8.265625 0 C 6.628906 0.289062 5.039062 0.796875 3.527344 1.511719 C 0.535156 6.097656 -0.277344 10.574219 0.128906 14.984375 C 1.882812 16.324219 3.84375 17.34375 5.933594 18 C 6.402344 17.34375 6.816406 16.652344 7.175781 15.925781 C 6.496094 15.664062 5.839844 15.339844 5.21875 14.957031 C 5.382812 14.832031 5.542969 14.707031 5.699219 14.582031 C 9.371094 16.371094 13.628906 16.371094 17.300781 14.582031 C 17.460938 14.714844 17.621094 14.84375 17.78125 14.957031 C 17.15625 15.339844 16.5 15.664062 15.820312 15.925781 C 16.179688 16.652344 16.59375 17.347656 17.0625 18 C 19.152344 17.347656 21.117188 16.328125 22.871094 14.984375 C 23.347656 9.871094 22.058594 5.4375 19.460938 1.507812 Z M 7.6875 12.269531 C 6.558594 12.269531 5.625 11.207031 5.625 9.898438 C 5.625 8.59375 6.527344 7.519531 7.6875 7.519531 C 8.847656 7.519531 9.773438 8.59375 9.753906 9.898438 C 9.734375 11.207031 8.84375 12.269531 7.6875 12.269531 Z M 15.3125 12.269531 C 14.175781 12.269531 13.246094 11.207031 13.246094 9.898438 C 13.246094 8.59375 14.148438 7.519531 15.3125 7.519531 C 16.472656 7.519531 17.394531 8.59375 17.371094 9.898438 C 17.351562 11.207031 16.464844 12.269531 15.3125 12.269531 Z M 15.3125 12.269531 " />
            </SvgIcon>
          </a>
          <a href="https://instagram.com/solinfo.ro" target="_blank">
            <InstagramIcon className={`${classes.socialIcon} instagram`} />
          </a>
          <a
            href="https://github.com/AlexHodo/SOLINFO.ro-Client"
            target="_blank"
          >
            <GitHubIcon className={`${classes.socialIcon} github`} />
          </a>
          <a href="mailto:contact@solinfo.ro" target="_blank">
            <DraftsTwoTone className={`${classes.socialIcon} email`} />
          </a>
        </Grid>
      </Grid>
    </>
  );
}
