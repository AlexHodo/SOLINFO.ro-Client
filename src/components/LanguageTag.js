import react from 'react';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import { makeStyles, fade } from "@material-ui/core/styles";
import { SiCplusplus, SiPhp, SiPython, SiJava } from "react-icons/si";

const useStyles = makeStyles((theme) => ({
	wrapper: {
		background: fade(theme.palette.secondary.main, 0.15),
		"&--ml": {
			marginLeft: "0.5rem !important"
		}
	},
	icon: {
		color: theme.palette.primary.main,
		fontSize: "1.25rem"
	},
	text: {
		color: theme.palette.secondary.main,
		fontWeight: 600
	}
}));

export default function LanguageTag(props) {

	const classes = useStyles()

	let { language, noMargin } = props;

	let wrapperClassName = `${classes.wrapper}${!noMargin && "--ml"}`
	
	return (
		<>
			{language == "c" && <Chip
				className={wrapperClassName}
        label={<span className={classes.text}>C</span>}
        {...props}
      />}
			{language == "cpp" && <Chip
				className={wrapperClassName}
        icon={<SiCplusplus className={classes.icon} />}
        label={<span className={classes.text}>C++</span>}
        {...props}
      />}
      {language == "php" && <Chip
				className={wrapperClassName}
        icon={<SiPhp className={classes.icon} />}
        label={<span className={classes.text}>PHP</span>}
        {...props}
      />}
      {language == "java" && <Chip
				className={wrapperClassName}
        icon={<SiJava className={classes.icon} />}
        label={<span className={classes.text}>Java</span>}
        {...props}
      />}
      {language == "python" && <Chip
				className={wrapperClassName}
        icon={<SiPython className={classes.icon} />}
        label={<span className={classes.text}>Python</span>}
        {...props}
      />}
      {language == "pascal" && <Chip
				className={wrapperClassName}
        label={<span className={classes.text}>Pascal</span>}
        {...props}
      />}
		</>
	)

}