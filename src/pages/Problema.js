import React, { useContext, Suspense } from "react";
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
import Chip from "@material-ui/core/Chip";
import HomeIcon from "@material-ui/icons/Home";
import LaunchIcon from "@material-ui/icons/Launch";
import Box from "@material-ui/core/Box";
import { Link, useParams, useLocation } from "react-router-dom";
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
import nightOwl from 'react-syntax-highlighter/dist/esm/styles/hljs/night-owl';
import HelpUs from "./../components/HelpUs";
import UserBadges from "./../components/UserBadges";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import IconButton from '@material-ui/core/IconButton';
import AddCircleTwoToneIcon from "@material-ui/icons/AddCircleTwoTone";
import {
  TransitionGroup,
  CSSTransition
} from "react-transition-group";
import PageSkeleton from "./../components/PageSkeleton";
import LanguageTag from "../components/LanguageTag";
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import SortIcon from '@material-ui/icons/Sort';
import CodeIcon from '@material-ui/icons/Code';
import Checkbox from '@material-ui/core/Checkbox';

import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
import c from 'react-syntax-highlighter/dist/esm/languages/hljs/c';
import php from 'react-syntax-highlighter/dist/esm/languages/hljs/php';
import java from 'react-syntax-highlighter/dist/esm/languages/hljs/java';
import python from 'react-syntax-highlighter/dist/esm/languages/hljs/python';
import pascal from 'react-syntax-highlighter/dist/esm/languages/hljs/delphi';

const StatsChart = React.lazy(() => import('./../components/ProblemStats'));

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

const MenuProps = {
  anchorOrigin: { vertical: "bottom", horizontal: "left" },
  // transformOrigin: { vertical: "top", horizontal: "center" },
  getContentAnchorEl: null
};

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
  languageSelectWrapper: {
    width: "100%"
  },
  filterLabel: {
    fontSize: "0.8rem",
    textTransform: "uppercase"
  },
  accordion: {
    // maxHeight: "100px",
    // transition: "max-height 0.25s ease-out",
    "&.h": {
      // maxHeight: 0,
      // overflow: "hidden"
      display: "none"
    },
    "&:not(.h)": {
      borderRadius: "0",
      "&:before": {
        display: "none",
      }
    },
    "&:not(.h) ~ $accordion:not(.h)": {
      "&:before": {
        display: "inherit",
        // borderRadius: "0 !important",
      }
    }
  }
}));

