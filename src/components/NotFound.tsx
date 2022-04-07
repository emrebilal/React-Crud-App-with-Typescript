import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { Button, Typography } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import BlockIcon from "@material-ui/icons/Block";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  card: {
    padding: "3rem 0"
  },

  blockIcon: {
    fontSize: "12rem"
  }
});

export default function NotFound() {
  const classes = useStyles();

  return (
    <Card variant="outlined" className={classes.card}>
      <CardContent>
        <Grid container justify="center" alignItems="center" spacing={5}>
          <Grid item xs={12}>
            <Grid container justify="center">
              <BlockIcon color="disabled" className={classes.blockIcon} />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container justify="center">
              <Typography variant="h5" color="textSecondary" align="center">
                The page is not found.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container justify="center">
              <Button variant="contained" component={Link} to="/" disableElevation>
                Back to homepage
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
