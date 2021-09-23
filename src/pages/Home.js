import React, { useContext, useState } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { RootContext } from "./../contexts/Context";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import Skeleton from "@material-ui/lab/Skeleton";
import CustomRating from "./../components/CustomRating";
import ForwardTwoToneIcon from "@material-ui/icons/ForwardTwoTone";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { useHistory } from "react-router-dom";
import PeopleAltTwoToneIcon from "@material-ui/icons/PeopleAltTwoTone";
import LibraryAddCheckTwoToneIcon from "@material-ui/icons/LibraryAddCheckTwoTone";
import VisibilityTwoToneIcon from "@material-ui/icons/VisibilityTwoTone";
import StarTwoToneIcon from "@material-ui/icons/StarTwoTone";
import Sidebar from "./../components/Sidebar";
import MetaTags from "react-meta-tags";
import CssBaseline from "@material-ui/core/CssBaseline";
import HelpUs from "./../components/HelpUs";
import LanguageTag from "../components/LanguageTag";

import Ad from "../components/Ad";

import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
import c from 'react-syntax-highlighter/dist/esm/languages/hljs/c';
import php from 'react-syntax-highlighter/dist/esm/languages/hljs/php';
import pascal from 'react-syntax-highlighter/dist/esm/languages/hljs/delphi';
import java from 'react-syntax-highlighter/dist/esm/languages/hljs/java';
import python from 'react-syntax-highlighter/dist/esm/languages/hljs/python';
import nightOwl from 'react-syntax-highlighter/dist/esm/styles/hljs/night-owl';
import { DelayedRenderer } from "react-delayed-renderer"

import heroBg from "../media/hero-bg.svg";

SyntaxHighlighter.registerLanguage('c', c);

const useStyles = makeStyles((theme) => ({
  hero: {
    // backgroundColor: fade(theme.palette.primary.main, 1),
    textAlign: "left",
    backgroundColor: theme.palette.primary.main,
    backgroundImage: `url(${heroBg})`
  },
  heroGrid: {
    marginTop: 0,
    padding: theme.spacing(8, 0),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(12, 0),
    },
  },
  heroTextField: {
    margin: theme.spacing(2, 0),
    background: "rgba(255,255,255,0.95)",
    width: "100%",
    borderRadius: "2rem",
    border: "none !important",
    // boxShadow: theme.shadows[2],
    "& ::before": {
      display: "none",
    },
    "& ::after": {
      display: "none",
    },
    "& *:not(input)": {
      backgroundColor: "transparent !important",
    },
    "& *:not(input):hover": {
      backgroundColor: "transparent",
    },
    "& *:not(input):focus": {
      backgroundColor: "transparent",
    },
    "& *:not(input):active": {
      backgroundColor: "transparent",
    },
    "& input": {
      paddingLeft: "1.5rem",
      paddingRight: "1.5rem",
    },
    "& label": {
      paddingLeft: "1rem",
    },
  },
  heroTextFieldRoot: {
    "& > div": {
      paddingLeft: "1.25rem !important",
    },
  },
  heroTextFieldInput: {
    paddingLeft: "1.5rem",
  },
  heroLogo: {
    color: fade(theme.palette.common.white, 1),
    fontWeight: "800 !important",
    textAlign: "left",
    "& span": {
      display: "inline-block",
      background: theme.palette.primary.main,
      padding: theme.spacing(0, 3),
      [theme.breakpoints.down("sm")]: {
        fontSize: "1.85rem",
        textAlign: "center"
      },
    },
    [theme.breakpoints.down("sm")]: {
      textAlign: "center"
    },
    marginBottom: theme.spacing(2),
    fontSize: "2.25rem",
  },
  heroTitle: {
    color: fade(theme.palette.common.white, 0.95),
    fontWeight: 800,
    textAlign: "left",
    fontSize: "1.65rem",
    lineHeight: 1,
    marginTop: theme.spacing(-1),
    "& span": {
      display: "inline-block",
      background: theme.palette.primary.main,
      padding: theme.spacing(0, 3),
      [theme.breakpoints.down("sm")]: {
        fontSize: "1.5rem",
        textAlign: "center"
      },
    },
    [theme.breakpoints.down("sm")]: {
      textAlign: "center"
    },
  },
  heroTitleLarge: {
    [theme.breakpoints.down("sm")]: {
      display: "none !important",
    },
  },
  heroTitleSmall: {
    [theme.breakpoints.up("md")]: {
      display: "none !important",
    },
  },
  moreBtn: {
    borderRadius: "50px",
  },
  content: {
    margin: theme.spacing(3, 0),
    "& *": {
      // textAlign: "left",
    },
  },
  previewCard: {
    boxShadow: theme.shadows[0.5],
  },
  previewCardRoot: {
    padding: theme.spacing(2),
    paddingBottom: `${theme.spacing(1)}px !important`,
  },
  previewCardButton: {
    margin: theme.spacing(1, 0),
    lineHeight: "1rem",
    "& span.views": {
      padding: theme.spacing(0.5, 1),
      backgroundColor: fade(theme.palette.common.black, 0.25),
      margin: theme.spacing(0, 0, 0, 1),
      borderRadius: "1rem",
    },
  },
  hideOnMobile: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  statsWrapperMiddle: {

  },
  statsWrapperOuter: {
    minHeight: "150px",
    [theme.breakpoints.up("md")]: {
      "& $statsWrapperMiddle:nth-child(1)": {
        // transform: 'translateX(0.75rem)'
      },
      "& $statsWrapperMiddle:nth-child(2)": {
        // transform: 'translateX(0.75rem)'
      },
      "& $statsWrapperMiddle:nth-child(3)": {
        transform: 'translateX(-1.5rem)'
      },
      "& $statsWrapperMiddle:nth-child(4)": {
        transform: 'translateX(-1.5rem)'
      }
    }
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
    borderRadius: "100px",
  },
  statTitle: {
    textTransform: "uppercase",
    fontWeight: 400,
    fontSize: "0.9rem",
    width: "60%",
    marginLeft: "40%",
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
    fontSize: "4rem",
    left: "1.5rem",
    top: "50%",
    transform: "translateY(-50%)",
    color: fade(theme.palette.primary.main, 0.75),
    [theme.breakpoints.down("sm")]: {
      fontSize: "3rem",
    },
  },
  heroSearchEndAdornment: {
    display: "none !important",
  },
  previewCardTitle: {
    lineHeight: "1.25rem",
    fontWeight: 600
  },
  hideOnDesktop: {
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  }
}));

