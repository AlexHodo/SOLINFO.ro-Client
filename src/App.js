import "./App.css";
import React from "react";
import { Router } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Context from "./contexts/Context";
import AppWrapper from "./components/AppWrapper";
import ScrollToTop from "react-router-scroll-top";
import MetaTags from "react-meta-tags";
import ReactGA from "react-ga";
import { createBrowserHistory } from "history";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#546de5",
      dark: "#574b90",
    },
    secondary: {
      main: "#303952",
    },
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
  ReactGA.pageview(location.pathname + location.search);
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
        <MuiThemeProvider theme={theme}>
          <Context>
            <AppWrapper />
          </Context>
        </MuiThemeProvider>
      </ScrollToTop>
    </Router>
  );
}
