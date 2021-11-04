import React from "react";
import { useTable } from "react-table";
import "./table.styles.scss";

const Table = (props) => {
  const { data } = props;
  const displayedColumns = 10;

  const dataRows = React.useMemo(() => {
    if (data && data.length > 1) {
      return data.slice(0, 5).map((row) => {
        const rowData = {};
        row.forEach((item, index) => {
          rowData[index.toString()] = item;
        });
        return rowData;
      });
    }
    return [];
  }, [data]);

  const columns = React.useMemo(() => {
    if (data && data.length > 0) {
      return data[0].slice(0, displayedColumns).map((item, index) => {
        return {
          Header: item,
          accessor: index.toString(),
        };
      });
    }
    return [];
  }, [data]);

  const tableInstance = useTable({ columns, data: dataRows });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <table {...getTableProps()}>
      <thead className="table__header">
        {
          // Loop over the header rows
          headerGroups.map((headerGroup) => (
            // Apply the header row props
            <tr {...headerGroup.getHeaderGroupProps()}>
              {
                // Loop over the headers in each row
                headerGroup.headers.map((column) => (
                  // Apply the header cell props
                  <th
                    className="table__headercell"
                    {...column.getHeaderProps()}
                  >
                    {
                      // Render the header
                      column.render("Header")
                    }
                  </th>
                ))
              }
            </tr>
          ))
        }
      </thead>
      <tbody {...getTableBodyProps()}>
        {
          // Loop over the table rows
          rows.map((row) => {
            // Prepare the row for display
            prepareRow(row);
            return (
              // Apply the row props
              <tr {...row.getRowProps()}>
                {
                  // Loop over the rows cells
                  row.cells.map((cell) => {
                    // Apply the cell props
                    return (
                      <td {...cell.getCellProps()}>
                        {
                          // Render the cell contents
                          cell.render("Cell")
                        }
                      </td>
                    );
                  })
                }
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
};

export default Table;
