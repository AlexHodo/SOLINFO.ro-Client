import React, { useContext, useEffect } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import MetaTags from "react-meta-tags";
import { Link, useParams, useLocation } from "react-router-dom";
import { RootContext } from "./../contexts/Context";
import NotFound from "./../components/NotFound";
import {
  TransitionGroup,
  CSSTransition
} from "react-transition-group";
import PageSkeleton from "./../components/PageSkeleton";
import LanguageTag from "../components/LanguageTag";
import Hidden from '@material-ui/core/Hidden';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Chip from '@material-ui/core/Chip';
import InfoTwoToneIcon from '@material-ui/icons/InfoTwoTone';

const useStyles = makeStyles((theme) => ({
    solutionContent: {
        width: "calc(100% - 1rem)",
        height: "150px",
        background: "#F6F8FF",
        border: "1px solid #383A3B",
        borderRadius: "5px",
        padding: "0.5rem",
        maxWidth: "calc(100% - 1rem)",
        minWidth: "calc(100% - 1rem)",
    },
    row: {
        padding: "0.5rem 0",
        margin: 0,
        borderTop: "1px solid #383A3B",
        "&:first-child": {
            borderTopWidth: 0
        },
        "&:last-child": {
            paddingBottom: 0
        }
    },
    ml0: {
        marginLeft: "0 !important"
    }
}));

