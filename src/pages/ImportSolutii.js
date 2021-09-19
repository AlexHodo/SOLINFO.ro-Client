import React, { useContext, useMemo } from "react";
import { makeStyles, fade } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { RootContext } from "./../contexts/Context";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import AuthForm from "./../components/AuthForm";
import Autocomplete from '@material-ui/lab/Autocomplete';
import SendTwoToneIcon from "@material-ui/icons/SendTwoTone";
import Alert from "@material-ui/lab/Alert";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import MetaTags from "react-meta-tags";
import { Link, useParams } from "react-router-dom";
import logo from "../media/logo.svg";
import {useDropzone} from 'react-dropzone';
import ReCAPTCHA from "react-google-recaptcha";
import ReplayTwoToneIcon from '@material-ui/icons/ReplayTwoTone';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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
  recaptchaWrapper: {
    "&>div>div": {
      display: "flex",
      placeContent: "center",
    },
  },
  bg_grey: {
    backgroundColor: fade(theme.palette.secondary.main, 0.2),
  },
  bg_success: {
    backgroundColor: theme.palette.success.light,
  },
  bg_warning: {
    backgroundColor: theme.palette.warning.light,
  },
  bg_error: {
    backgroundColor: theme.palette.error.light,
  }
}));

export default function ImportSolutii(props) {

  const { API, rootState } = useContext(RootContext);

  let defaultState = {
    input: null,
    isLoading: false,
    isError: false,
    gRecaptchaResponse: '',
    errorMsg: null,
    result: null,
    step: 1,
    logs: []
  };

  const [state, setState] = React.useState(defaultState);

  const classes = useStyles();

  function handleChangeRecaptcha(value) {
    setState({
      ...state,
      gRecaptchaResponse: value == null ? "" : value,
      isError: false
    });
  }

  const handleChange = (prop) => (event) => {
    setState({
      ...state,
      isError: false,
      [prop]: event.target.value,
    });
  };


  const submit = async (event) => {
    if(state.gRecaptchaResponse === '') {
      setState({
        ...state,
        errorMsg: 'Te rog să demonstrezi că nu ești un robot.',
        isError: true
      })
      return;
    }
    if(!state.input) {
      setState({
        ...state,
        errorMsg: 'Te rog să încarci fișierul JSON.',
        isError: true
      })
      return;
    }
    setState({
      ...state,
      isLoading: true,
    });

    const request = await API("endpoint/page/import-solutii.php", {
      input: state.input,
      gRecaptchaResponse: state.gRecaptchaResponse
    });

    if (!request.success) {
      setState({
        ...state,
        errorMsg: request.errorMsg,
        isError: true,
        isLoading: false,
      });
      window.grecaptcha.reset();
    } else {
      setState({
        ...state,
        isError: false,
        isLoading: false,
        logs: request.logs,
        step: 2
      });
    }
  };

  const restart = (event) => {
    clearSelection()
    setState(defaultState);
  };

  const baseDropzoneStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 4,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#F6F8FF',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    fontSize: "0.9rem",
    cursor: "pointer"
  };

  const activeDropzoneStyle = {
    borderColor: '#3C59FB'
  };

  const acceptDropzoneStyle = {
    borderColor: '#3C59FB'
  };

  const rejectDropzoneStyle = {
    borderColor: '#ff1744'
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles
  } = useDropzone({
    accept: 'application/json', 
    maxFiles: 1,
    onDrop: (async ([file]) => {
      var reader = new FileReader();
      reader.onload = function(e) {
        var contents = e.target.result;
        setState({
          ...state,
          input: contents,
          isError: false
        })
      };
      reader.readAsText(file);
    })
  });

  const style = useMemo(() => ({
    ...baseDropzoneStyle,
    ...(isDragActive ? activeDropzoneStyle : {}),
    ...(isDragAccept ? acceptDropzoneStyle : {}),
    ...(isDragReject ? rejectDropzoneStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);

  const clearSelection = () => {
    acceptedFiles.length = 0
    acceptedFiles.splice(0, acceptedFiles.length)
    setState({
      ...state,
      input: null
    })
  }

  return (
    <>
      <MetaTags>
        <title>Importă soluțiile tale | SOLINFO.ro</title>
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
              <Grid item xs={12} md={9}>
                <Typography variant={'h5'} component="h1" align="center">
                  Importă soluțiile tale 
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          {!rootState.authStatusChecked && (
            <Grid item xs={12}>
              <Box>
                <center>Se încarcă...</center>
              </Box>
            </Grid>
          )}
          {rootState.authStatusChecked && !rootState.isLoggedIn && (
            <Grid item xs={12}>
              <Box>
                <Typography align="center">
                  Trebuie să te autentifici pentru a putea importa soluțiile tale.
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
                    <Box mb={2}>
                      <Typography variant="body1">
                        În loc să contribui manual cu câte o soluție, poți opta să imporți mai multe soluții în același timp din contul tău pbinfo.ro. 
                      </Typography>
                      <Typography variant="body1">
                        Urmărește tutorialul disponibil <a href="https://solinfo.ro/blog/import-solutii/" target="_blank">aici</a> pentru a genera fișierul JSON necesar. 
                      </Typography>
                    </Box>
                    <Box mb={2}>
                        {acceptedFiles.length === 0 && <div {...getRootProps({style})}>
                          <input {...getInputProps()} />
                          <p>Trage fișierul JSON aici sau dă click pentru a-l alege.</p>
                        </div>}
                        {state.input && <>
                          <Typography variant="body1">
                            <span>Fișier selectat: <b>{acceptedFiles[acceptedFiles.length - 1].path}</b></span>
                            <IconButton
                              size="small"
                              style={{
                                marginLeft: "0.5rem"
                              }}
                              color="secondary"
                              onClick={clearSelection}
                            >
                              <ReplayTwoToneIcon />
                            </IconButton>
                          </Typography>
                        </>}
                    </Box>
                    <Box mb={2}>
                      <div className={classes.recaptchaWrapper}>
                        <ReCAPTCHA
                          sitekey="6Le5zbYaAAAAAMaH8fUG5UDXmOePB9rgyBUs4U_B"
                          onChange={handleChangeRecaptcha}
                        />
                      </div>
                    </Box>
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
                        {!state.isLoading && <>Importă soluțiile</>}
                        {state.isLoading && <>Se importă...</>}
                      </Button>
                    </Box>
                    <Box>
                      <Typography variant="body2">
                        Soluțiile importate vor apărea pe site asociate numelui tău de
                        utilizator, @{rootState.userInfo.username}.
                      </Typography>
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
                        Îți mulțumim! Mai jos găsești rezultatul importării.
                      </Typography>
                    </Box>
                    <Box mb={2}>
                      <Typography variant="body2">
                        {state.logs.length === 0 && "Ceva nu a mers cum trebuie."}
                      </Typography>
                      {state.logs.length > 0 && <>
                        <TableContainer component={Box}>
                          <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                              <TableRow className={classes.bg_grey}>
                                <TableCell style={{borderBottom:"none"}}><b>Problemă</b></TableCell>
                                <TableCell align="left" style={{borderBottom:"none"}}><b>Status</b></TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {state.logs.map((row, key) => {
                                return <TableRow
                                  key={key}
                                  className={classes.[`bg_${row.status}`]}
                                >
                                  <TableCell component="th" scope="row" style={{borderBottom:"none"}}>
                                    <b>#{row.pid}</b>
                                  </TableCell>
                                  <TableCell align="left" style={{borderBottom:"none"}}>
                                    {row.msg}
                                  </TableCell>
                                </TableRow>
                              })}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </>}
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
                        Importă alte soluții
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
