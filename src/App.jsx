import { useState, useEffect } from "react";
import DataTable from "./DataTable";
import axios from "axios";
import { IconButton } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/users")
      .then((response) => {
        setData(response?.data?.users);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 90,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    {
      field: "download",
      headerName: "Download Data",
      width: 160,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          onClick={() => handleDownload(params.row)}
          color="primary"
          aria-label="download"
        >
          <FileDownloadIcon />
        </IconButton>
      ),
    },
  ];

  const handleDownload = (row) => {
    const csvData = `${row.id},${row.firstName},${row.lastName},${row.age},${row.fullName}\n`;

    const blob = new Blob([csvData], { type: "text/csv" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "rowData.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <DataTable rows={data} columns={columns} />
    </div>
  );
}
