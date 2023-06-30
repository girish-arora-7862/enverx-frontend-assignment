import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import React, { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { getData, setData } from "../../firebase";
import { useDispatch } from "react-redux";
import { setStoreData } from "../../store/dataSlice";
import Typography from "@mui/material/Typography";

const categoryList = [
  {
    value: "Groceries",
    label: "Groceries",
  },
  {
    value: "Rent",
    label: "Rent",
  },
  {
    value: "Salary",
    label: "Salary",
  },
];

const AddExpense = () => {
  const [formValues, setFormValues] = useState({
    itemName: "",
    description: "",
    amount: "",
    category: "",
  });
  const [formValuesTouched, setFormValuesTouched] = useState({
    itemName: false,
    description: false,
    amount: false,
    category: true,
  });
  const [formValuesError, setFormValuesError] = useState({
    itemName: "",
    description: "",
    amount: "",
    category: "",
  });
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();

  const requiredValidationHandler = (
    fieldName,
    error,
    formValues,
    formValuesTouched
  ) => {
    if (formValuesTouched[fieldName]) {
      if (formValues[fieldName] === "") {
        setFormValuesError((values) => {
          return {
            ...values,
            [fieldName]: error,
          };
        });
      } else {
        setFormValuesError((values) => {
          return {
            ...values,
            [fieldName]: "",
          };
        });
      }
    }
  };

  const onChangeHandler = (event, fieldName, error) => {
    setFormValues((values) => {
      return { ...values, [fieldName]: event.target.value };
    });
    requiredValidationHandler(
      fieldName,
      error,
      { ...formValues, [fieldName]: event.target.value },
      formValuesTouched
    );
  };

  const onBlurHandler = (fieldName, error) => {
    setFormValuesTouched((values) => {
      return { ...values, [fieldName]: true };
    });
    requiredValidationHandler(fieldName, error, formValues, {
      ...formValuesTouched,
      [fieldName]: true,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    await setData({ ...formValues, date: new Date() });
    dispatch(setStoreData((await getData()).data));
    setLoading(false);
    setFormValues({
      itemName: "",
      description: "",
      amount: "",
      category: "",
    });
    setFormValuesError({
      itemName: "",
      description: "",
      amount: "",
      category: "",
    });
    setFormValuesTouched({
      itemName: false,
      description: false,
      amount: false,
      category: true,
    });
  };

  const commonStyle = { marginBottom: "18px" };

  return (
    <div>
      <Typography style={commonStyle} variant="h2" gutterBottom>
        Add New Transactions
      </Typography>
      <Box component="form" noValidate autoComplete="off">
        <TextField
          style={commonStyle}
          id="outlined-basic"
          label="Name"
          variant="outlined"
          type="text"
          error={!!formValuesError.itemName}
          helperText={formValuesError.itemName}
          fullWidth
          value={formValues.itemName}
          onBlur={() => onBlurHandler("itemName", "Name is required")}
          onChange={(event) =>
            onChangeHandler(event, "itemName", "Name is required")
          }
        />
        <br />
        <TextField
          style={commonStyle}
          id="outlined-basic"
          label="Description"
          variant="outlined"
          required
          type="text"
          error={!!formValuesError.description}
          helperText={formValuesError.description}
          fullWidth
          value={formValues.description}
          onBlur={() => onBlurHandler("description", "Description is required")}
          onChange={(event) =>
            onChangeHandler(event, "description", "Description is required")
          }
        />
        <br />
        <TextField
          style={commonStyle}
          id="outlined-basic"
          label="Amount"
          variant="outlined"
          required
          type="number"
          error={!!formValuesError.amount}
          helperText={formValuesError.amount}
          fullWidth
          value={formValues.amount}
          onBlur={() => onBlurHandler("amount", "Amount is required")}
          onChange={(event) =>
            onChangeHandler(event, "amount", "Amount is required")
          }
        />
        <br />
        <TextField
          style={commonStyle}
          id="outlined-select-currency"
          select
          label="Category"
          defaultValue={""}
          error={!!formValuesError.category}
          helperText={formValuesError.category}
          fullWidth
          value={formValues.category}
          onChange={(event) =>
            onChangeHandler(event, "category", "Category is required")
          }
        >
          {categoryList.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <br />
        <LoadingButton
          style={commonStyle}
          size="large"
          onClick={handleSubmit}
          loading={loading}
          variant="outlined"
          disabled={
            !formValues.itemName ||
            !formValues.description ||
            formValues.amount === "" ||
            !formValues.category
          }
        >
          <span>Sumbit</span>
        </LoadingButton>
      </Box>
    </div>
  );
};

export default AddExpense;
