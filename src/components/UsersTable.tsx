import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Link } from "react-router-dom";
import { IGetUsersResponseModel } from "../services/models";
import { CrudService } from "../services/CrudService";
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  container: {
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));

export default function UsersTable() {
  const classes = useStyles();
  const crudService = CrudService();
  const history = useHistory();
  const [users, setUsers] = useState<Array<IGetUsersResponseModel>>([]);

  useEffect(() => {
    const fetchData = async () => {
      await crudService.getUsers().then((r: Array<IGetUsersResponseModel>) => {
        setUsers(r);
      });
    }
    fetchData();
  }, []);

  const userDelete = async (id: number) => {
    const isSuccesfull = await crudService.deleteUser(id);
    if (isSuccesfull){
      window.location.reload();
    } else {
      console.log("Unexpected error!");
    }
  }

  const userUpdate = (id: number) => {
    history.push("/update/"+id);
  }
  
  return (
    <div className={classes.root}>
      <Container className={classes.container} maxWidth="lg">    
        <Paper className={classes.paper}>
          <Box display="flex">
            <Box flexGrow={1}>
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Users
              </Typography>
            </Box>
            <Box>
              <Link to="/create">
                <Button variant="contained" color="primary">
                  CREATE
                </Button>
              </Link>
            </Box>
          </Box>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">Id</TableCell>
                  <TableCell align="left">First Name</TableCell>
                  <TableCell align="left">Last Name</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users?.length > 0 ? (users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell align="right">{user.id}</TableCell>
                    <TableCell align="left">{user.FirstName}</TableCell>
                    <TableCell align="left">{user.LastName}</TableCell>
                    <TableCell align="left">{user.Email}</TableCell>
                    <TableCell align="center">
                      <ButtonGroup color="primary" aria-label="outlined primary button group">
                        <Button onClick={() => userUpdate(user.id)}>Edit</Button>
                        <Button onClick={() => userDelete(user.id)}>Delete</Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))) : (
                <Typography> No data </Typography>)}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </div>
  );
}
