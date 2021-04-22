import React, { useState } from "react";
import {
  createMuiTheme,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import { AddButton } from "components/UI/Buttons/Buttons";
import { useDispatch } from "react-redux";
import {
  generateSpecificDateSales,
  generateRangeDateSales,
} from "redux/actions/reporting/reporting";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    // minWidth: 200,
    width: "100%",
  },
  datePickerInput: {
    width: "95%",
  },
  datePicker: {
    margin: "0 30px",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    flexGrow: 1,
    textAlign: "center",
  },
}));

const defaultMaterialTheme = createMuiTheme({
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: green[700],
      },
    },
    MuiPickersDay: {
      daySelected: {
        backgroundColor: green[400],
        "&:hover": {
          backgroundColor: green[700],
          color: "white",
        },
      },
      current: {
        color: green[900],
      },
    },
    MuiPickersModal: {
      dialogAction: {
        color: green[400],
      },
    },
    MuiPickersYear: {
      yearSelected: {
        color: green[700],
      },
      root: {
        "&:focus": {
          color: green[700],
        },
      },
    },
    MuiPickersMonth: {
      monthSelected: {
        color: green[700],
      },
      root: {
        "&:focus": {
          color: green[700],
        },
      },
    },
  },
});

const SalesReporting = () => {
  const classes = useStyles();

  const [reportType, setReportType] = useState("");

  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const [initDate, setInitDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());

  const handleInitDate = (date) => {
    setInitDate(date);
  };

  const handleEndDate = (date) => {
    setEndDate(date);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleChange = (event) => {
    setReportType(event.target.value);
  };

  const dispatch = useDispatch();

  const onHandleReport = () => {
    if (reportType === "specificDate") {
      dispatch(generateSpecificDateSales(selectedDate));
    } else if (reportType === "dateRange") {
      dispatch(generateRangeDateSales(initDate, endDate));
    }
  };

  return (
    <React.Fragment>
      <ThemeProvider theme={defaultMaterialTheme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <Divider style={{ margin: "1rem 0 2rem 0" }} />
          <Typography variant="h5" align="center">
            Reportería Ventas
          </Typography>
          <Grid container style={{ margin: "20px 0" }} className="text-center">
            <Grid item xs={12}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Tipo de Reporte
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={reportType}
                  onChange={handleChange}
                  label="Tipo de Reporte"
                >
                  <MenuItem value="specificDate">Fecha Específica</MenuItem>
                  <MenuItem value="dateRange">Rango de Fechas</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              {reportType === "specificDate" ? (
                <Grid item xs={12}>
                  <FormControl
                    variant="outlined"
                    // className={[classes.formControl]}
                    style={{
                      alignSelf: "center",
                      width: "30%",
                      margin: "30px 0 20px 0",
                    }}
                  >
                    <KeyboardDatePicker
                      autoOk
                      disableToolbar
                      variant="inline"
                      format="MM/DD/YYYY"
                      margin="normal"
                      id="date-picker-inline"
                      label="Seleccionar fecha"
                      value={selectedDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                      disableFuture
                      inputVariant="outlined"
                    />
                  </FormControl>
                </Grid>
              ) : (
                reportType === "dateRange" && (
                  <Grid container direction="row">
                    <Grid item md={6}>
                      <FormControl
                        variant="outlined"
                        className={[classes.datePickerInput]}
                      >
                        <KeyboardDatePicker
                          autoOk
                          disableToolbar
                          variant="inline"
                          format="MM/DD/YYYY"
                          margin="normal"
                          id="date-picker-inline"
                          label="Desde"
                          value={initDate}
                          onChange={handleInitDate}
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                          disableFuture
                          inputVariant="outlined"
                        />
                      </FormControl>
                    </Grid>
                    <Grid item md={6}>
                      <FormControl
                        variant="outlined"
                        className={[classes.datePickerInput]}
                      >
                        <KeyboardDatePicker
                          autoOk
                          disableToolbar
                          variant="inline"
                          format="MM/DD/YYYY"
                          margin="normal"
                          id="date-picker-inline"
                          label="Hasta"
                          value={endDate}
                          onChange={handleEndDate}
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                          disableFuture
                          inputVariant="outlined"
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                )
              )}
            </Grid>

            <Grid item xs={12} style={{ marginTop: "20px" }}>
              <AddButton
                variant="contained"
                onClick={onHandleReport}
                disabled={!reportType}
              >
                Generar Reporte
              </AddButton>
            </Grid>
          </Grid>

          <Divider style={{ margin: "2rem 0" }} />
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default SalesReporting;
