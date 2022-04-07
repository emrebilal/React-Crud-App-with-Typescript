import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useParams, useHistory, Link } from 'react-router-dom';
import { CrudService } from "../services/CrudService";
import { IAddUserModel, IGetUsersResponseModel } from "../services/models";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

type Params = {
  id: string;
};

export default function UserUpdate() {
  const classes = useStyles();
  const crudService = CrudService();
  const history = useHistory();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const { id } = useParams<Params>();

  useEffect(() => {
    const fetchData = async () => {
      await crudService.getUser(id).then((r: IGetUsersResponseModel) => {
        setFirstName(r.FirstName);
        setLastName(r.LastName);
        setEmail(r.Email);
      });
    }
    fetchData();
  }, [id]);
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    var data: IAddUserModel = {
      FirstName: firstName,
      LastName: lastName,
      Email: email
    }
    
    const isSuccesfull = await crudService.updateUser(data, id);
    if (isSuccesfull) {
      history.push("/");
    } else {
      console.log("Unexpected error!");
    }
  }

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          User
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Update
          </Button>
          <Button
            fullWidth
            variant="contained"
            component={Link} to="/"
          >
            Cancel
          </Button>
        </form>
      </div>
    </Container>
  );
}
