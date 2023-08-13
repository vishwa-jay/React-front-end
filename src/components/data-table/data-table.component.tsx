import React, {
  useRef,
  useMemo,
  useCallback,
} from "react";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import { CellClickedEvent, ColDef } from "ag-grid-community";

export type DataTableProps = {
  cols: ColDef[];
  rows: any;
  tableHeight?: number;
  tableWidth? : number;
};

const DataTable = (props: DataTableProps) => {
  const { tableHeight, tableWidth } = props;
  const gridRef = useRef<any>(); // Optional - for accessing Grid's API
  //const [rowData, setRowData] = useState<string[]>(); // Set rowData to Array of Objects, one Object per Row

  // Each Column Definition results in one Column.
  // const [columnDefs, setColumnDefs] = useState([
  //   {field: 'make', filter: true},
  //   {field: 'model', filter: true},
  //   {field: 'price'}
  // ]);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo<ColDef>(
    () => ({
      sortable: true,
      minWidth: 100
    }),
    []
  );

  // Example of consuming Grid Event
  const cellClickedListener = useCallback(
    (e: CellClickedEvent<HTMLButtonElement>) => {
      console.log("cellClickedListener", e);
    },
    []
  );

  // Example load data from server
  // useEffect(() => {
  //   fetch('https://www.ag-grid.com/example-assets/row-data.json')
  //   .then(result => result.json())
  //   .then(rowData => setRowData(rowData))
  // }, []);

  // Example using Grid's API
  // const buttonListener = useCallback( (e : React.MouseEvent<HTMLButtonElement>) => {
  //   gridRef.current && gridRef.current.api.deselectAll();
  // }, []);

  return (
    <div>
      {/* Example using Grid's API */}
      {/* <button onClick={buttonListener}>Push Me</button> */}

      {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
      <div className="ag-theme-alpine" style={{ height: tableHeight || 500, width:tableWidth || 800 }}>
        <AgGridReact
          rowData={props.rows} // Row Data for Rows
          columnDefs={props.cols} // Column Defs for Columns
          defaultColDef={defaultColDef} // Default Column Properties
          animateRows={true} // Optional - set to 'true' to have rows animate when sorted
          rowSelection="multiple" // Options - allows click selection of rows
          ref={gridRef} // Ref for accessing Grid's API
          // onCellClicked={cellClickedListener} // Optional - registering for Grid Event
        ></AgGridReact>
      </div>
    </div>
  );
};

export default DataTable;
