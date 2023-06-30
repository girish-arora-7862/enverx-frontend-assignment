import Typography from "@mui/material/Typography";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const columns = [
  { field: "itemName", headerName: "Name", flex: 1, sortable: false },
  {
    field: "date",
    headerName: "Date",
    flex: 1,
    sortable: false,
  },
  { field: "category", headerName: "Category", flex: 1 },
  {
    field: "amount",
    headerName: "Amount",
    flex: 1,
    sortable: false,
  },
  {
    field: "description",
    headerName: "Description",
    flex: 2.5,
    sortable: false,
  },
];

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

const labels = ["Salary", "Rent", "Groceries"];

const ViewExpense = () => {
  const commonStyle = { marginBottom: "18px" };
  const rawData = useSelector((store) => store.data.data);
  let rows = Object.values(rawData);

  rows.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  rows = rows.map((row, index) => {
    return { ...row, date: new Date(row.date).toDateString(), id: index };
  });

  const salary = rows.reduce((total, row) => {
    if (row.category === "Salary") {
      return total + +row.amount;
    } else {
      return total;
    }
  }, 0);

  const rent = rows.reduce((total, row) => {
    if (row.category === "Rent") {
      return total + +row.amount;
    } else {
      return total;
    }
  }, 0);

  const groceries = rows.reduce((total, row) => {
    if (row.category === "Groceries") {
      return total + +row.amount;
    } else {
      return total;
    }
  }, 0);

  const data = {
    labels,
    datasets: [
      {
        label: "Expenses Report",
        data: [salary, rent, groceries],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
      },
    ],
  };

  return (
    <>
      <Typography
        style={{ ...commonStyle, marginTop: "100px" }}
        variant="h2"
        gutterBottom
      >
        Transactions Summary
      </Typography>
      <Box style={commonStyle} sx={{ width: "100%" }}>
        <Typography variant="subtitle1" gutterBottom>
          Total Income : {salary}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Total Expense : {rent + groceries}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Total Balance : {salary - (rent + groceries)}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Groceries Expense : {groceries}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Rent Expense : {rent}
        </Typography>
      </Box>
      <Typography
        style={{ ...commonStyle, marginTop: "100px" }}
        variant="h2"
        gutterBottom
      >
        Transactions Details
      </Typography>
      <Box style={commonStyle} sx={{ width: "100%" }}>
        <Bar options={options} data={data} />
      </Box>
      <Box style={commonStyle} sx={{ width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection={false}
          disableRowSelectionOnClick
        />
      </Box>
    </>
  );
};

export default ViewExpense;
