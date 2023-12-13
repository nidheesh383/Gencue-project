import { DataGrid } from "@mui/x-data-grid";

const DataTable = (rows) => {
  console.log(rows, "column enga da");
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={rows?.rows} columns={rows?.columns} rowCount={30} />
    </div>
  );
};

export default DataTable;
