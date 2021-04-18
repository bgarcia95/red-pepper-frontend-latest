import http from "services/httpService";
import {
  GENERATE_CURRENT_INVENTORY,
  GENERATE_SPECIFIC_DATE_INVENTORY,
  GENERATE_DATE_RANGE_INVENTORY,
} from "redux/utils/actions";
import moment from "moment";
import { saveAs } from "file-saver";

// INVENTARIO
export const generateCurrentInventory = () => {
  return (dispatch) => {
    http
      .get("/inventory/AllData", {
        responseType: "arraybuffer",
      })
      .then((response) => {
        const blob = new Blob([response.data], {
          type:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        saveAs(
          blob,
          `Inventario Actual ${moment(new Date()).format("DD-MM-YYYY")}.xlsx`
        );
      });
  };
};

export const generateSpecificDateInventory = (date) => {
  return (dispatch) => {
    http
      .get(
        `/inventory/transaction/excel?date=${moment(date).format(
          "YYYY-MM-DD"
        )}`,
        {
          responseType: "arraybuffer",
        }
      )
      .then((response) => {
        const blob = new Blob([response.data], {
          type:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        saveAs(
          blob,
          `Detalle de operaciones_${moment(date).format("DD-MM-YYYY")}.xlsx`
        );
      });
  };
};

export const generateRangeDateInventory = (initDate, endDate) => {
  return (dispatch) => {
    http
      .get(
        `/inventory/transaction/DateRange/excel?startDate=${moment(
          initDate
        ).format("YYYY-MM-DD")}&endDate=${moment(endDate).format("YYYY-MM-DD")}
        `,
        {
          responseType: "arraybuffer",
        }
      )
      .then((response) => {
        const blob = new Blob([response.data], {
          type:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        saveAs(
          blob,
          `Detalle de operaciones_${moment(initDate).format(
            "DD-MM-YYYY"
          )}_${moment(endDate).format("DD-MM-YYYY")}.xlsx`
        );
      });
  };
};

// VENTAS 
export const generateSpecificDateSales = (date) => {
    return (dispatch) => {
      http
        .get(
          `/sales/Date/excel?date=${moment(date).format(
            "YYYY-MM-DD"
          )}`,
          {
            responseType: "arraybuffer",
          }
        )
        .then((response) => {
          const blob = new Blob([response.data], {
            type:
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          saveAs(
            blob,
            `Detalle de Ventas_${moment(date).format("DD-MM-YYY")}.xlsx`
          );
        });
    };
  };
  
  export const generateRangeDateSales = (initDate, endDate) => {
    return (dispatch) => {
      http
        .get(
          `/sales/DateRange/excel?initDate=${moment(
            initDate
          ).format("YYYY-MM-DD")}&endDate=${moment(endDate).format("YYYY-MM-DD")}
          `,
          {
            responseType: "arraybuffer",
          }
        )
        .then((response) => {
          const blob = new Blob([response.data], {
            type:
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          saveAs(
            blob,
            `Detalle de Ventas_${moment(initDate).format(
              "DD-MM-YYYY"
            )}_${moment(endDate).format("DD-MM-YYYY")}.xlsx`
          );
        });
    };
  };

// Rangos $"Detalle de operaciones_{startDate.Date:dd/MM/yyyy}_{endDate.Date:dd/MM/yyyy}.xlsx");

// Fecha Especifica $"Detalle de operaciones_{date.Date.ToString("dd/MM/yyyy")}.xlsx")
