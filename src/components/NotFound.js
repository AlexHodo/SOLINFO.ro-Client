import React, { useContext } from "react";
import { RootContext } from "./../contexts/Context";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/styles/makeStyles";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import MetaTags from "react-meta-tags";
import { Link, useParams } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  errorImg: {
    width: "100%",
    margin: "2rem auto",
    maxWidth: "400px",
    display: "block",
  },
  wrapper: {
    textAlign: "center",
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function NotFound() {
  const { rootState } = useContext(RootContext);

  const classes = useStyles();

  return (
    <>
      <MetaTags>
        <title>Pagina nu a fost găsită | SOLINFO.ro</title>
      </MetaTags>
      <Container maxwidth="md">
        <Grid container direction="column" alignItems="center">
          <Grid item xs={11} sm={8} md={6} lg={5} className={classes.wrapper}>
            <Typography
              align="center"
              variant="h4"
              component="h1"
              className={classes.title}
            >
              Pagina nu a fost găsită
            </Typography>
            <img
              alt="error 404"
              src={`${rootState.fileDomain}/client/illustration_404.svg`}
              className={classes.errorImg}
            />
            <Link to="/">
              <Button
                color="primary"
                variant="contained"
                disableElevation
                endIcon={<HomeIcon />}
              >
                Înapoi acasă
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
