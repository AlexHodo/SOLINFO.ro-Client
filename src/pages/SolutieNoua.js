import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { RootContext } from "./../contexts/Context";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import AuthForm from "./../components/AuthForm";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createFilterOptions } from '@material-ui/lab/Autocomplete';
import SendTwoToneIcon from "@material-ui/icons/SendTwoTone";
import InfoTwoTone from "@material-ui/icons/InfoTwoTone";
import Alert from "@material-ui/lab/Alert";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import MetaTags from "react-meta-tags";
import { Link, useParams } from "react-router-dom";
import logo from "../media/logo.svg";

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    //minHeight: "80vh"
  },
  header: {
    margin: theme.spacing(3, 0, 0, 0),
    textAlign: "left",
  },
  placeholder: {
    margin: theme.spacing(6, 0),
    textAlign: "center",
  },
  authFormWrapper: {
    maxWidth: "400px",
    margin: "0 auto",
    marginTop: theme.spacing(3),
  },
}));

const defaultFilterOptions = createFilterOptions();

const OPTIONS_LIMIT = 25;

const filterOptions = (options, state) => {
  if (state.inputValue === "") {
    return [];
  }
  return defaultFilterOptions(options, state).slice(0, OPTIONS_LIMIT);
};

export default function SolutieNoua(props) {
  const { API, rootState, getProblems } = useContext(RootContext);

  const {
    fromExtension
  } = props;

  const {problemId, content} = useParams()

  let defaultState = {};

  if(fromExtension) {
    defaultState = {
      step: 1,
      success: null,
      errorMsg: null,
      responseCode: null,
      content: content? (content == "_"? "" : atob(content)) : "",
      problemId: problemId? problemId : -1,
      isLoading: false,
      isError: false,
      preselected: (content && problemId),
      preselectedId: problemId? problemId : null,
      preselectedName: null,
      language: 'cpp'
    };
  } else {
    defaultState = {
      step: 1,
      success: null,
      errorMsg: null,
      responseCode: null,
      content: "",
      problemId: rootState.newSolutionIntention? rootState.newSolutionIntention : -1,
      isLoading: false,
      isError: false,
      preselected: rootState.newSolutionIntention !== null,
      preselectedId: rootState.newSolutionIntention,
      preselectedName: rootState.newSolutionIntentionName,
      language: 'cpp'
    };
  }

  const [state, setState] = React.useState(defaultState);

  const classes = useStyles();

  const handleChange = (prop) => (event) => {
    setState({
      ...state,
      isError: false,
      [prop]: event.target.value,
    });
  };

  const handleClosePreselection = () => {
    setState({
      ...state,
      preselected: false,
      problemId: -1
    })
  }

  const submit = async (event) => {
    setState({
      ...state,
      isLoading: true,
    });

    const request = await API("endpoint/page/adaugare-solutie.php", {
      content: state.content,
      problemId: state.problemId,
      language: state.language,
      ext: fromExtension? 1:0,
      step: state.step
    }).then((response) => {
      if (!response.success) {
        setState({
          ...state,
          errorMsg: response.errorMsg,
          isError: true,
          step: 1,
          isLoading: false,
        });
      } else {
        setState({
          ...state,
          success: true,
          isError: false,
          step: 2,
          isLoading: false,
        });
      }
    })
  };

  const restart = (event) => {
    setState(defaultState);
  };

  return (
    <>
      <MetaTags>
        <title>Adaug?? o solu??ie nou?? | SOLINFO.ro</title>
      </MetaTags>
      <Container maxWidth="sm" className={classes.pageWrapper} style={{minHeight: "100vh"}}>
        <Grid
          container
          spacing={3}
          //alignItems="center"
          className={classes.formWrapper}

        >
          <Grid item xs={12} className={classes.header}>
            <Grid container justify="center" alignItems="center">
              {fromExtension && <Grid item xs={12} md={9}>
                <Box style={{
                    height: 64
                  }}
                  mb={1}
                >
                  <center>
                    <img src={logo} width={64}/>
                  </center>
                </Box>
              </Grid>}
              <Grid item xs={12} md={9}>
                <Typography variant={fromExtension? 'h6' : 'h5'} component="h1" align="center">
                  Adaug?? o solu??ie nou??{fromExtension? "" : "  pe site"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          {!rootState.authStatusChecked && (
            <Grid item xs={12}>
              <Box>
                <center>
                  <CircularProgress />
                </center>
              </Box>
            </Grid>
          )}
          {rootState.authStatusChecked && !rootState.isLoggedIn && (
            <Grid item xs={12}>
              <Box>
                <Typography align="center">
                  Trebuie s?? te autentifici pentru a putea ad??uga o solu??ie.
                </Typography>
                <Box className={classes.authFormWrapper}>
                  <Paper className="cool-sha">
                    <AuthForm />
                  </Paper>
                </Box>
              </Box>
            </Grid>
          )}
          {rootState.isLoggedIn && state.step === 1 && (
            <>
              <Grid item xs={12}>
                <Paper className="cool-sha">
                  <Box p={2}>
                    {state.isError && (
                      <Box mb={2}>
                        <Alert severity="error">{state.errorMsg}</Alert>
                      </Box>
                    )}
                    {state.preselected? <Box mb={2}>
                      <Typography
                        component="p"
                        align="center"
                      >
                        Adaug?? o solu??ie pentru problema <Link to={`/problema/${state.preselectedName}`}>{state.preselectedName}</Link> #{state.preselectedId}.{' '}
                        <br/>
                        <Typography
                          component="a"
                          color="primary"
                          style={{cursor: "pointer"}}
                          onClick={handleClosePreselection}
                        >
                          Alege alt?? problem??
                        </Typography>
                      </Typography>
                      </Box> : <Box mb={2}>
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
                            label="Nume problem??"
                            variant="outlined"
                          />
                        )}
                        onChange={(event, option) => {
                          setState({
                            ...state,
                            problemId: option ? option.id : -1,
                            isError: false,
                          });
                        }}
                        onFocus={getProblems}
                        noOptionsText={
                          !rootState.problemsDataLoaded
                            ? "Se caut??..."
                            : "Niciun rezultat"
                        }
                      />
                    </Box>}
                    <Box mb={1}>
                      <TextField
                        label="Solu??ie"
                        multiline
                        rows={fromExtension? 5 : 7}
                        fullWidth
                        placeholder="Introdu solu??ia aici..."
                        variant="outlined"
                        onChange={handleChange("content")}
                        value={state.content}
                      />
                    </Box>
                    <Grid container component={Box} mb={1}>
                      <Grid item xs={6} >
                        <Box>
                          <span>Limbaj:</span>{' '}
                          <Select
                            labelId="language-select-label"
                            id="language-select"
                            value={state.language}
                            onChange={handleChange('language')}
                          >
                            <MenuItem value={'cpp'}>C++</MenuItem>
                            <MenuItem value={'c'}>C</MenuItem>
                            <MenuItem value={'java'}>Java</MenuItem>
                            <MenuItem value={'python'}>Python</MenuItem>
                            <MenuItem value={'php'}>PHP</MenuItem>
                            <MenuItem value={'pascal'}>Pascal</MenuItem>
                          </Select>
                        </Box>
                      </Grid>
                      {(fromExtension && state.preselected) && <Grid item xs={6}>
                        <Box>
                          <a href={`https://api.solinfo.ro/_${state.preselectedId}`} target="_blank">
                            <Button
                              size="small"
                              color="secondary"
                              disableElevation
                              variant="contained"
                              fullWidth
                            >
                              Vezi solu??ii
                            </Button>
                          </a>
                        </Box>
                      </Grid>}
                    </Grid>
                    <Box mb={2}>
                      <Button
                        onClick={submit}
                        size="large"
                        endIcon={!state.isLoading && <SendTwoToneIcon />}
                        color="primary"
                        disableElevation
                        variant="contained"
                        fullWidth
                        disabled={state.isLoading}
                      >
                        {!state.isLoading && <>Trimite solu??ie</>}
                        {state.isLoading && <>Se trimite...</>}
                      </Button>
                    </Box>
                    <Box>
                      <Typography variant="body2">
                        Solu??ia va ap??rea pe site asociat?? numelui t??u de
                        utilizator, @{rootState.userInfo.username}.
                      </Typography>
                      {!fromExtension && <>
                        <Typography variant="body2" style={{marginTop: "0.25rem"}}>
                          <InfoTwoTone style={{marginRight: "0.5rem", fontSize: "1rem", marginBottom: "-3px"}} color="primary" size="small"/>
                          Acum po??i importa mai multe solu??ii direct din contul t??u pbinfo.ro <Link to="/import-solutii">aici</Link>.
                        </Typography>
                        <Typography variant="body2" style={{marginTop: "0.5rem"}}>
                          <InfoTwoTone style={{marginRight: "0.5rem", fontSize: "1rem", marginBottom: "-3px"}} color="primary" size="small"/>
                          Trage bookmarkletul <a href={"javascript:if(location.href.indexOf('pbinfo.ro') == -1) {alert('Trebuie sa fii pe Pbinfo pentru a vedea solutii! Deschide o problema de pe Pbinfo si incearca din nou.')} const idProblema = document.querySelector('span.label.label-primary').innerText.slice(1);window.open('https://api.solinfo.ro/_' + idProblema + '?utm_source=bookmarklet');"}>SOLINFO: Solu??ii</a> ??n bara de favorite, intr?? pe o problem?? de pe PbInfo ??i apas?? click pe el pentru a vedea solu??iile disponibile.
                        </Typography>
                        <Typography variant="body2" style={{marginTop: "0.5rem"}}>
                          <InfoTwoTone style={{marginRight: "0.5rem", fontSize: "1rem", marginBottom: "-3px"}} color="primary" size="small"/>
                          <a href="https://chrome.google.com/webstore/detail/solinforo/abmhdbimjkobbjbdbafjnamidmjkopkh" target="_blank">Extensia</a> pentru Chrome te ajut?? s?? impor??i o solu??ie imediat dup?? ce rezolvi o problem??.
                        </Typography>
                      </>}
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            </>
          )}
          {rootState.isLoggedIn && state.step === 2 && (
            <>
              <Grid item xs={12}>
                <Paper className="cool-sha">
                  <Box p={2}>
                    <Box mb={2}>
                      <Typography>
                        ????i mul??umim! Solu??ia a fost trimis?? c??tre revizuire. Va
                        ap??rea cur??nd pe site dac?? va trece testul de
                        performan????.
                      </Typography>
                    </Box>
                    <Box>
                      <Button
                        onClick={restart}
                        size="large"
                        color="primary"
                        disableElevation
                        variant="contained"
                        fullWidth
                      >
                        Trimite o alt?? solu??ie
                      </Button>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            </>
          )}
        </Grid>
      </Container>
    </>
  );
}
