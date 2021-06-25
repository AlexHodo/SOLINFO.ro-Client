import React, { useContext } from "react";
import { RootContext } from "./../contexts/Context";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    "&.align_left": {
      textAlign: "left",
    },
    "&.align_center": {
      textAlign: "center",
    },
    "&.align_right": {
      textAlign: "right",
    },
  },
  bullet: {
    padding: theme.spacing(0, 1),
    display: "inline",
  },
  text: {
    marginTop: theme.spacing(-0.5),
    "&.align_left": {
      textAlign: "left",
    },
    "&.align_center": {
      textAlign: "center",
    },
    "&.align_right": {
      textAlign: "right",
    },
  },
}));

export default function CustomRating(props) {
  const classes = useStyles();

  const { API } = useContext(RootContext);

  const initialState = {
    props: {
      value: props.defaultValue ? parseFloat(props.defaultValue) : 0,
      maxValue: props.maxValue ? props.maxValue : 0,
      ratingCount: props.ratingCount ? props.ratingCount : 0,
      ratingValue: props.ratingValue ? props.ratingValue : 0,
      size: props.size ? props.size : "small",
      solutionId: props.solutionId ? props.solutionId : -1,
      alignClassName: props.align ? `align_${props.align}` : "align_left",
      readOnly: props.readOnly ? props.readOnly : false,
      userHasVoted: props.userHasVoted ? props.userHasVoted : false,
      userRating: props.userRating ? props.userRating : null,
    },
    errorMsg: null,
    isLoading: false,
  };

  const [state, setState] = React.useState(initialState);

  const initialHover = initialState.props.userRating
    ? initialState.props.userRating
    : -1;
  const [hover, setHover] = React.useState(initialHover);

  const submit = async (rating) => {
    if (rating == null) {
      rating = Math.ceil(state.props.value * 2) / 2;
    }

    setState({
      ...state,
      isLoading: true,
      errorMsg: null,
    });

    const request = await API("endpoint/module/rating.php", {
      solutionId: state.props.solutionId,
      rating: rating,
    });

    if (request.success) {
      setState({
        ...state,
        props: {
          ...state.props,
          value: request.new_values.value,
          ratingCount: request.new_values.rating_count,
          ratingValue: request.new_values.rating_value,
          userRating: rating,
        },
        isLoading: false,
      });
    } else {
      setState({
        ...state,
        isLoading: false,
        errorMsg: request.errorMsg,
      });
    }
  };

  return (
    <Box className={`${classes.wrapper} ${state.props.alignClassName}`}>
      <span name={state.props.solutionId} />
      <Rating
        value={state.props.value}
        precision={0.5}
        size={state.props.size}
        readOnly={state.props.readOnly || state.isLoading}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        onChange={(event, newValue) => {
          submit(newValue);
        }}
      />
      <Typography
        variant="caption"
        display="block"
        className={`${classes.text} ${state.props.alignClassName}`}
      >
        {state.props.maxValue
          ? `${state.props.value}/${state.props.maxValue}`
          : `${state.props.value}/5`}
        <div className={classes.bullet}>&#8226;</div>
        {props.ratingCount && <>{state.props.ratingCount} voturi</>}
        {hover !== -1 && (
          <>
            <div className={classes.bullet}>&#8226;</div>
            Nota ta: {hover}
          </>
        )}
        {hover === -1 && state.props.userRating && (
          <>
            <div className={classes.bullet}>&#8226;</div>
            Nota ta: {state.props.userRating}
          </>
        )}
        {state.errorMsg && (
          <>
            <br />
            {state.errorMsg}
          </>
        )}
      </Typography>
    </Box>
  );
}
