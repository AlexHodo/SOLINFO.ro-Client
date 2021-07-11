import React, { createContext, Component } from "react";
import axios from "axios";
import ReactGA from "react-ga";
export const RootContext = createContext();

const Axios = axios.create({
  baseURL: "https://api.solinfo.ro/v2.0",
  withCredentials: true,
  //baseURL: "http://localhost/solinfo/api"
});

class Context extends Component {
  componentDidMount() {
    ReactGA.initialize("UA-199814762-1");
    ReactGA.pageview(window.location.pathname);
    this.checkSession();
  }

  loadingTxt = "Se încarcă...";

  state = {
    domain: "https://solinfo.ro",
    fileDomain: "https://solinfo.ro/file",
    //domain: "http://localhost.ro:3000",
    //fileDomain: "http://localhost/solinfo/file",
    isLoggedIn: false,
    userInfo: {
      firstName: null,
      lastName: null,
      emailAddress: null,
      id: null,
      username: null,
    },
    problems: [],
    stats: {
      rating_5_count: this.loadingTxt,
      solutions_count: this.loadingTxt,
      top_users: [],
      users_count: this.loadingTxt,
      views_count: this.loadingTxt,
    },
    authStatusChecked: false,
    about: this.loadingTxt,
    contact: this.loadingTxt,
    showPersonalAd: false,
    showHelpUs: false,
    showDiscord: false,
    home: {
      hero: {
        wallpaper_url: null,
        wallpaper_author_name: null,
        wallpaper_author_url: null,
      },
      latest_solutions: [],
      stats: {
        rating_5_count: this.loadingTxt,
        solutions_count: this.loadingTxt,
        top_users: [],
        users_count: this.loadingTxt,
        views_count: this.loadingTxt,
      },
    },
    homeDataLoaded: false,
    problemsDataLoaded: false,
    problemsDataIsLoading: false,
    cookie: null,
    showLoader: false,
    weeklyChallenge: [],
    weeklyChallengeTotal: 0,
    weeklyChallengeSolved: 0
  };

  API = async (action, input = []) => {
    if(action !== "/endpoint/module/notifications.php" && !this.state.showLoader) {
      if(this.state.authStatusChecked && this.state.homeDataLoaded)
        this.setState({
          ...this.state,
          showLoader: true
        })
    }
    input = {
      ...input,
      _x: localStorage.getItem("authToken") + "~" + Date.now(),
    };
    const request = await Axios.post(action, input);
    this.setState({
      ...this.state,
      showLoader: false
    })
    return request.data;
  };

  logout = () => {
    localStorage.removeItem("authToken");
    Axios.defaults.headers.common["Authorization"] = "Bearer -1";
    this.setState({
      ...this.state,
      isLoggedIn: false,
    });
  };

  getProblems = async () => {
    if (this.state.problemsDataLoaded === true) return -1;

    this.setState({
      ...this.state,
      problemsDataIsLoading: true,
    });

    const data = await this.API("endpoint/problems.json");

    this.setState({
      ...this.state,
      problemsDataIsLoading: false,
      problemsDataLoaded: true,
      problems: data,
    });
  };

  checkSession = async () => {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      localStorage.setItem("authToken", "-1");
    }

    Axios.defaults.headers.common["Authorization"] = "Bearer " + authToken;

    const data = await this.API("endpoint/load.php");

    if (data.success) {
      this.setState({
        ...this.state,
        isLoggedIn: data.isLoggedIn,
        userInfo: data.userInfo,
        // problems: data.problems,
        stats: {
          rating_5_count: data.stats.rating_5_count,
          solutions_count: data.stats.solutions_count,
          top_users: data.stats.top_users,
          users_count: data.stats.users_count,
          views_count: data.stats.views_count,
        },
        about: data.about,
        contact: data.contact,
        showPersonalAd: data.showPersonalAd,
        showHelpUs: data.showHelpUs,
        showDiscord: data.showDiscord,
        cookies: data.cookies,
        weeklyChallenge: data.weekly_challenge,
        weeklyChallengeTotal: data.weekly_challenge_total,
        weeklyChallengeSolved: data.weekly_challenge_solved
      });
    }

    if (data.mustLogInAgain) {
      localStorage.setItem("authToken", "-1");
    }

    this.setState({
      ...this.state,
      authStatusChecked: true,
    });

    const homeData = await this.API("endpoint/page/home.php");

    if (homeData.success) {
      this.setState({
        ...this.state,
        home: {
          ...this.state.home,
          hero: homeData.hero,
          latest_solutions: homeData.latest_solutions,
          stats: homeData.stats,
        },
        homeDataLoaded: true,
      });
    }
  };

  render() {
    const contextValue = {
      rootState: this.state,
      checkSession: this.checkSession,
      logout: this.logout,
      API: this.API,
      getProblems: this.getProblems,
    };
    return (
      <RootContext.Provider value={contextValue}>
        {this.props.children}
      </RootContext.Provider>
    );
  }
}

export default Context;
