import { useRef, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ColDef } from "ag-grid-community";

export type DataTableProps = {
  cols: ColDef[];
  rows: any;
  tableHeight?: number;
  tableWidth?: number;
};

const DataTable = (props: DataTableProps) => {
  const { tableHeight, tableWidth } = props;
  const gridRef = useRef<any>();

  const defaultColDef = useMemo<ColDef>(
    () => ({
      sortable: true,
      minWidth: 100,
    }),
    []
  );

  return (
    <div
      className="ag-theme-alpine"
      style={{ height: tableHeight || 500, width: tableWidth || 800 }}
    >
      <AgGridReact
        rowData={props.rows}
        columnDefs={props.cols}
        defaultColDef={defaultColDef}
        animateRows={true}
        rowSelection="multiple"
        ref={gridRef}
      ></AgGridReact>
    </div>
  );
};

export default DataTable;
