import React, { useParams } from "react"
import Typography from "@material-ui/core/Typography"
import { fade, makeStyles } from "@material-ui/core/styles"
import ReactGA from "react-ga"
ReactGA.initialize("UA-199814762-1")

const useStyles = makeStyles((theme) => ({
  heart: {
    color: "#E91E63",
  },
}));

export default function Credits(props) {

	let { align } = props

	const classes = useStyles()

	return <>
		<Typography
      variant="body1"
      align={align}
      style={{fontWeight: 600}}
    >
      Creat cu <span className={classes.heart}>&#10084;</span> de{" "}
      <a
        href="https://instagram.com/alexhodo"
        rel="noreferrer"
        target="_blank"
        onClick={() => {
        	ReactGA.event({
			      category: "Social",
			      action: "Opened Instagram",
			    });
        }}
      >
        Alex Hodo
      </a>
    </Typography>
	</>

}