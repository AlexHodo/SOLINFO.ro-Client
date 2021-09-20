import React, { useContext, useEffect } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import HomeIcon from "@material-ui/icons/Home";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import CustomRating from "./../components/CustomRating";
import Avatar from "@material-ui/core/Avatar";
import AddCircleTwoToneIcon from "@material-ui/icons/AddCircleTwoTone";
import PermIdentityTwoToneIcon from "@material-ui/icons/PermIdentityTwoTone";
import VisibilityTwoToneIcon from "@material-ui/icons/VisibilityTwoTone";
import ForwardTwoToneIcon from "@material-ui/icons/ForwardTwoTone";
import MetaTags from "react-meta-tags";
import { Link, useParams, useLocation } from "react-router-dom";
import { RootContext } from "./../contexts/Context";
import NotFound from "./../components/NotFound";
import UserBadges from "./../components/UserBadges";
import ThumbUpTwoToneIcon from '@material-ui/icons/ThumbUpTwoTone';
import {
  TransitionGroup,
  CSSTransition
} from "react-transition-group";
import PageSkeleton from "./../components/PageSkeleton";
import LanguageTag from "../components/LanguageTag";

import Ad from "../components/Ad"

import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
import c from 'react-syntax-highlighter/dist/esm/languages/hljs/c';
import php from 'react-syntax-highlighter/dist/esm/languages/hljs/php';
import pascal from 'react-syntax-highlighter/dist/esm/languages/hljs/delphi';
import java from 'react-syntax-highlighter/dist/esm/languages/hljs/java';
import python from 'react-syntax-highlighter/dist/esm/languages/hljs/python';
import nightOwl from 'react-syntax-highlighter/dist/esm/styles/hljs/night-owl';

const useStyles = makeStyles((theme) => ({
  placeholder: {
    margin: theme.spacing(6, 0),
    textAlign: "center",
  },
  errorImg: {
    width: "55%",
    [theme.breakpoints.up("md")]: {
      width: "35%",
    },
  },
  header: {
    margin: theme.spacing(3, 0, 0, 0),
    textAlign: "left",
  },
  divider: {
    margin: theme.spacing(3, 0),
  },
  profileImage: {
    width: "125px",
    height: "125px",
    border: "5px solid white",
    margin: "25px 0",
  },
  profileHeaderCover: {
    height: "250px",
    backgroundPosition: "center center",
    backgroundSize: "cover",
  },
  profileHeaderContent: {
    marginTop: "-55px",
  },
  profileHeaderUsername: {
    color: fade(theme.palette.common.white, 0.8),
    "& span": {
      backgroundColor: fade(theme.palette.common.black, 0.5),
      backdropFilter: "saturate(5) blur(5px)",
      display: "inline-block",
      padding: theme.spacing(0.5, 2),
      borderRadius: "2rem",
    },
    position: "absolute",
    bottom: 0,
  },
  profileHeaderName: {
    color: theme.palette.secondary,
    fontWeight: 500,
    fontSize: "1.25rem",
    lineHeight: "1.25rem",
    marginTop: theme.spacing(2.5),
  },
  profileHeaderContentUpperWrapper: {
    height: "100px",
    position: "relative",
    marginBottom: theme.spacing(2),
  },
  profileHeaderContentLowerWrapper: {
    height: "100px",
    marginTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },
  statWrapper: {
    "& *": {
      textAlign: "right",
    },
    background: fade(theme.palette.common.white, 0.95),
    padding: theme.spacing(1.5, 4, 1.5, 1),
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1, 3.5),
    },
    "&:hover": {
      transform: "scale(1.025)",
    },
    transition: "all .2s ease-in-out",
    borderRadius: "100px"
  },
  statTitle: {
    textTransform: "uppercase",
    fontWeight: 300,
    fontSize: "0.9rem",
    width: "70%",
    marginLeft: "30%",
    textAlign: "right",
    lineHeight: 1.25
  },
  statContent: {
    fontSize: "1.35rem",
    color: theme.palette.primary.main,
    fontWeight: "800 !important"
  },
  statIcon: {
    position: "absolute",
    fontSize: "3.5rem",
    left: "1.5rem",
    top: "50%",
    transform: "translateY(-50%)",
    color: fade(theme.palette.primary.main, 0.75),
    [theme.breakpoints.down("sm")]: {
      fontSize: "2.5rem",
    },
  },
  hideOnMobile: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  previewCardRoot: {
    padding: theme.spacing(2),
    paddingBottom: `${theme.spacing(1)}px !important`,
  },
  previewCardButton: {
    margin: theme.spacing(1, 0),
    "& span.views": {
      padding: theme.spacing(0, 1),
      backgroundColor: fade(theme.palette.common.black, 0.25),
      margin: theme.spacing(0, 0, 0, 1),
      borderRadius: "1rem",
    },
  },
  previewCardTitle: {
    lineHeight: "1.25rem",
    fontWeight: 600
  },
  profileStatsWrapper: {
    marginTop: theme.spacing(1)
  }
}));

