import React, { useContext } from "react";
import { RootContext } from "./../contexts/Context";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import ReCAPTCHA from "react-google-recaptcha";
import Alert from "@material-ui/lab/Alert";

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
      emailAddress: "",
      password: "",
      gRecaptchaResponse: "",
      step: 1,
    },
    isLoading: false,
    isError: false,
    errorMsg: "",
    requiresChallenge: false,
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

    const request = await API("endpoint/auth/login.php", state.input);

    if (!request.success) {
      setState({
        ...state,
        isError: true,
        errorMsg: request.errorMsg,
        isLoading: false,
        requiresChallenge: request.requiresChallenge,
        input: {
          ...state.input,
          step: request.nextStep,
          password: "",
        },
      });
    } else {
      if (request.nextStep === -1) {
        localStorage.setItem("authToken", request.authToken);
        window.location.reload();
      } else {
        setState({
          ...state,
          isError: false,
          isLoading: false,
          successMsg: request.successMsg,
          requiresChallenge: request.requiresChallenge,
          input: {
            ...state.input,
            step: request.nextStep,
          },
        });
      }
    }

    if (state.requiresChallenge) {
      window.grecaptcha.reset();
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        {state.isError && (
          <Grid item xs={12}>
            <Box mb={1}>
              <Alert severity="error">{state.errorMsg}</Alert>
            </Box>
          </Grid>
        )}
        {state.input.step >= 1 && (
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
        )}
        {state.input.step >= 2 && (
          <Grid item xs={12}>
            <TextField
              label="Parolă"
              id="password"
              value={state.input.password}
              onChange={handleChange("password")}
              onKeyDown={handleKeyDown}
              type="password"
              required
              fullWidth
            />
          </Grid>
        )}
        {state.input.step >= 2 && state.requiresChallenge && (
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
        )}
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
              {state.isLoading ? <>Se încarcă...</> : <>Autentifică-te</>}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
