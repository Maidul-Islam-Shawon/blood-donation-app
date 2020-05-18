import React, { useEffect } from "react";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as action from "../actions/dCandidate";
import { useToasts } from "react-toast-notifications";
import {
  Grid,
  TextField,
  withStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  FormHelperText,
} from "@material-ui/core";

const styles = (theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      minWidth: 230,
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 230,
  },
  smMargin: {
    margin: theme.spacing(1),
  },
});

const initialFieldValues = {
  fullName: "",
  mobile: "",
  email: "",
  age: "",
  bloodGroup: "",
  address: "",
};

const DCandidatesForm = ({ classes, ...props }) => {
  const { addToast } = useToasts();

  const validate = (fieldvalues = values) => {
    let temp = { ...errors };
    if ("fullName" in fieldvalues)
      temp.fullName = fieldvalues.fullName ? "" : "This field is required!";
    if ("mobile" in fieldvalues)
      temp.mobile = fieldvalues.mobile ? "" : "This field is required!";
    if ("bloodGroup" in fieldvalues)
      temp.bloodGroup = fieldvalues.bloodGroup ? "" : "This field is required!";
    if ("email" in fieldvalues)
      temp.email = /^$|.+@.+..+/.test(fieldvalues.email)
        ? ""
        : "email is not valid";
    setErrors({
      ...temp,
    });
    if (fieldvalues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  } = useForm(initialFieldValues, validate, props.setCurrentId);

  //material UI Select
  // const inputLabel = useRef(null);
  // const [labelWidth, setLabelWidth] = useState(0);

  // useEffect(() => {
  //   setLabelWidth(inputLabel.current.offsetWidth);
  // }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const onSuccess = () => {
        resetForm();
        addToast("Submitted Successfully", { appearance: "success" });
      };
      console.log("validation done.");

      if (props.currentId === 0) {
        props.createDCandidate(values, onSuccess);
      } else {
        props.updateDCandidate(props.currentId, values, onSuccess);
      }

      //window.alert("validation passed");
      //console.log(values);
    }
  };

  useEffect(() => {
    if (props.currentId !== 0) {
      setValues({
        ...props.dCandidateList.find((x) => x.id === props.currentId),
      });
      setErrors({});
    }
  }, [props.currentId]);

  return (
    <form
      autoComplete="off"
      noValidate
      className={classes.root}
      onSubmit={handleSubmit}
    >
      <Grid container>
        <Grid item xs={6}>
          <TextField
            name="fullName"
            variant="outlined"
            label="Full Name"
            value={values.fullName}
            onChange={handleInputChange}
            // error={true}
            // helperText={errors.fullName}
            {...(errors.fullName && {
              error: true,
              helperText: errors.fullName,
            })}
          />

          <TextField
            name="email"
            variant="outlined"
            label="Email"
            value={values.email}
            onChange={handleInputChange}
            {...(errors.email && { error: true, helperText: errors.email })}
          />

          {/* <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel ref={inputLabel}>Blood Group</InputLabel>
            <Select
              name="bloodGroup"
              value={values.bloodGroup}
              onChange={handleInputChange}
              labelWidth={labelWidth}
            >
              <MenuItem value="">Select Blood Group</MenuItem>
              <MenuItem value="A+">A +ve</MenuItem>
              <MenuItem value="A-">A -ve</MenuItem>
              <MenuItem value="B+">B +ve</MenuItem>
              <MenuItem value="B-">B -ve</MenuItem>
              <MenuItem value="AB+">AB +ve</MenuItem>
              <MenuItem value="AB-">AB -ve</MenuItem>
              <MenuItem value="O+">O +ve</MenuItem>
              <MenuItem value="O-">O -ve</MenuItem>
            </Select>
          </FormControl> */}

          <FormControl
            variant="outlined"
            className={classes.formControl}
            {...(errors.bloodGroup && { error: true })}
          >
            <InputLabel id="demo-simple-select-outlined-label">
              Blood Group
            </InputLabel>
            <Select
              name="bloodGroup"
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={values.bloodGroup}
              onChange={handleInputChange}
              label="bloodGroup"
            >
              <MenuItem value="">Select Blood Group</MenuItem>
              <MenuItem value="A+">A +ve</MenuItem>
              <MenuItem value="A-">A -ve</MenuItem>
              <MenuItem value="B+">B +ve</MenuItem>
              <MenuItem value="B-">B -ve</MenuItem>
              <MenuItem value="AB+">AB +ve</MenuItem>
              <MenuItem value="AB-">AB -ve</MenuItem>
              <MenuItem value="O+">O +ve</MenuItem>
              <MenuItem value="O-">O -ve</MenuItem>
            </Select>
            {errors.bloodGroup && (
              <FormHelperText>{errors.bloodGroup}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <TextField
            name="mobile"
            variant="outlined"
            label="Mobile"
            value={values.mobile}
            onChange={handleInputChange}
            {...(errors.mobile && { error: true, helperText: errors.mobile })}
          />

          <TextField
            name="age"
            variant="outlined"
            label="Age"
            value={values.age}
            onChange={handleInputChange}
          />

          <TextField
            name="address"
            variant="outlined"
            label="Address"
            value={values.address}
            onChange={handleInputChange}
          />

          <div>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.smMargin}
            >
              Submit
            </Button>
            <Button
              variant="contained"
              className={classes.smMargin}
              onClick={resetForm}
            >
              Reset
            </Button>
          </div>
        </Grid>
      </Grid>
    </form>
  );
};

const mapStateToProps = (state) => ({
  dCandidateList: state.dCandidate.list,
});

const mapActionToProps = {
  createDCandidate: action.Create,
  updateDCandidate: action.Update,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(DCandidatesForm));
