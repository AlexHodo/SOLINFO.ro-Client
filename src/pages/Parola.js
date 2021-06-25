import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { RootContext } from "./../contexts/Context";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { Link, useParams } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import TextField from "@material-ui/core/TextField";
import ReCAPTCHA from "react-google-recaptcha";
import Typography from "@material-ui/core/Typography";
import MetaTags from "react-meta-tags";

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    minHeight: "85vh",
  },
  wrapperPaper: {
    padding: theme.spacing(3),
  },
  recaptchaWrapper: {
    "&>div>div": {
      display: "flex",
      placeContent: "center",
    },
  },
}));

export default function Parola() {
  const { API } = useContext(RootContext);

  const classes = useStyles();

  const initialState = {
    input: {
      emailAddress: "",
      gRecaptchaResponse: "",
    },
    isLoading: false,
    errorMsg: "",
    successMsg: "",
  };

  const [state, setState] = React.useState(initialState);

  const handleChange = (prop) => (event) => {
    setState({
      ...state,
      input: {
        ...state.input,
        [prop]: event.target.value,
      },
    });
  };

  function handleChangeRecaptcha(value) {
    setState({
      ...state,
      input: {
        ...state.input,
        gRecaptchaResponse: value == null ? "" : value,
      },
    });
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      submit();
    }
  }

  const submit = async (event) => {
    setState({
      ...state,
      isLoading: true,
    });

    const request = await API("endpoint/auth/password-reset.php", state.input);

    if (!request.success) {
      setState({
        ...state,
        errorMsg: request.errorMsg,
        isLoading: false,
      });
      window.grecaptcha.reset();
    } else {
      setState({
        ...state,
        isLoading: false,
        successMsg: request.successMsg,
      });
    }
  };

  return (
    <>
      <MetaTags>
        <title>Resetare parolă | SOLINFO.ro</title>
      </MetaTags>
      <Container maxWidth="md">
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.formWrapper}
        >
          <Grid item xs={12} sm={8} md={5}>
            <Box mb={3} mt={3}>
              <Typography variant="h5" component="h1" align="center">
                Resetare parolă
              </Typography>
            </Box>
            <Paper className={`cool-sha ${classes.wrapperPaper}`}>
              <Grid container spacing={3}>
                {state.successMsg ? (
                  <Alert severity="success">{state.successMsg}</Alert>
                ) : (
                  <>
                    <Grid item xs={12}>
                      <Typography variant="body1" component="p">
                        Pentru a-ți reseta parola, te rugăm să introduci adresa
                        de email asociată contului tău în câmpul de mai jos.
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Adresă de email"
                        id="emailAddress"
                        value={state.input.emailAddress}
                        onChange={handleChange("emailAddress")}
                        onKeyDown={handleKeyDown}
                        type="email"
                        required
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <div className={classes.recaptchaWrapper}>
                        <ReCAPTCHA
                          sitekey="6Le5zbYaAAAAAMaH8fUG5UDXmOePB9rgyBUs4U_B"
                          onChange={handleChangeRecaptcha}
                        />
                      </div>
                    </Grid>
                    {state.errorMsg && (
                      <Grid item xs={12}>
                        <Alert severity="error">{state.errorMsg}</Alert>
                      </Grid>
                    )}
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        color="primary"
                        disableElevation
                        fullWidth
                        onClick={submit}
                        disabled={state.isLoading}
                      >
                        {state.isLoading ? <>Se încarcă...</> : <>Continuă</>}
                      </Button>
                    </Grid>
                  </>
                )}
              </Grid>
            </Paper>
            <Box mt={2}>
              <Typography variant="body2" component="p">
                Vrei să te autentifici sau să te înregistrezi? Intră{" "}
                <Link to="/cont">aici</Link>.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
