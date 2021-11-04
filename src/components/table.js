import React from "react";
import { useTable } from "react-table";
import "./table.styles.scss";

const Table = (props) => {
  const { data } = props;
  const displayedColumns = 10;

  const dataRows = React.useMemo(() => {
    if (data && data.length > 1) {
      const tableData = data.slice(1, 6).map((row) => {
        const rowData = {};
        row.forEach((item, index) => {
          rowData[index.toString()] = item;
        });
        return rowData;
      });
      return tableData;
    }
    return [];
  }, [data]);

  const columns = React.useMemo(() => {
    if (data && data.length > 0) {
      const columnsData = data[0]
        .slice(0, displayedColumns)
        .map((item, index) => {
          return {
            Header: item,
            accessor: index.toString(),
          };
        });
      let columnsLeft = data[0].length - displayedColumns;
      columnsLeft = columnsLeft >= 0 ? columnsLeft : 0;
      columnsData.push({
        Header: `Columns left: ${columnsLeft}`,
        accessor: "",
      });
      return columnsData;
    }
    return [];
  }, [data]);

  const tableInstance = useTable({ columns, data: dataRows });
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <table
      className="table"
      {...getTableProps()}
      border="0"
      cellspacing="0"
      cellpadding="0"
    >
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
              <tr className="table__bodyrow" {...row.getRowProps()}>
                {
                  // Loop over the rows cells
                  row.cells.map((cell) => {
                    // Apply the cell props
                    return (
                      <td className="table__bodycell" {...cell.getCellProps()}>
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
      <tfoot>
        {footerGroups.map((group) => (
          <tr {...group.getFooterGroupProps()}>
            {group.headers.map((column) => (
              <td {...column.getFooterProps()}>{column.render("Footer")}</td>
            ))}
          </tr>
        ))}
        <tr>
          <td>Rows: {data?.length - 1 || 0}</td>
        </tr>
      </tfoot>
    </table>
  );
};

export default Table;
