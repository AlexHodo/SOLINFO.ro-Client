import React, { useContext } from "react";
import { RootContext } from "./../contexts/Context";
import { fade, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";
import Skeleton from "@material-ui/lab/Skeleton";
import Paper from "@material-ui/core/Paper"
import ReactGA from "react-ga";

ReactGA.initialize("UA-199814762-1");

const useStyles = makeStyles((theme) => ({
  articleWrapper: {
    height: "200px",
    width: "100%",
    cursor: "pointer",
    overflow: "hidden",
    position: "relative",
    "& ._oi": { // overlay image
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: 106,
      boxShadow: "inset 0px -150px 40px -50px rgb(0, 0, 0, .65)",
      transition: "box-shadow 0.2s",
    },
    "& ._i": {
      backgroundSize: "cover",
      backgroundPosition: "center center",
      width: "100%",
      height: "100%",
      position: "absolute",
      top: 0,
      left: 0,
      transition: "transform 0.2s",
      zIndex: 105,
    },
    "& ._avt": {
      width: theme.spacing(3),
      height: theme.spacing(3),
      border: "1px solid white",
      position: "absolute",
      top: theme.spacing(2),
      left: theme.spacing(2),
      opacity: 1,
      zIndex: 109,
      transition: "opacity 0.2s"
    },
    "&:hover ._i": {
      transform: "scale(1.25)"
    },
    "&:hover ._oi": {
        boxShadow: "inset 0px -180px 40px -50px rgb(0, 0, 0, 0.75)"
    },
    "&:hover ._a": {
      height: "30px"
    },
    "&:hover ._avt": {
      opacity: 0
    }
  },
  articleHeading: {
    zIndex: 109,
    position: "absolute",
    bottom: theme.spacing(2),
    left: theme.spacing(2),
    color: theme.palette.common.white,
    fontSize: "1.25rem",
    lineHeight: "1.25rem",
    maxWidth: "calc(100% - 50px)",
    "& ._a": {
      overflow: "hidden",
      fontSize: "0.85rem",
      paddingTop: theme.spacing(1),
      height: 0,
      transition: "height 0.2s",
    },
  },
  articleAuthorAvatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    border: "1px solid white"
  },
}));

export default function LatestBlogPosts(props) {

  const classes = useStyles();

  const { rootState } = useContext(RootContext);

  return (
    <Grid container spacing={2}>
      {!rootState.homeDataLoaded? <>
          {[1,2,3,4].map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Skeleton 
                variant="rect"
                height={150}
              />
            </Grid>)
          )}
        </> : <>
          <Grid item xs={12}>
            <Box pt={1} pb={1}>
              <Typography variant="h5">
                Ultimele articole de pe <a href="https://solinfo.ro/blog" target="_blank">Blog</a>
              </Typography>
            </Box>
          </Grid>
          {rootState.home.stats.articles.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <a 
                href={item.link} 
                target="_blank" 
                data-name={item.title}
                onClick={(event) => ReactGA.event({
                  category: "Blog",
                  action: "Opened a blog article",
                  value: event.currentTarget.getAttribute('data-name'), // to fix
                })}
              >
                <Paper className={`${classes.articleWrapper} cool-sha`}>
                  <Avatar alt={item.author.name} src={item.author.avatar} className="_avt" />
                  <div className="_i" style={{backgroundImage: `url(${item.thumbnail})`}}></div>
                  <div className="_oi"/>
                  <Typography className={classes.articleHeading}>
                    {item.title}
                    <Box className="_a">
                      <Grid container alignItems="center">
                        <Grid item>
                          <Avatar alt={item.author.name} src={item.author.avatar} className={classes.articleAuthorAvatar} />
                        </Grid>
                        <Grid item>
                          <Box pl={1}>
                            {item.author.name}
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </Typography>
                </Paper>
              </a>
            </Grid>
          ))}
        </>
      }
    </Grid>
  );
}
