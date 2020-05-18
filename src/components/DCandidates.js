import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as action from "../actions/dCandidate";
import DCandidateForm from "./DCandidatesForm";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";
import {
  Grid,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  withStyles,
  ButtonGroup,
  Button,
} from "@material-ui/core";

const styles = (theme) => ({
  root: {
    "& .MuiTableCell-head": {
      fontSize: "1.25rem",
    },
  },
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
});

const DCandidates = ({ classes, ...props }) => {
  const { addToast } = useToasts();

  const [currentId, setCurrentId] = useState(0);
  //console.log(props);

  useEffect(() => {
    props.fetchAllCandidates();
  }, []);

  const onDelete = (id) => {
    if (window.confirm("Are you sure to delete to record?"))
      props.deleteDCandidate(id, () =>
        addToast("Deleted Successfully", { appearance: "info" })
      );
  };

  return (
    <Paper className={classes.paper} elevation={3}>
      <Grid container>
        <Grid item xs={6}>
          <DCandidateForm {...{ currentId, setCurrentId }} />
        </Grid>
        <Grid item xs={6}>
          <TableContainer>
            <Table>
              <TableHead className={classes.root}>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Mobile</TableCell>
                  <TableCell>Blood Group</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.dCandidateList.map((record, index) => {
                  return (
                    <TableRow key={index} hover>
                      <TableCell>{record.fullName}</TableCell>
                      <TableCell>{record.mobile}</TableCell>
                      <TableCell>{record.bloodGroup}</TableCell>
                      <TableCell>
                        <ButtonGroup variant="text">
                          <Button
                            onClick={() => {
                              setCurrentId(record.id);
                            }}
                          >
                            <EditIcon color="primary" />
                          </Button>
                          <Button onClick={() => onDelete(record.id)}>
                            <DeleteIcon color="secondary" />
                          </Button>
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Paper>
  );
};

const mapStateToProps = (state) => ({
  dCandidateList: state.dCandidate.list,
});

const mapActionToProps = {
  fetchAllCandidates: action.fetchAll,
  deleteDCandidate: action.Delete,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(DCandidates));