export default function Problema() {
  let { name } = useParams();

  const { API, rootState, setRootState, langToHljsLang } = useContext(RootContext);

  const defaultState = {
    data_loaded: false,
    data_loading: false,
    problem: {},
    solutions: [],
    filteredSolutions: [],
    solutions_count: 0,
    filteredSolutionsCount: 0,
    success: null,
    errorMsg: null,
    responseCode: null,
    expanded: -1,
    expandedArr: [],
    currentlyBeingLoaded: null,
    update: 0,
    rating: {
      value: 0,
      rating: 0,
      count: 0
    }
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
      filteredSolutionsCount: logonRequest.solutions_count,
      solutionsFiltered: logonRequest.solutions,
      responseCode: logonRequest.responseCode,
      rating: logonRequest.rating
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

  };

  let location = useLocation()

  const currentKey = location.pathname.split('/')[1] || '/'

  const availableLanguages = ["cpp", "java", "python", "php", "c", "pascal"]

  const [selectedLanguages, setSelectedLanguages] = React.useState(availableLanguages)

  const handleSelectedLanguagesChange = (event) => {
    
    
    // update state.filteredSolutionsCount
    let filteredCount = 0
    for(let i = 0; i < state.solutions.length; i++) {
      if(event.target.value.indexOf(state.solutions[i].language) > -1) {
        filteredCount += 1
      }
    }

    setSelectedLanguages(event.target.value)

    setState({
      ...state,
      filteredSolutionsCount: filteredCount,
    })

  }

  return (
    <>
    {!state.data_loaded && <PageSkeleton type="problem" />}
    {state.data_loaded && !state.success && <NotFound />}      
    {state.data_loaded && state.success && (
      <Container maxWidth="md">
          <Grid container>
              <>
                <MetaTags>
                  <title>
                    Soluții pentru problema {name} #{state.problem.pbinfo_id} de pe PbInfo | SOLINFO.ro
                  </title>
                  <script type="application/ld+json">
                  {`{"@context": "https://schema.org/","@type": "Product","name": "Soluții pentru problema ${name} #${state.problem.pbinfo_id} de pe PbInfo","aggregateRating": {"@type": "AggregateRating","ratingValue": ${state.rating.rating},"bestRating": 5,"ratingCount": ${state.rating.count}}}`}
                  </script>
                </MetaTags>
                <Grid item xs={12} className={classes.header}>
                  <Grid container justify="center" alignItems="center">
                    <Grid item xs={12} md={9}>
                      <Breadcrumbs aria-label="breadcrumb" style={{fontSize: "0.85rem"}}>
                        <Link color="primary" to="/">
                          Acasă
                        </Link>
                        <Link color="primary" to="/probleme">
                          Probleme
                        </Link>
                        <Typography style={{fontSize: "0.85rem"}} component="span" color="secondary">{state.problem.name}</Typography>
                      </Breadcrumbs>
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
                    <Grid item xs={4} md={5}>
                      <Typography variant="h6" component="h2">
                        Soluții
                        <Link to="/solutie-noua">
                          <IconButton style={{marginLeft: "0.35rem", marginTop: "-0.25rem"}} aria-label="Adauga o solutie noua" color="primary" size="small" 
                            onClick={() => {
                              setRootState({
                                ...rootState,
                                newSolutionIntention: state.problem.pbinfo_id,
                                newSolutionIntentionName: state.problem.name,
                              })
                            }}
                          >
                            <AddCircleTwoToneIcon />
                          </IconButton>
                        </Link>
                      </Typography>
                    </Grid>
                    <Grid item xs={8} md={7}>
                        <Grid container spacing={1} justifyContent="flex-end" alignItems="flex-end">
                          <Grid item xs={8} md={9}>
                            <InputLabel className={classes.filterLabel}>Limbaje</InputLabel>
                            <FormControl className={classes.languageSelectWrapper}>
                              <Select
                                autoWidth
                                id="language-select"
                                multiple
                                value={selectedLanguages}
                                onChange={handleSelectedLanguagesChange}
                                input={<Input />}
                                MenuProps={MenuProps}
                                renderValue={(selectedLanguages) => (
                                  <>
                                  {selectedLanguages.map((value) => (
                                    <LanguageTag key={value} language={value} size="small" noMargin style={{marginRight: "0.5rem"}} />
                                  ))}
                                  </>
                                )}
                              >
                                {availableLanguages.map((language) => (
                                  <MenuItem key={language} value={language} style={{background: "white", padding: "0 0.5rem 0 0.25rem"}}>
                                    <Checkbox checked={selectedLanguages.indexOf(language) > -1} />
                                    <LanguageTag language={language} noMargin size="small" />
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={4} md={3}>
                            <InputLabel className={classes.filterLabel}>Sortare</InputLabel>
                            <Select
                              value={sortValue}
                              onChange={handleSortChange}
                              style={{width: "100%"}}
                              MenuProps={MenuProps}
                            >
                              <MenuItem value={"views_count"}>vizualizări</MenuItem>
                              <MenuItem value={"rating"}>scor</MenuItem>
                              <MenuItem value={"id"}>dată</MenuItem>
                            </Select>
                          </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <div>
                        {state.solutions_count > 0 && state.filteredSolutionsCount === 0 && (
                          <Paper className={`${classes.card} cool-sha`} style={{margin: 0}}>
                            <div className={classes.cardInner}>
                              <Box mt={2} mb={2}>
                                <Typography variant="body1" align="center">
                                  Nicio soluție nu se potrivește filtrelor. Încearcă să alegi și alte limbaje.
                                </Typography>
                              </Box>
                            </div>
                          </Paper>
                        )}
                        {state.solutions.length === 0 && (
                          <Paper className={`${classes.card} cool-sha`} style={{margin: 0}}>
                            <div className={classes.cardInner}>
                              <Box mt={2} mb={2}>
                                <Typography variant="body1" align="center">
                                  Această problemă nu are încă nicio soluție.{" "}
                                  <br />
                                  <b>
                                    Dacă reușești să o rezolvi, te rugăm să încarci soluția{" "}
                                    <Link 
                                      style={{textDecoration: "underline"}} 
                                      to="/solutie-noua"
                                      onClick={() => {
                                        setRootState({
                                          ...rootState,
                                          newSolutionIntention: state.problem.pbinfo_id,
                                          newSolutionIntentionName: state.problem.name,
                                        })
                                      }}
                                    >
                                      aici
                                    </Link>
                                  </b>.
                                  <br />
                                  Vom fi foarte recunoscători!
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
                              className={`${classes.accordion}${selectedLanguages.indexOf(item.language) == -1? " h" : ""} cool-sha`}
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
                                  <Grid item xs={8} md={5}>
                                    <Typography
                                      className={classes.accordionHeading}
                                    >
                                      sol-{item.id}
                                      <LanguageTag language={item.language? item.language : null} size="small" />
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
                                        <UserBadges style={{display: "inline"}} size="small" points={item.author.points} badges={item.author.badges} />
                                      </Typography>
                                    </div>
                                  </Grid>
                                  <Grid
                                    item
                                    xs={4}
                                    md={3}
                                    className={classes.hiddenOnMobile}
                                    style={{
                                      paddingLeft: "1.1rem"
                                    }}
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
                                      <UserBadges style={{display: "inline"}} size="small" points={item.author.points} badges={item.author.badges} />
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
                                          language={'c'}
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
                                            language={'c'}
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
                                              language={langToHljsLang(state.solutions[index].language)}
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
                    {rootState.showAds && <Grid item xs={12}>
                      <AdSense.Google
                        client='ca-pub-9101356904433905'
                        slot='6294567843'
                      />
                    </Grid>}
                    <Grid item xs={12}>
                      <HelpUs />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        variant="h6"
                        component="h2"
                      >
                        Statistici problemă
                      </Typography>
                      <Paper className={`${classes.card} cool-sha`}>
                        <Box pb={2}>
                          <Suspense fallback={<Box pt={2}><center>Se încarcă...</center></Box>}>
                            <StatsChart problemId={state.problem.pbinfo_id}/>
                          </Suspense>
                        </Box>
                      </Paper>
                    </Grid>
                    {rootState.showAds && <Grid item xs={12}>
                      <AdSense.Google
                        client='ca-pub-9101356904433905'
                        slot='3485884754'
                      />
                    </Grid>}
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
                  <Sidebar showAd />
                </Grid>
              </>
           
          </Grid>
      </Container>
    )};
  </>
  );
}
