import React, { useContext } from "react";
import { fade, makeStyles, withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import MuiAccordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { RootContext } from "./../contexts/Context";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Chip from "@material-ui/core/Chip";
import HomeIcon from "@material-ui/icons/Home";
import LaunchIcon from "@material-ui/icons/Launch";
import Box from "@material-ui/core/Box";
import { Link, useParams } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import Divider from "@material-ui/core/Divider";
import CustomRating from "./../components/CustomRating";
import Alert from "@material-ui/lab/Alert";
import VisibilityTwoToneIcon from "@material-ui/icons/VisibilityTwoTone";
import Sidebar from "./../components/Sidebar";
import MetaTags from "react-meta-tags";
import NotFound from "./../components/NotFound";
import AdSense from "react-adsense";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import SortTwoToneIcon from "@material-ui/icons/SortTwoTone";
import ReactGA from "react-ga";

import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
import c from 'react-syntax-highlighter/dist/esm/languages/hljs/c';
import nightOwl from 'react-syntax-highlighter/dist/esm/styles/hljs/night-owl';

ReactGA.initialize("UA-199814762-1");


const Accordion = withStyles({
  root: {
    //border: '1px solid rgba(0, 0, 0, .125)',
    //boxShadow: 'none',
    "&:not(:last-child)": {
      borderBottom: 0,
    },
  },
  expanded: {},
})(MuiAccordion);

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
  openExternalLarge: {
    textAlign: "right",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  openExternalSmall: {
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  divider: {
    margin: theme.spacing(3, 0),
  },
  card: {
    margin: theme.spacing(1, 0),
  },
  tabContent: {
    padding: theme.spacing(2),
  },
  loadContentPlaceholder: {
    "& code": {
      filter: "blur(3px)",
      overflow: "hidden",      
    }
    
  },
  loadContentWrapper: {
    position: "relative",
    width: "100%",
  },
  loadContentOverlay: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translateX(-50%) translateY(-50%)",
    zIndex: 10,
    textAlign: "center",
    backgroundColor: fade(theme.palette.common.white, 0.9),
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
    minWidth: "220px",
  },
  loadContentPreventCopy: {
    backgroundColor: fade(theme.palette.common.black, 0.25),
    position: "absolute",
    width: "100%",
    height: "calc(100% - 1.25rem)",
    borderRadius: theme.shape.borderRadius,
    left: 0,
    top: "0.5rem",
    zIndex: 5,
  },
  cardInner: {
    padding: theme.spacing(0.25, 2),
  },
  accordionHeading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
    fontWeight: 600,
  },
  accordionSecondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  authorStats: {
    marginLeft: theme.spacing(1),
  },
  hiddenOnMobile: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  shownOnXs: {
    display: "none",
    [theme.breakpoints.down("xs")]: {
      display: "block",
    },
  },
  shownOnSm: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
  infoSectionTitle: {
    fontSize: "1.1rem",
  },
  fixMargin: {
    margin: "12px 0 !important",
  },
}));

