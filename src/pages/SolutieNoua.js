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
        <title>Adaugă o soluție nouă | SOLINFO.ro</title>
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
                  Adaugă o soluție nouă{fromExtension? "" : "  pe site"}
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
                  Trebuie să te autentifici pentru a putea adăuga o soluție.
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
                        Adaugă o soluție pentru problema <Link to={`/problema/${state.preselectedName}`}>{state.preselectedName}</Link> #{state.preselectedId}.{' '}
                        <br/>
                        <Typography
                          component="a"
                          color="primary"
                          style={{cursor: "pointer"}}
                          onClick={handleClosePreselection}
                        >
                          Alege altă problemă
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
                            label="Nume problemă"
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
                            ? "Se caută..."
                            : "Niciun rezultat"
                        }
                      />
                    </Box>}
                    <Box mb={1}>
                      <TextField
                        label="Soluție"
                        multiline
                        rows={fromExtension? 5 : 7}
                        fullWidth
                        placeholder="Introdu soluția aici..."
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
                              Vezi soluții
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
                        {!state.isLoading && <>Trimite soluție</>}
                        {state.isLoading && <>Se trimite...</>}
                      </Button>
                    </Box>
                    <Box>
                      <Typography variant="body2">
                        Soluția va apărea pe site asociată numelui tău de
                        utilizator, @{rootState.userInfo.username}.
                      </Typography>
                      {!fromExtension && <>
                        <Typography variant="body2" style={{marginTop: "0.25rem"}}>
                          <Chip label="NOU!" color="primary" size="small" style={{marginRight: "0.5rem", marginTop: "-0.25rem"}}/> 
                          Acum poți importa mai multe soluții direct din contul tău pbinfo.ro <Link to="/import-solutii">aici</Link>.
                        </Typography>
                        <Typography variant="body2" style={{marginTop: "0.5rem"}}>
                          <Chip label="NOU!" color="primary" size="small" style={{marginRight: "0.5rem", marginTop: "-0.25rem"}}/> 
                          Trage bookmarkletul <a href={"javascript:if(location.href.indexOf('pbinfo.ro') != -1) {const numeProblema = document.querySelector('h1.text-primary a').innerText.trim().replace(/ /g, '-');window.open('https://solinfo.ro/problema/' + numeProblema + '?utm_source=bookmarklet');}"}>SOLINFO: Soluții</a> în bara de favorite, intră pe o problemă de pe PbInfo și apasă click pe el pentru a vedea soluțiile disponibile.
                        </Typography>
                        <Typography variant="body2" style={{marginTop: "0.5rem"}}>
                          <Chip label="NOU!" color="primary" size="small" style={{marginRight: "0.5rem", marginTop: "-0.25rem"}}/> 
                          <a href="https://chrome.google.com/webstore/detail/solinforo/abmhdbimjkobbjbdbafjnamidmjkopkh" target="_blank">Extensia</a> pentru Chrome te ajută să imporți o soluție imediat după ce rezolvi o problemă.
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
                        Îți mulțumim! Soluția a fost trimisă către revizuire. Va
                        apărea curând pe site dacă va trece testul de
                        performanță.
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
                        Trimite o altă soluție
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
