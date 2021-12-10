import React, { useContext } from "react";
import { RootContext } from "./../contexts/Context";
import { makeStyles, withStyles, fade } from '@material-ui/core/styles';
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonOutlineTwoToneIcon from '@material-ui/icons/PersonOutlineTwoTone';
import { Link } from "react-router-dom";
import LinearProgress from '@material-ui/core/LinearProgress';
import Chip from '@material-ui/core/Chip';
import CheckCircleTwoToneIcon from '@material-ui/icons/CheckCircleTwoTone';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
  problem: {
    color: theme.palette.common.black
  },
  problem_solved: {
    color: theme.palette.success.main,
  },
  chip: {
    color: fade(theme.palette.secondary.main, 0.85),
    borderColor: fade(theme.palette.secondary.main, 0.25),
    fontWeight: "400 !important",
  },
  textRoot: {
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    margin: 0,
    marginRight: theme.spacing(1),
    display: "inline-block",
  },
  problemTitle: {
    fontWeight: 600
  },
  solvedIcon: {
    color: theme.palette.success.main,
    textAlign: "center",
    "& *" : {
      marginLeft: "1rem"
    }
  },
  solvedByChip: {
    marginLeft: theme.spacing(1),
    color: fade(theme.palette.secondary.main, 0.85),
    borderColor: fade(theme.palette.secondary.main, 0.25),
    fontWeight: "400 !important",
    paddingLeft: "0.15rem",
  }
}));

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress);

export default function WeeklyChallenge(props) {

  const classes = useStyles();

  const { rootState } = useContext(RootContext);

  const initialState = {
    props: {
      challenge: props.challenge,
      challengeTotal: props.challengeTotal,
      challengeSolved: props.challengeSolved
    },
    errorMsg: null,
    isLoading: false,
  };

  const [state, setState] = React.useState(initialState);

  return (
    <Box className={`${classes.wrapper}`}>
      <List aria-label="Provocare saptamana" dense>
        {state.props.challenge.map((item, index) => {
          return (
            <Link to={`/problema/${item.name}?utm_source=challenge`} key={index}>
              <ListItem button className={`${classes.problem} ${item.solved && classes.problem_solved}`}>
                <ListItemText 
                  classes={{root: classes.textRoot, primary: classes.problemTitle}} 
                  primary={item.name}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                      >
                        #{item.problem_id}
                      </Typography>
                      <Typography
                        component="span"
                        variant="body2"
                      >
                        <Tooltip title={`Rezolvată de ${item.count_solved_by} persoane`}>
                          <Chip
                            size="small"
                            variant="outlined"
                            icon={<PersonOutlineTwoToneIcon />}
                            label={item.count_solved_by}
                            className={classes.solvedByChip}
                          />
                        </Tooltip>
                      </Typography>
                    </React.Fragment>
                  }
                />
                {!item.solved && <Chip label="+3 pct." size="small" variant="outlined" className={classes.chip}/>}
                {item.solved && <ListItemIcon className={classes.solvedIcon}>
                  <CheckCircleTwoToneIcon />
                </ListItemIcon>}
              </ListItem>
            </Link>
          )
        })}        
      </List>
      <Box p={2} pt={0}>
        {rootState.isLoggedIn? <>
          <BorderLinearProgress variant="determinate" value={state.props.challengeSolved * (100 / state.props.challengeTotal)}/>
          <Typography variant="body2" component="p" style={{marginTop: "0.25rem", fontWeight: 600}}>
            {state.props.challengeSolved}/{state.props.challengeTotal} rezolvate.
          </Typography>
        </> : <>
          <Typography variant="body2" component="p" style={{marginTop: "0.25rem"}}>
            <Link to="/cont">Autentifică-te</Link> pentru a vedea progresul personal.
          </Typography>
        </>}
      </Box>
    </Box>
  );
}