export default function Problema() {
  let { name } = useParams();

  const { API } = useContext(RootContext);

  const defaultState = {
    data_loaded: false,
    data_loading: false,
    problem: {},
    solutions: [],
    solutions_count: 0,
    success: null,
    errorMsg: null,
    responseCode: null,
    expanded: -1,
    expandedArr: [],
    currentlyBeingLoaded: null,
    update: 0,
  };

  const [state, setState] = React.useState(defaultState);

  const classes = useStyles();

  const onLoad = async (event) => {
    setState({
      ...state,
      data_loading: true,
    });

    const logonRequest = await API("endpoint/page/problema.php", {
      name: name,
    });

    setState({
      ...state,
      data_loaded: true,
      data_loading: false,
      success: logonRequest.success,
      errorMsg: logonRequest.errorMsg,
      problem: logonRequest.problem,
      solutions: logonRequest.solutions,
      solutions_count: logonRequest.solutions_count,
      responseCode: logonRequest.responseCode,
    });
  };

  if (!state.data_loading && !state.data_loaded) {
    onLoad();
  }

  const handleChange = (panel) => (event, isExpanded) => {
    if (state.expandedArr.includes(panel)) {
      const index = state.expandedArr.indexOf(panel);
      if (index > -1) {
        let tmp = state.expandedArr;
        tmp.splice(index, 1);
        setState({
          ...state,
          expandedArr: tmp,
        });
      }
    } else {
      let tmp = state.expandedArr;
      tmp.push(panel);
      setState({
        ...state,
        expandedArr: tmp,
      });
    }
  };

  const loadSolution = async (solutionId, index) => {
    setState({
      ...state,
      currentlyBeingLoaded: solutionId,
    });

    const request = await API("endpoint/page/problema-solutie.php", {
      solutionId: solutionId,
    });

    setState({
      ...state,
      currentlyBeingLoaded: null,
    });

    ReactGA.event({
      category: "Solution",
      action: "Requested a solution",
      value: request.success,
    });

    if (request.success) {
      let solutions = [...state.solutions];
      let solution = { ...solutions[index] };
      solution.content = request.content;
      solution.content_loaded = true;
      solution.user_rating = request.userRating;
      solutions[index] = solution;
      setState({
        ...state,
        solutions: solutions,
      });
    } else {
      let solutions = [...state.solutions];
      let solution = { ...solutions[index] };
      solution.errorMsg = request.errorMsg;
      solution.content_loaded = true;
      solutions[index] = solution;
      setState({
        ...state,
        solutions: solutions,
      });
    }
  };

  const missingData =
    "<p>Informații indisponibile. Vizitează <a href='https://pbinfo.ro/probleme/" +
    state.problem.pbinfo_id +
    "/" +
    state.problem.name +
    "' target='_blank'>pbinfo.ro</a></p>";

  const placeholderCode =
    '#include <iostream>\n#include <vector>\n#define MAX_SIZE 1000\nusing namespace std;\n\ntemplate<typename K, typename V>\nstruct Pair{\n\tK index;\n\tV value;\n};\n\nint main() {\n\tstd::vector<Pair<short unsigned index, const char*>> data;\n\tdata.reserve(MAX_SIZE);\n\tprintf("%s", "Acesta este un cod exemplu.";\n\tstd::cout << "Totusi, el nu ar trebui sa fie vizibil";\n\t// Trebuie sa incarci solutia pentru a vedea codul corespunzator\n\treturn 0;\n}';

  const [sortValue, setSortValue] = React.useState("id");

  const handleSortChange = async (event) => {
    let newCriterion = event.target.value;
    setSortValue(newCriterion);

    let data = [];

    if (newCriterion == "id")
      data = state.solutions
        .slice()
        .sort((a, b) =>
          parseFloat(a[newCriterion]) > parseFloat(b[newCriterion]) ? 1 : -1
        );
    else
      data = state.solutions
        .slice()
        .sort((a, b) =>
          parseFloat(a[newCriterion]) < parseFloat(b[newCriterion]) ? 1 : -1
        );

    setState({
      ...state,
      solutions: data.slice(),
      update: state.update + 1,
      expandedArr: [],
    });

    console.log(state);
  };

  return (
    <>
      <Container maxWidth="md">
        <Grid container>
          {!state.data_loaded && (
            <Grid item xs={12} className={classes.placeholder}>
              <CircularProgress />
            </Grid>
          )}
          {state.data_loaded && !state.success && (
            <Grid item xs={12} className={classes.placeholder}>
              <NotFound />
            </Grid>
          )}
          {state.data_loaded && state.success && (
            <>
              <MetaTags>
                <title>
                  Soluții pentru problema {name} de pe PbInfo | SOLINFO.ro
                </title>
              </MetaTags>
              <Grid item xs={12} className={classes.header}>
                <Grid container justify="center" alignItems="center">
                  <Grid item xs={12} md={9}>
                    <Typography variant="h5" component="h1">
                      Problema <b>{state.problem.name}</b> #
                      {state.problem.pbinfo_id}
                      <a
                        rel="noreferrer"
                        target="_blank"
                        href={`https://pbinfo.ro/probleme/${state.problem.pbinfo_id}/${state.problem.name}`}
                      >
                        <IconButton
                          color="primary"
                          aria-label="Deschide in PbInfo"
                          className={classes.openExternalSmall}
                        >
                          <LaunchIcon />
                        </IconButton>
                      </a>
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={3}
                    className={classes.openExternalLarge}
                  >
                    <a
                      rel="noreferrer"
                      target="_blank"
                      href={`https://pbinfo.ro/probleme/${state.problem.pbinfo_id}/${state.problem.name}`}
                    >
                      <Button
                        color="primary"
                        variant="contained"
                        disableElevation
                        endIcon={<LaunchIcon />}
                      >
                        Deschide PbInfo
                      </Button>
                    </a>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Divider className={classes.divider} />
              </Grid>
              <Grid item xs={12} sm={8} md={9}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={3}>
                    <Typography variant="h6" component="h2">
                      Soluții
                    </Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography
                      variant="body1"
                      component="h2"
                      style={{ textAlign: "right" }}
                    >
                      <span style={{ paddingRight: "0.5rem" }}>
                        Sortează după
                      </span>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={sortValue}
                        onChange={handleSortChange}
                      >
                        <MenuItem value={"views_count"}>vizualizări</MenuItem>
                        <MenuItem value={"rating"}>scor</MenuItem>
                        <MenuItem value={"id"}>dată</MenuItem>
                      </Select>
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <div>
                      {state.solutions.length === 0 && (
                        <Paper className={`${classes.card} cool-sha`}>
                          <div className={classes.cardInner}>
                            <Box mt={2} mb={2}>
                              <Typography variant="body1" align="center">
                                Această problemă nu are încă nicio soluție.{" "}
                                <br />
                                Poți trimite propria soluție{" "}
                                <Link to="/solutie-noua">aici</Link>.
                              </Typography>
                            </Box>
                          </div>
                        </Paper>
                      )}
                      {state.solutions.map(function (item, index) {
                        return (
                          <Accordion
                            expanded={state.expandedArr.indexOf(item.id) > -1}
                            onChange={handleChange(item.id)}
                            key={index + "~" + state.update}
                            className={`cool-sha`}
                          >
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              classes={{ content: classes.fixMargin }}
                            >
                              <Grid
                                container
                                alignItems="center"
                                justify="center"
                              >
                                <Grid item xs={8} md={4}>
                                  <Typography
                                    className={classes.accordionHeading}
                                  >
                                    sol-{item.id}
                                    <Chip
                                      className={classes.authorStats}
                                      icon={<VisibilityTwoToneIcon />}
                                      variant="outlined"
                                      size="small"
                                      label={item.views_count}
                                    />
                                  </Typography>
                                  <div className={classes.shownOnSm}>
                                    <Typography
                                      className={
                                        classes.accordionSecondaryHeading
                                      }
                                    >
                                      {item.author.username && (
                                        <Link
                                          to={`/profil/${item.author.username}`}
                                        >
                                          @{item.author.username}
                                        </Link>
                                      )}
                                      {item.author.solutionsCount && (
                                        <Chip
                                          style={{ fontWeight: 600 }}
                                          className={classes.authorStats}
                                          variant="outlined"
                                          size="small"
                                          label={item.author.solutionsCount}
                                        />
                                      )}
                                    </Typography>
                                  </div>
                                </Grid>
                                <Grid
                                  item
                                  xs={4}
                                  className={classes.hiddenOnMobile}
                                >
                                  <Typography
                                    className={
                                      classes.accordionSecondaryHeading
                                    }
                                  >
                                    {item.author.username && (
                                      <Link
                                        to={`/profil/${item.author.username}`}
                                      >
                                        @{item.author.username}
                                      </Link>
                                    )}
                                    {item.author.solutionsCount && (
                                      <Chip
                                        style={{ fontWeight: 600 }}
                                        className={classes.authorStats}
                                        variant="outlined"
                                        size="small"
                                        label={item.author.solutionsCount}
                                      />
                                    )}
                                  </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                  <CustomRating
                                    align="right"
                                    solutionId={item.id}
                                    defaultValue={item.rating}
                                    ratingCount={item.rating_count}
                                    readOnly
                                    size="small"
                                    key={index + "~" + state.update}
                                  />
                                </Grid>
                              </Grid>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Grid container>
                                {!state.solutions[index].content_loaded && (
                                  <Grid item xs={12}>
                                    <div className={classes.loadContentWrapper}>
                                      <SyntaxHighlighter
                                        style={nightOwl}
                                        language="c"
                                        className={`${classes.loadContentPlaceholder} code-wrap cool-sha-2`}
                                        showLineNumbers
                                      >
                                        {placeholderCode}
                                      </SyntaxHighlighter>
                                      <div
                                        className={
                                          classes.loadContentPreventCopy
                                        }
                                      />
                                      <div
                                        className={classes.loadContentOverlay}
                                      >
                                        <Typography
                                          variant="body1"
                                          component="v1"
                                        >
                                          Ești sigur că dorești să vezi soluția?
                                        </Typography>
                                        <br />
                                        <br />
                                        <Button
                                          onClick={() =>
                                            loadSolution(item.id, index)
                                          }
                                          color="primary"
                                          variant="contained"
                                          disableElevation
                                          disabled={
                                            state.currentlyBeingLoaded ===
                                            item.id
                                          }
                                        >
                                          {state.currentlyBeingLoaded !==
                                            item.id && <>Da, încarcă soluția</>}
                                          {state.currentlyBeingLoaded ===
                                            item.id && <>Se încarcă...</>}
                                        </Button>
                                      </div>
                                    </div>
                                  </Grid>
                                )}
                                {state.solutions[index].content_loaded &&
                                  state.solutions[index].errorMsg && (
                                    <>
                                      <div
                                        className={classes.loadContentWrapper}
                                      >
                                        <SyntaxHighlighter
                                          style={nightOwl}
                                          language="c"
                                          className={`${classes.loadContentPlaceholder} code-wrap cool-sha-2`}
                                          showLineNumbers
                                        >
                                          {placeholderCode}
                                        </SyntaxHighlighter>
                                        <div
                                          className={
                                            classes.loadContentPreventCopy
                                          }
                                        />
                                        <div
                                          className={classes.loadContentOverlay}
                                        >
                                          <Alert severity="error">
                                            {state.solutions[index].errorMsg}
                                          </Alert>
                                          <br />
                                          <Link to="/cont">
                                            <Button
                                              color="primary"
                                              variant="contained"
                                              disableElevation
                                            >
                                              Autentifică-te
                                            </Button>
                                          </Link>
                                        </div>
                                      </div>
                                    </>
                                  )}
                                {state.solutions[index].content_loaded &&
                                  !state.solutions[index].errorMsg && (
                                    <>
                                      <Grid item xs={12}>
                                        <Box mb={1}>
                                          <SyntaxHighlighter
                                            style={nightOwl}
                                            language="c"
                                            className="cool-sha-2 code-wrap"
                                            showLineNumbers
                                          >
                                            {state.solutions[index].content}
                                          </SyntaxHighlighter>
                                        </Box>
                                      </Grid>
                                      <Grid item xs={12}>
                                        <Box mt={2} mb={1}>
                                          <Typography
                                            variant="subtitle1"
                                            align="center"
                                          >
                                            Nu uita să acorzi o notă soluției!
                                          </Typography>
                                          <CustomRating
                                            align="center"
                                            solutionId={item.id}
                                            defaultValue={item.rating}
                                            ratingCount={item.rating_count}
                                            size="large"
                                            userRating={item.user_rating}
                                          />
                                        </Box>
                                      </Grid>
                                    </>
                                  )}
                              </Grid>
                            </AccordionDetails>
                          </Accordion>
                        );
                      })}
                    </div>
                  </Grid>

                  {state.problem.info.length > 0 && (
                    <Grid item xs={12}>
                      <Typography
                        style={{ marginBottom: "-0.5rem" }}
                        variant="h6"
                        component="h2"
                      >
                        Informații despre problemă
                      </Typography>
                    </Grid>
                  )}
                  {state.problem.info.map(function (item, index) {
                    return (
                      <>
                        {(item.title || item.content) && (
                          <Grid item xs={12}>
                            {item.title && (
                              <Typography
                                className={classes.infoSectionTitle}
                                variant="h6"
                                component="h3"
                              >
                                {item.title}
                              </Typography>
                            )}
                            {item.content && (
                              <Paper className={`${classes.card} cool-sha`}>
                                <div className={classes.cardInner}>
                                  <Typography
                                    variant="body1"
                                    dangerouslySetInnerHTML={{
                                      __html: item.content,
                                    }}
                                  />
                                </div>
                              </Paper>
                            )}
                          </Grid>
                        )}
                      </>
                    );
                  })}
                </Grid>
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <Box pt={3} className={classes.shownOnXs} />
                <Sidebar />
              </Grid>
            </>
          )}
        </Grid>
      </Container>
    </>
  );
}