export default function Admin() {
  let { username } = useParams();

  const { API, rootState, langToHljsLang } = useContext(RootContext);

  const defaultState = {
    dataLoaded: false,
    success: null,
    errorMsg: null,
    responseCode: null,
    solutions: [],
    accepted: [],
    rejected: [],
    badges: [],
    points: 0,
    submitting: false,
    count: 0
  };

  const [state, setState] = React.useState(defaultState);

  const classes = useStyles();

  async function logon() {

        await API("endpoint/page/admin.php", {
            "action": "get"
        }).then((logonResponse) => {
            if(logonResponse.success) {
                let solutions = logonResponse.solutions
                let accepted = []
                let rejected = []
                for(let i = 0; i < solutions.length; i++) {
                    if(solutions[i].bot_code == 4) {
                        accepted.push(solutions[i].sid)
                    } else if(solutions[i].bot_code >= 2) {
                        rejected.push(solutions[i].sid)
                    }
                }
                setState({
                    ...state,
                    success: true,
                    dataLoaded: true,
                    solutions: solutions,
                    count: logonResponse.count,
                    accepted: accepted,
                    rejected: rejected
                })
            } else {
                setState({
                    ...state,
                    success: false,
                    dataLoaded: true
                })
            }
        });

    }

  useEffect(() => {

    logon();

  }, []);

    const accept = (event) => {
        let accepted = state.accepted;
        let rejected = state.rejected;
        if(event.target.checked) {
            accepted.push(event.target.value)
            const index = rejected.indexOf(event.target.value);
            if(index > -1) {
                rejected.splice(index, 1);
            }
        } else {
            const index = accepted.indexOf(event.target.value);
            if(index > -1) {
                accepted.splice(index, 1);
            }
        }
        setState({
            ...state,
            accepted: accepted,
            rejected: rejected
        })
    }

    const reject = (event) => {
        let accepted = state.accepted;
        let rejected = state.rejected;
        if(event.target.checked) {
            rejected.push(event.target.value)
            const index = accepted.indexOf(event.target.value);
            if(index > -1) {
                accepted.splice(index, 1);
            }
        } else {
            const index = rejected.indexOf(event.target.value);
            if(index > -1) {
                rejected.splice(index, 1);
            }
        }
        setState({
            ...state,
            accepted: accepted,
            rejected: rejected
        })
    }

    const submit = async () => {
        setState({
            ...state,
            submitting: true
        })
        await API("endpoint/page/admin.php", {
            "action": "submit",
            "accept": state.accepted,
            "reject": state.rejected
        }).then((response) => {
            if(response.success) {

                setState(defaultState)
                window.scrollTo(0, 0)
                logon()

            } else {
                window.alert(response.errorMsg)
                setState({
                    ...state,
                    submitting: false
                })
            }
        });
    }

  return (
    <>
    {!state.dataLoaded && <PageSkeleton type="problem" />}
    {state.dataLoaded && !state.success && <NotFound />}   
    {state.dataLoaded && state.success && (
        <div>
            <MetaTags>
                <title>
                    Pagina administratorilor | SOLINFO.ro
                </title>
            </MetaTags>  
            <Container maxWidth="md" style={{minHeight: "100vh"}}>
                <Grid container className={classes.content}>
                    <Grid item xs={12} component={Box} mb={3}>
                        <Box pt={3}>
                        <Typography variant="h5" style={{fontWeight: 600}}>
                            Moderare soluții submise {state.count > 0 && <Chip label={state.count} color="primary" style={{fontSize: "1.15rem"}} />}
                        </Typography>
                        </Box>
                    </Grid>
                    <Grid item className={`cool-sha`} component={Card} xs={12}>
                        <CardContent className={classes.previewCardRoot} component={Box} p={2}>
                            {state.solutions.length === 0 && <>
                                <center style={{marginBottom: "-6px"}}>Nimic nou.</center>
                            </>}
                            {state.solutions.map((solution, key) => {
                                return <Grid container className={classes.row}>
                                    <Grid item xs={12} md={3} component={Box} mb={1}>
                                        #<a href={`https://www.pbinfo.ro/probleme/${solution.pid}`} target="_blank"><b>{solution.pid} {solution.name}</b></a>
                                        <br/>ID soluție: #{solution.sid}
                                        {solution.from_extension && <><br/>Prin extensie.</>}
                                        {solution.from_import && <><br/>Prin import.</>}
                                    </Grid>
                                    <Grid item xs={12} md={3} component={Box} mb={1}>
                                        @<a href={`https://solinfo.ro/profil/${solution.username}`} target="_blank"><b>{solution.username}</b></a>
                                        {solution.already_solved && <><br/>A rezolvat deja problema.</>}
                                        {solution.is_weekly_challenge && <><br/>Provocare săptămânală.</>}
                                        {solution.solved_in_weekly_challenge && <><br/>A rezolvat deja provocarea.</>}
                                    </Grid>
                                    <Grid item xs={12} md={6} component={Box} mb={0}>
                                        <Grid container component={Box} mb={1}>
                                            <Grid item xs={6}>
                                                <LanguageTag language={solution.language? solution.language : null} className={classes.ml0}/>
                                            </Grid>
                                            <Grid item xs={6} style={{textAlign: "right"}}>
                                                <CopyToClipboard text={solution.content}>
                                                    <Button disableElevation variant="contained" color="primary" size="small" component={Box} ml={2}>Copiază</Button>
                                                </CopyToClipboard>
                                            </Grid>
                                        </Grid>
                                        <textarea class={classes.solutionContent} defaultValue={solution.content}></textarea>
                                        <Box py={1}>
                                            <Chip 
                                                icon={<InfoTwoToneIcon />} 
                                                color={solution.bot_code == -1? "default": (solution.bot_code == 4? "primary" : "secondary")}
                                                label={<>
                                                    {solution.bot_code > -1 && <><b>Cod {solution.bot_code}</b>{" "}</>}
                                                    <span>{solution.bot_message}</span>
                                                </>}
                                            />
                                        </Box>
                                        <FormControl component="fieldset" component={Box}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox color="primary" value={solution.sid} onChange={accept} checked={state.accepted.indexOf(solution.sid) > -1} />
                                                }
                                                label="Acceptă"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox color="secondary" value={solution.sid} onChange={reject} checked={state.rejected.indexOf(solution.sid) > -1} />
                                                }
                                                label="Respinge"
                                            />
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            })}
                            {state.solutions.length > 0 && <Box mt={3} style={{textAlign: "center"}}>
                                <Button size="large" variant="contained" disabled={state.submitting} disableElevation color="primary" onClick={() => submit()}>Rulează</Button>
                            </Box>}
                        </CardContent>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )}
  </>)
}
