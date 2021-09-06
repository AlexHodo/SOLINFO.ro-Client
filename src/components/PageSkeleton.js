import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

const Problem = () => {
	return <Box pt={3} pb={3}>
        <Grid container>
              <Grid item xs={12}>
                <Grid container justify="center" alignItems="center">
                  <Grid item xs={12}>
                  	<Grid container>
                  		<Grid xs={3} sm={2} md={1}>
                  			<Box pr={1}>
                  				<Skeleton animation="wave" height={20} />
                  			</Box>
                  		</Grid>
                  		<Grid xs={3} sm={2} md={1}>
                  			<Box pr={1}>
                  				<Skeleton animation="wave" height={20} />
                  			</Box>
                  		</Grid>
                  		<Grid xs={3} sm={2} md={1}>
                  			<Box pr={1}>
                  				<Skeleton animation="wave" height={20} />
                  			</Box>
                  		</Grid>
                  	</Grid>
                  </Grid>
                  <Grid item xs={12}>
                  	<Skeleton animation="wave" height={45} width={200} style={{marginTop: "-0.3rem"}} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Skeleton height={1} style={{margin: "1.25rem 0"}} />
             </Grid>
             <Grid item xs={12} sm={8} md={9}>
             	<Grid container>
              		<Grid item xs={6}>
              			<Skeleton animation="wave" height={40} width={125} />
              		</Grid>
              		<Grid item xs={6}>
              			<Skeleton animation="wave" height={40} width={150} style={{float: "right"}}/>
              		</Grid>
              		<Grid item xs={12}>
              			<Skeleton animation="wave" height={80}/>
              		</Grid>
              		<Grid item xs={12} style={{marginTop: "-1rem"}}>
              			<Skeleton animation="wave" height={80}/>
              		</Grid>
              		<Grid item xs={12} style={{marginTop: "1rem"}}>
              			<Skeleton animation="wave" height={40} width={150} />
              		</Grid>
              		<Grid item xs={12}>
              			<Skeleton animation="wave" height={25} />
              		</Grid>
              		<Grid item xs={12}>
              			<Skeleton animation="wave" height={25} />
              		</Grid>
              		<Grid item xs={12}>
              			<Skeleton animation="wave" height={25} width={100} />
              		</Grid>
              	</Grid>
             </Grid>
             <Grid item xs={12} sm={4} md={3}>
             	<Grid container justifyContent="flex-end">
             		<Grid item xs={12}>
             			<Box pl={2}>
             				<Skeleton animation="wave" height={40} width={125} />
             				<Skeleton animation="wave" height={60} />
             				<Skeleton animation="wave" height={60} />
             				<Skeleton animation="wave" height={60} />
             			</Box>
             		</Grid>
             	</Grid>
             </Grid>

        </Grid>
        </Box>
}

const Profile = () => {
	return <Box pt={3} pb={3}>
        <Grid container>
              <Grid item xs={12}>
                <Grid container justify="center" alignItems="center" style={{marginTop: "175px"}}>
                	<Grid item xs={4} md={3} lg={2}>
                		<Skeleton animation="wave" variant="circle" width="125px" height="125px" />
                	</Grid>
                  <Grid item xs={8} md={9} lg={10}>
                  	<Skeleton animation="wave" height={60} width={200}/>
                  	<Skeleton animation="wave" height={45} width={150} />
                  	<Skeleton animation="wave" height={40} width={175} />
                  </Grid>
                  <Grid item xs={12}>
                  	<Grid container spacing={2}>
                  		<Grid item xs={12} md={6} lg={3}>
                  			<Skeleton animation="wave" height={125} />
                  		</Grid>
                  		<Grid item xs={12} md={6} lg={3}>
                  			<Skeleton animation="wave" height={125} />
                  		</Grid>
                  		<Grid item xs={12} md={6} lg={3}>
                  			<Skeleton animation="wave" height={125} />
                  		</Grid>
                  		<Grid item xs={12} md={6} lg={3}>
                  			<Skeleton animation="wave" height={125} />
                  		</Grid>
                  	</Grid>
                  </Grid>
                  <Grid item xs={12} style={{marginTop: "1rem"}}>
                  	<Skeleton animation="wave" height={60} width={250} />
                  	<Skeleton animation="wave" height={20} />
                  	<Skeleton animation="wave" height={20} />
                  	<Skeleton animation="wave" height={20} width={100} />
                  </Grid>
                </Grid>
              </Grid>
        </Grid>
        </Box>
}

export default function PageSkeleton(params) {

	let { type } = params;

	return <>
		<Container maxWidth="md" style={{minHeight: "100vh"}}>
			{type === "problem" && <Problem />}
			{type === "profile" && <Profile />}
    </Container>
	</>

}