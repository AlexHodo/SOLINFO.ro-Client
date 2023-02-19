import React, { createContext, Component } from "react";
import axios from "axios";
import ReactGA from "react-ga";
export const RootContext = createContext();

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === "development";

const discordInvitation = "7u7YC2PK7w";

const Axios = axios.create({
  baseURL: isDev
    ? "http://localhost/solinfo/api"
    : "https://api.solinfo.ro/v2.0",
  withCredentials: !isDev,
});

class Context extends Component {
  componentDidMount() {
    ReactGA.initialize("UA-199814762-1");
    ReactGA.pageview(window.location.pathname);
    this.checkSession();
    this.getDiscordInfo();
  }

  loadingTxt = "Se încarcă...";

  state = {
    domain: isDev ? "http://localhost.ro:3000" : "https://solinfo.ro",
    discordMembersCount: null,
    discordOnlineCount: null,
    fileDomain: isDev
      ? "http://localhost/solinfo/file"
      : "https://solinfo.ro/file",
    isLoggedIn: false,
    userInfo: {
      firstName: null,
      lastName: null,
      emailAddress: null,
      id: null,
      isStaff: null,
      username: null,
    },
    problems: [],
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
        rating_5_count: "...",
        solutions_count: "...",
        top_users: [],
        users_count: "...",
        views_count: "...",
        articles: [],
        latest_problems: [],
      },
    },
    homeDataLoaded: false,
    problemsDataLoaded: false,
    problemsDataIsLoading: false,
    cookie: null,
    showLoader: false,
    weeklyChallenge: [],
    weeklyChallengeTotal: -1,
    weeklyChallengeSolved: 0,
    newSolutionIntention: null,
    newSolutionIntentionName: null,
    showAds: false,
    staff: [],
    donationModalOpen: false,
    affiliate_banner_1: null,
    affiliate_banner_2: null,
  };

  API = async (action, input = []) => {
    if (
      action !== "/endpoint/module/notifications.php" &&
      action !== "endpoint/problems.json.php" &&
      action !== "/endpoint/module/problem-stats.php" &&
      !this.state.showLoader
    ) {
      if (this.state.authStatusChecked && this.state.homeDataLoaded)
        this.setState({
          ...this.state,
          showLoader: true,
        });
    }
    input = {
      ...input,
      _bearer_token: localStorage.getItem("authToken"),
    };
    const request = await Axios.post(action.replace(".php", ""), input, {
      headers: {
        Accept: "text/plain",
        "Content-Type": "text/plain",
      },
    });
    setTimeout(() => {
      this.setState({
        ...this.state,
        showLoader: false,
      });
    }, 250);
    return request.data;
  };

  logout = () => {
    localStorage.removeItem("authToken");
    //Axios.defaults.headers.common["Authorization"] = "Bearer -1";

    this.setState({
      ...this.state,
      isLoggedIn: false,
    });
  };

  setRootState = (newState) => {
    this.setState(newState);
  };

  getProblems = async () => {
    if (this.state.problemsDataLoaded === true) return -1;

    this.setState({
      ...this.state,
      problemsDataIsLoading: true,
    });

    const data = await this.API("endpoint/problems.json.php");

    this.setState({
      ...this.state,
      problemsDataIsLoading: false,
      problemsDataLoaded: true,
      problems: data,
    });
  };

  getDiscordInfo = async () => {
    const apiResult = await axios({
      method: "get",
      url: `https://discord.com/api/v9/invites/${discordInvitation}?with_counts=true&with_expiration=true`,
    }).then((res) => {
      const data = res.data;
      if (data.approximate_member_count && data.approximate_presence_count) {
        this.setState({
          ...this.state,
          discordMembersCount: data.approximate_member_count,
          discordOnlineCount: data.approximate_presence_count,
        });
      }
    });
  };

  checkSession = async () => {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      localStorage.setItem("authToken", "-1");
    }

    //Axios.defaults.headers.common["Authorization"] = "Bearer " + authToken;

    let [data, homeData] = await Promise.all([
      this.API("endpoint/load.php"),
      this.API("endpoint/page/home.php"),
    ]);

    if (data.success) {
      this.setState({
        ...this.state,
        isLoggedIn: data.isLoggedIn,
        userInfo: data.userInfo,
        // problems: data.problems,
        about: data.about,
        contact: data.contact,
        showPersonalAd: data.showPersonalAd,
        showHelpUs: data.showHelpUs,
        showDiscord: data.showDiscord,
        cookies: data.cookies,
        weeklyChallenge: data.weekly_challenge,
        weeklyChallengeTotal: data.weekly_challenge_total,
        weeklyChallengeSolved: data.weekly_challenge_solved,
        showAds: data.show_ads ? data.show_ads : false,
        staff: data.staff,
        affiliate_banner_1: data.affiliate_banner_1,
        affiliate_banner_2: data.affiliate_banner_2,
      });
    }

    if (data.mustLogInAgain) {
      localStorage.setItem("authToken", "-1");
    }

    this.setState({
      ...this.state,
      authStatusChecked: true,
    });

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

  langToHljsLang = (input) => {
    switch (input) {
      case "cpp": {
        return "c";
        break;
      }
      default: {
        return input;
        break;
      }
    }
  };

  render() {
    const contextValue = {
      rootState: this.state,
      setRootState: this.setRootState,
      checkSession: this.checkSession,
      logout: this.logout,
      API: this.API,
      getProblems: this.getProblems,
      langToHljsLang: this.langToHljsLang,
    };
    return (
      <RootContext.Provider value={contextValue}>
        {this.props.children}
      </RootContext.Provider>
    );
  }
}

export default Context;