export default function Profil() {
  let { username } = useParams();

  const { API, rootState, langToHljsLang } = useContext(RootContext);

  const defaultState = {
    dataLoaded: false,
    success: null,
    errorMsg: null,
    responseCode: null,
    profile: {},
    latest_solutions: [],
    badges: [],
    points: 0
  };

  const [state, setState] = React.useState(defaultState);

  const classes = useStyles();

  useEffect(() => {

    async function logon() {

      await API("endpoint/page/profil.php", {
        username: username ? username : rootState.userInfo.username,
      }).then((logonResponse) => {
        setState({
          ...state,
          dataLoaded: true,
          success: logonResponse.success,
          errorMsg: logonResponse.errorMsg,
          responseCode: logonResponse.responseCode,
          profile: logonResponse.profile,
          latest_solutions: logonResponse.latest_solutions,
          badges: logonResponse.badges,
          points: logonResponse.points
        });
      });

    }

    logon();

  }, []);

  let location = useLocation()

  return (
    <>
    {!state.dataLoaded && <PageSkeleton type="profile" />}
    {state.dataLoaded && !state.success && <NotFound />}   
    {state.dataLoaded && state.success && (
        <>
          <MetaTags>
            <title>
              Profilul utilizatorului{" "}
              {username ? username : rootState.userInfo.username} | SOLINFO.ro
            </title>
          </MetaTags>  
          <>
            <div className={classes.profileHeader}>
              <Grid container>
                <Grid
                  item
                  xs={12}
                  className={classes.profileHeaderCover}
                  style={{
                    backgroundImage: `url(${rootState.fileDomain}${state.profile.cover_img})`,
                  }}
                />{" "}
                <Grid item xs={12} className={classes.profileHeaderContent}>
                  <Grid item xs={12} className={classes.profileHeaderContent}>
                    <Container maxWidth="md">
                      <Grid container alignItems="center">
                        <Grid item style={{ width: "150px" }}>
                          <Avatar
                            alt={`${state.profile.first_name} ${state.profile.last_name}`}
                            src={state.profile.profile_img}
                            className={`${classes.profileImage} cool-sha`}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <div
                            className={classes.profileHeaderContentUpperWrapper}
                          >
                            <Typography
                              className={classes.profileHeaderUsername}
                              variant="h5"
                            >
                              <span>@{state.profile.username}</span>
                            </Typography>
                          </div>
                          <div
                            className={classes.profileHeaderContentLowerWrapper}
                          >
                            <Typography
                              className={classes.profileHeaderName}
                              variant="h6"
                            >
                              {state.profile.first_name}{' '}{state.profile.last_name}
                              {state.profile.is_owner && (
                                <Typography component="span">
                                  {' - '}
                                  <Link to="/cont/setari">
                                    editare
                                  </Link>
                                </Typography>
                              )}
                            </Typography>
                            <Box pt={1}>
                              <UserBadges size="small" points={state.profile.points} badges={state.profile.badges}/>
                            </Box>
                          </div>
                        </Grid>
                      </Grid>
                    </Container>
                  </Grid>
                </Grid>
              </Grid>
              <Container maxWidth="md">
                <Grid item xs={12} className={classes.profileStatsWrapper}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={3}>
                      <Paper className={`${classes.statWrapper} cool-sha`}>
                        <Typography className={classes.statTitle} variant="body1">
                          Puncte obținute
                        </Typography>
                        <Typography className={classes.statContent} variant="h6">
                          {state.profile.points}
                        </Typography>
                        <PermIdentityTwoToneIcon className={classes.statIcon} />
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Paper className={`${classes.statWrapper} cool-sha`}>
                        <Typography className={classes.statTitle} variant="body1">
                          Soluții adăugate
                        </Typography>
                        <Typography className={classes.statContent} variant="h6">
                          {state.profile.solutions_count}
                        </Typography>
                        <AddCircleTwoToneIcon className={classes.statIcon} />
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Paper className={`${classes.statWrapper} cool-sha`}>
                        <Typography className={classes.statTitle} variant="body1">
                          Provocări îndeplinite
                        </Typography>
                        <Typography className={classes.statContent} variant="h6">
                          {state.profile.challenges_count}
                        </Typography>
                        <ThumbUpTwoToneIcon className={classes.statIcon} />
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Paper className={`${classes.statWrapper} cool-sha`}>
                        <Typography className={classes.statTitle} variant="body1">
                          Soluții vizualizate
                        </Typography>
                        <Typography className={classes.statContent} variant="h6">
                          {state.profile.viewed_count}
                        </Typography>
                        <VisibilityTwoToneIcon className={classes.statIcon} />
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
              </Container>
            </div>
            <Container maxWidth="md">
              <div className={classes.profileContent}>
                <Grid container>
                  {state.latest_solutions.length === 0 ? (
                    <>
                      <Grid item xs={12}>
                        <Box pt={5} pb={2}>
                          <Typography variant="h5">
                            Ultimele soluții adăugate
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Paper className={`${classes.card} cool-sha`}>
                          <div className={classes.cardInner}>
                            <Box mt={2} mb={2} p={2}>
                              <Typography variant="body1" align="center">
                                Acest utilizator nu a adăugat încă nicio soluție.
                              </Typography>
                            </Box>
                          </div>
                        </Paper>
                      </Grid>
                    </>
                  ) : (
                    <>
                      <Grid item xs={12}>
                        <Box pt={5} pb={2}>
                          <Typography variant="h5">
                            Ultimele soluții adăugate
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={2}>
                          {state.latest_solutions.map(function (item, index) {
                            return (
                              <Grid item xs={12} key={index}>
                                {index == 1 && <> {/* after the first item */}
                                  <Box px={2}>
                                    <Ad 
                                      marginBottom
                                      data-ad-slot="1035815388"
                                      data-ad-format="auto"
                                      data-full-width-responsive="true"
                                    />
                                  </Box>
                                </>}
                                <Card
                                  className={`${classes.previewCard} cool-sha`}
                                >
                                  <CardContent
                                    className={classes.previewCardRoot}
                                  >
                                    <Grid
                                      container
                                      justify="center"
                                      alignItems="center"
                                      style={{ marginBottom: "1rem" }}
                                    >
                                      <Grid item xs={6}>
                                        <Link to={`/problema/${item.name}`}>
                                          <Typography
                                            className={classes.previewCardTitle}
                                            variant="h6"
                                            component="h2"
                                          >
                                            sol-{item.id} &#8226; {item.name} #
                                            {item.pbinfo_id}
                                          </Typography>
                                        </Link>
                                      </Grid>
                                      <Box component={Grid} item xs={6}>
                                        <Typography
                                          variant="body2"
                                          style={{
                                            textAlign: "right",
                                            opacity: 0.8,
                                          }}
                                        >
                                          {item.created}
                                        </Typography>
                                      </Box>
                                    </Grid>
                                    <SyntaxHighlighter
                                      style={nightOwl}
                                      language={langToHljsLang(item.language)}
                                      className="cool-sha-2 code-wrap"
                                      showLineNumbers
                                    >
                                      {item.content}
                                    </SyntaxHighlighter>
                                    <Grid
                                      container
                                      alignItems="center"
                                      justify="center"
                                    >
                                      <Grid item xs={7}>
                                        <Link to={`/problema/${item.name}`}>
                                          <Button
                                            className={classes.previewCardButton}
                                            variant="contained"
                                            disableElevation
                                            color="primary"
                                          >
                                            Vezi <Box className={classes.hideOnMobile} ml={0.5} component="span">soluția</Box>{" "}
                                            <span className="views">
                                              {item.views}
                                            </span>
                                          </Button>
                                        </Link>
                                        <span>
                                          <LanguageTag language={item.language? item.language : null} />
                                        </span>
                                      </Grid>
                                      <Grid item xs={5}>
                                        <Box className={classes.ratingWrapper}>
                                          <CustomRating
                                            align="right"
                                            solutionId={item.id}
                                            defaultValue={item.rating}
                                            ratingCount={item.rating_count}
                                            readOnly
                                          />
                                        </Box>
                                      </Grid>
                                    </Grid>
                                  </CardContent>
                                </Card>
                              </Grid>
                            );
                          })}
                        </Grid>
                      </Grid>
                    </>
                  )}
                </Grid>
              </div>
            </Container>
          </>

        </>
      )}
    </>
  );
}