const defaultFilterOptions = createFilterOptions();

const OPTIONS_LIMIT = 25;

const filterOptions = (options, state) => {
  if (state.inputValue === "") {
    return [];
  }
  return defaultFilterOptions(options, state).slice(0, OPTIONS_LIMIT);
};

export default function Home() {
  const { API, rootState, getProblems, langToHljsLang } = useContext(RootContext);

  const state = {
    data_loaded: rootState.homeDataLoaded,
    data_loading: false,
    //hero: rootState.home.hero,
    hero: {
      wallpaper_url: "https://solinfo.ro/file/wallpaper/wallpaper.jpg",
      wallpaper_author_name: "AltumCode",
      wallpaper_author_url: "https://unsplash.com/@altumcode",
    },
    latest_solutions: rootState.home.latest_solutions,
    stats: rootState.home.stats,
  };

  const classes = useStyles();

  const [searchInputValue, setSearchInputValue] = useState("");

  let history = useHistory();

  return (
    <>
      <MetaTags>
        <title>
          SOLINFO.ro | Soluții pentru problemele de pe PbInfo cu explicații
        </title>
      </MetaTags>
      <div
        className={classes.hero}
        
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center" style={{justifyContent: 'space-between'}}>
            <Grid item xs={12} sm={6}>
              <Grid container spacing={3} className={classes.heroGrid}>
                <Grid item xs={12}>
                  <Typography
                    className={classes.heroLogo}
                    variant="h4"
                    component="h1"
                  >
                    <span>SOLINFO.ro</span>
                  </Typography>
                  <Typography
                    className={classes.heroTitle}
                    variant="h5"
                    component="h2"
                  >
                    <span className={classes.heroTitleLarge}>
                      Soluții pentru problemele de pe PbInfo.ro cu explicații
                    </span>
                    <span className={classes.heroTitleSmall}>
                      Soluții pentru problemele de pe PbInfo.ro
                    </span>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Autocomplete
                    filterOptions={filterOptions}
                    options={rootState.problems}
                    getOptionLabel={(option) =>
                      option.name + " (ID " + option.id + ")"
                    }
                    fullWidth
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        className={`${classes.heroTextField} cool-sha`}
                        label="Caută după nume sau ID..."
                        variant="filled"
                        classes={{ root: classes.heroTextFieldRoot }}
                      />
                    )}
                    onChange={(event: any, option: any) => {
                      setSearchInputValue("");
                      history.push("/problema/" + option.name + "&utm_source=search");
                    }}
                    inputValue={searchInputValue}
                    onInputChange={(event) =>
                      event && setSearchInputValue(event.target.value)
                    }
                    open={searchInputValue.length > 0}
                    classes={{ endAdornment: classes.heroSearchEndAdornment }}
                    noOptionsText={
                      !rootState.problemsDataLoaded
                        ? "Se caută..."
                        : "Niciun rezultat"
                    }
                    onFocus={getProblems}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <center>
                      <Link to="/despre-contact">
                        <Button
                          variant="contained"
                          color="secondary"
                          size="large"
                          disableElevation
                          className={classes.moreBtn}
                        >
                          Mai multe despre proiect
                        </Button>
                      </Link>
                    </center>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6} md={5}>
              <Grid container spacing={2} className={classes.statsWrapperOuter}>
                <Grid item xs={12} md={6} className={classes.statsWrapperMiddle}>
                  <Paper className={`${classes.statWrapper} cool-sha`}>
                    <Typography className={classes.statTitle} variant="body1">
                      Utilizatori înscriși
                    </Typography>
                    <Typography className={classes.statContent} variant="h6">
                      {state.stats.users_count}
                    </Typography>
                    <PeopleAltTwoToneIcon className={classes.statIcon} />
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6} className={classes.statsWrapperMiddle}>
                  <Paper className={`${classes.statWrapper} cool-sha`}>
                    <Typography className={classes.statTitle} variant="body1">
                      Soluții disponibile
                    </Typography>
                    <Typography className={classes.statContent} variant="h6">
                      {state.stats.solutions_count}
                    </Typography>
                    <LibraryAddCheckTwoToneIcon className={classes.statIcon} />
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6} className={classes.statsWrapperMiddle}>
                  <Paper className={`${classes.statWrapper} cool-sha`}>
                    <Typography className={classes.statTitle} variant="body1">
                      Vizualizări soluții
                    </Typography>
                    <Typography className={classes.statContent} variant="h6">
                      {state.stats.views_count}
                    </Typography>
                    <VisibilityTwoToneIcon className={classes.statIcon} />
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6} className={classes.statsWrapperMiddle}>
                  <Paper className={`${classes.statWrapper} cool-sha`}>
                    <Typography className={classes.statTitle} variant="body1">
                      Note de cinci stele
                    </Typography>
                    <Typography className={classes.statContent} variant="h6">
                      {state.stats.rating_5_count}
                    </Typography>
                    <StarTwoToneIcon className={classes.statIcon} />
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          
        </Container>
      </div>
      <DelayedRenderer delay={200}>
        <Container maxWidth="md">
        <Grid container className={classes.content}>
          <Grid item xs={12} sm={8} md={9}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box pt={3}>
                  <Typography variant="h5" style={{fontWeight: 600}}>
                    Ultimele soluții adăugate
                  </Typography>
                </Box>
              </Grid>
              {!state.data_loaded && (
                <Grid item xs={12}>
                  <Skeleton
                    variant="rect"
                    height={30}
                    style={{ marginBottom: "0.5rem" }}
                  />
                  <Skeleton
                    variant="rect"
                    height={15}
                    style={{ marginBottom: "0.5rem" }}
                  />
                  <Skeleton variant="rect" height={60} />
                </Grid>
              )}
              {state.latest_solutions &&
                state.latest_solutions.map(function (item, index) {
                  return (
                    <Grid item xs={12} key={index}>
                      {rootState.showAds && (index+1)%4 == 0 && <> {/* before the 4th and 8th  */}
                        <Box px={2} mb={2}>
                          <Ad 
                            marginBottom
                            data-ad-slot="1123445298"
                            data-ad-format="auto"
                            data-full-width-responsive="true"
                          />
                        </Box>
                      </>}
                      <Card className={`${classes.previewCard} cool-sha`}>
                        <CardContent className={classes.previewCardRoot}>
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
                                style={{ textAlign: "right", opacity: 0.8 }}
                              >
                                {item.author.username && (
                                  <>
                                    <Link
                                      to={`/profil/${item.author.username}`}
                                    >
                                      @{item.author.username}
                                    </Link>
                                    {" "}
                                  </>
                                )}
                                <br className={classes.hideOnDesktop}/>
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
                          <Grid container alignItems="center" justify="center">
                            <Grid item xs={7}>
                              <Link to={`/problema/${item.name}`}>
                                <Button
                                  className={classes.previewCardButton}
                                  variant="contained"
                                  disableElevation
                                  color="primary"
                                >
                                  Vezi <Box className={classes.hideOnMobile} ml={0.5} component="span">soluția</Box>{" "}
                                  <span className="views">{item.views}</span>
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
          <Grid item xs={12} sm={4} md={3}>
            <Box pt={3}>
              <Sidebar showAd />
            </Box>
          </Grid>
        </Grid>
        </Container>
      </DelayedRenderer>
    </>
  );
}
