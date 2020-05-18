import React, { useState, useEffect } from "react";

const useForm = (initialFieldValues, validate, setCurrentId) => {
  const [values, setValues] = useState(initialFieldValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const fieldValue = { [name]: value };
    //console.log(values);
    setValues({
      ...values,
      [name]: value,
    });
    validate(fieldValue);
  };

  const resetForm = () => {
    setValues({ ...initialFieldValues });
    setErrors({});
    setCurrentId(0);
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  };
};

export default useForm;
