import React, { useContext } from "react";
import { RootContext } from "./../contexts/Context";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import ReCAPTCHA from "react-google-recaptcha";
import Alert from "@material-ui/lab/Alert";
import CheckIcon from "@material-ui/icons/Check";
import ReactGA from "react-ga";
ReactGA.initialize("UA-199814762-1");

const useStyles = makeStyles((theme) => ({
  recaptchaWrapper: {
    "&>div>div": {
      display: "flex",
      placeContent: "center",
    },
  },
}));

export default function AuthRegister() {
  const classes = useStyles();

  const { API } = useContext(RootContext);

  const initialState = {
    input: {
      firstName: "",
      lastName: "",
      password: "",
      emailAddress: "",
      gRecaptchaResponse: "",
    },
    errors: {
      firstName: null,
      lastName: null,
      password: null,
      emailAddress: null,
      gRecaptchaResponse: null,
    },
    isLoading: false,
    isError: false,
    isSuccess: false,
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
      errors: {
        ...state.errors,
        [prop]: null,
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

    const request = await API("endpoint/auth/register.php", state.input);

    if (!request.success) {
      setState({
        ...state,
        isError: true,
        errors: request.fieldError,
        errorMsg: request.errorMsg,
        isLoading: false,
      });
      window.grecaptcha.reset();
    } else {
      setState({
        ...state,
        isSuccess: true,
        isError: false,
        isLoading: false,
        successMsg: request.successMsg,
      });
      ReactGA.event({
        category: "Authentication",
        action: "Registered",
      });
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        {state.isSuccess && (
          <Grid item xs={12}>
            <Box>
              <Alert severity="success" icon={<CheckIcon fontSize="inherit" />}>
                {state.successMsg}
              </Alert>
            </Box>
          </Grid>
        )}
        {state.isError && !state.isSuccess && (
          <Grid item xs={12}>
            <Box mb={1}>
              <Alert severity="error">{state.errorMsg}</Alert>
            </Box>
          </Grid>
        )}
        {!state.isSuccess && (
          <>
            <Grid item xs={12}>
              <TextField
                label="Nume"
                id="lastName"
                helperText={state.errors.lastName}
                error={state.errors.lastName != null}
                value={state.input.lastName}
                onChange={handleChange("lastName")}
                onKeyDown={handleKeyDown}
                type="text"
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Prenume"
                id="firstName"
                helperText={state.errors.firstName}
                error={state.errors.firstName != null}
                value={state.input.firstName}
                onChange={handleChange("firstName")}
                onKeyDown={handleKeyDown}
                type="text"
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Adresă de email"
                id="emailAddress"
                helperText={state.errors.emailAddress}
                error={state.errors.emailAddress != null}
                value={state.input.emailAddress}
                onChange={handleChange("emailAddress")}
                onKeyDown={handleKeyDown}
                type="email"
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Parolă"
                id="password"
                helperText={state.errors.password}
                error={state.errors.password != null}
                value={state.input.password}
                onChange={handleChange("password")}
                onKeyDown={handleKeyDown}
                type="password"
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Box mt={2}>
                <div className={classes.recaptchaWrapper}>
                  <ReCAPTCHA
                    sitekey="6Le5zbYaAAAAAMaH8fUG5UDXmOePB9rgyBUs4U_B"
                    onChange={handleChangeRecaptcha}
                  />
                </div>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box mt={2}>
                <Button
                  variant="contained"
                  color="primary"
                  disableElevation
                  fullWidth
                  onClick={submit}
                  disabled={state.isLoading}
                >
                  {state.isLoading ? <>Se încarcă...</> : <>Înregistrează-te</>}
                </Button>
              </Box>
            </Grid>
          </>
        )}
      </Grid>
    </div>
  );
}
