import "./App.css";
import React from "react";
import { Router } from "react-router-dom";
import { ThemeProvider, createMuiTheme, createGenerateClassName } from "@material-ui/core/styles";
import Context from "./contexts/Context";
import AppWrapper from "./components/AppWrapper";
import ScrollToTop from "react-router-scroll-top";
import MetaTags from "react-meta-tags";
import ReactGA from "react-ga";
import { createBrowserHistory } from "history";

const theme = createMuiTheme({
  typography: {
    fontFamily: `"Nunito", "Helvetica", "Arial", sans-serif`,
    button: {
      fontWeight: 600
    }
  },
  palette: {
    primary: {
      main: "#3C59FB",
    },
    secondary: {
      main: "#303952",
    },
    badge1: {
      main: "#ff9800",
    },
    badge2: {
      main: "#ff5722",
    },
    badge3: {
      main: "#e91e63",
    },
    badge4: {
      main: "#673ab7",
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1100,
      lg: 1280,
      xl: 1920,
    },
  },
});

ReactGA.initialize("UA-199814762-1");

const historyInstance = createBrowserHistory();

historyInstance.listen((location) => {
  if(!(!process.env.NODE_ENV || process.env.NODE_ENV === 'development')) { // if not dev
    ReactGA.pageview(location.pathname + location.search);
  }
});


export default function App() {
  return (
    <Router history={historyInstance}>
      <ScrollToTop>
        <MetaTags>
          <meta
            name="description"
            content="Soluții pentru orice problemă de pe pbinfo.ro cu explicații."
          />
          <meta property="og:title" content="SOLINFO.ro" />
        </MetaTags>
        <ThemeProvider theme={theme} >
          <Context>
            <AppWrapper />
          </Context>
        </ThemeProvider>
      </ScrollToTop>
    </Router>
  );
}
