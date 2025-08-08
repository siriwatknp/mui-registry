"use client";

import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Chip from "@mui/material/Chip";

const columns: GridColDef[] = [
  { field: "orderNumber", headerName: "Order number", width: 140 },
  { field: "customer", headerName: "Customer", width: 180 },
  {
    field: "cost",
    headerName: "Cost",
    width: 120,
    type: "number",
    valueFormatter: (value: number) => {
      return value != null
        ? Number(value).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })
        : "";
    },
  },
  { field: "date", headerName: "Date", width: 140 },
  {
    field: "status",
    headerName: "Status",
    width: 140,
    type: "singleSelect",
    valueOptions: ["Completed", "Pending", "Canceled"],
    renderCell: (params) => {
      let color: "success" | "warning" | "error" = "success";
      if (params.value === "Pending") color = "warning";
      else if (params.value === "Canceled") color = "error";
      return <Chip label={params.value} color={color} size="small" />;
    },
  },
];

const rows = [
  {
    id: 1,
    orderNumber: "A001",
    customer: "Alice Smith",
    cost: 120.5,
    date: "2024-06-01",
    status: "Completed",
  },
  {
    id: 2,
    orderNumber: "A002",
    customer: "Bob Lee",
    cost: 89.99,
    date: "2024-06-02",
    status: "Pending",
  },
  {
    id: 3,
    orderNumber: "A003",
    customer: "Charlie Kim",
    cost: 45.0,
    date: "2024-06-03",
    status: "Canceled",
  },
  {
    id: 4,
    orderNumber: "A004",
    customer: "Dana White",
    cost: 200.0,
    date: "2024-06-04",
    status: "Completed",
  },
  {
    id: 5,
    orderNumber: "A005",
    customer: "Eve Black",
    cost: 150.75,
    date: "2024-06-05",
    status: "Pending",
  },
];

export function OrderTable() {
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 5,
  });
  return (
    <div style={{ width: "100%", height: 400 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        disableRowSelectionOnClick
        autoHeight={false}
      />
    </div>
  );
}
