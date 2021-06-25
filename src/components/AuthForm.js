import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AuthLogin from "./AuthLogin";
import AuthRegister from "./AuthRegister";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const useStyles = makeStyles((theme) => ({
  tabs: {
    backgroundColor: fade(theme.palette.primary.main, 1),
    color: "white",
    borderRadius: "4px 4px 0 0",
  },
  formInner: {
    padding: theme.spacing(3),
  },
}));

export default function AuthForm() {
  const classes = useStyles();

  const [activeTab, setActiveTab] = React.useState("login");

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        className={classes.tabs}
      >
        <Tab label="Intră în cont" value="login" />
        <Tab label="Creare cont nou" value="register" />
      </Tabs>
      <div className={classes.formInner}>
        {activeTab === "login" && <AuthLogin />}
        {activeTab === "register" && <AuthRegister />}
      </div>
    </>
  );
}
