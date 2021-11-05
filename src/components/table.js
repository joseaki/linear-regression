import React from "react";
import { useTable } from "react-table";
import "./table.styles.scss";
import CustomModal from "./modal";
import Button from "./button";

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return <input type="checkbox" ref={resolvedRef} {...rest} />;
  }
);

const Table = (props) => {
  const { data } = props;
  const displayedColumns = 12;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  /**
   * Extract the body values
   */
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

  /**
   * Extract the column names
   */
  const columns = React.useMemo(() => {
    if (data && data.length > 0) {
      const columnsData = data[0].map((item, index) => {
        return {
          Header: item,
          accessor: index.toString(),
        };
      });
      return columnsData;
    }
    return [];
  }, [data]);

  const getHiddenColumns = () => {
    if (data && data.length > 0) {
      const columnsAccesorIds = [];
      data[0].forEach((item, index) => {
        if (index >= displayedColumns) {
          columnsAccesorIds.push(index.toString());
        }
      });
      console.log("columnsAccesorIds", data[0].slice(displayedColumns));
      return columnsAccesorIds;
    }
    return [];
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const hiddenColumns = getHiddenColumns();
  const initialState = { hiddenColumns };

  const tableInstance = useTable({ columns, data: dataRows, initialState });
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    allColumns,
    getToggleHideAllColumnsProps,
  } = tableInstance;

  return (
    <>
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
                      key={column.id}
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
                        <td
                          className="table__bodycell"
                          {...cell.getCellProps()}
                        >
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

      {hiddenColumns.length > 0 ? (
        <div>
          <Button onClick={openModal} primary>
            SHOW MORE COLUMNS
          </Button>
          <CustomModal
            isOpen={modalIsOpen}
            closeModal={closeModal}
            onAccept={() => {
              closeModal();
            }}
            title="Titulo del modal"
          >
            <div className="content" style={{ overflow: "scroll" }}>
              <div>
                <IndeterminateCheckbox {...getToggleHideAllColumnsProps()} />{" "}
                Toggle All
              </div>
              {allColumns.map((column) => (
                <div key={column.id}>
                  <label>
                    <input type="checkbox" {...column.getToggleHiddenProps()} />{" "}
                    {column.Header}
                  </label>
                </div>
              ))}
            </div>
          </CustomModal>
        </div>
      ) : null}
    </>
  );
};

export default Table;
