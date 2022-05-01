import React, { useState, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import CancelIcon from "@material-ui/icons/Cancel";
import TableRow from "@material-ui/core/TableRow";
import ImageIcon from "@material-ui/icons/Image";
import moment from "moment";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";

import EnhancedTableHead from "./Head";
import { NewRow } from "./NewRow";

import { HeadCell, Data } from "../../types";
import { AnyTxtRecord } from "dns";
import { Button } from "@material-ui/core";
import { SignalCellularConnectedNoInternet0BarTwoTone } from "@material-ui/icons";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof Data>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2),
    },
    table: {
      // minWidth: 750,
      border: "none",
    },
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1,
    },
  })
);

type TableProps = {
  onRowclick: (data: any) => void;
  rows: Data[];
  headCells: any;
  name: string;
  clearCell?: boolean;
  maxCols?: number;
  add?: boolean;
  orderCol?: any;
  getRows?: (data: any) => void;
  pagination?: boolean;
  stickyHeader?: boolean;
  selectedRow?: any;
  rowsPerPagenum?: number;
  getPdf?: any;
};

export default function DataTable(props: TableProps) {
  const {
    onRowclick,
    rows,
    headCells,
    name,
    clearCell = false,
    maxCols = 100,
    add = false,
    orderCol = "",
    pagination = true,
    stickyHeader,
    getRows,
    selectedRow = null,
    rowsPerPagenum = 25,
    getPdf,
  } = props;
  const classes = useStyles();
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>(orderCol);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(rowsPerPagenum);

  const [tableRows, setRow] = useState(rows);
  const [addRow, setAddwRow] = useState(false);
  // const [status, setStatus] = useState(null);

  let status = null;

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleAddRowClick = (event: React.MouseEvent<unknown>) => {
    event.preventDefault();
    setAddwRow(!addRow);
  };

  const handleSaveOrder = (order: any) => {
    tableRows.push(order);
    getRows(tableRows);

    setRow(tableRows);

    setAddwRow(false);
  };
  const handleRemoveOrder = (index: any) => {
    const newtableRows = tableRows.filter((data, i) => index !== i);
    getRows(newtableRows);

    setRow(newtableRows);

    setAddwRow(false);
  };

  const handleRowClick = (event: React.MouseEvent<unknown>, rowData: Data) => {
    event.preventDefault();
    onRowclick([rowData]);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    !add && setRow(rows);
  }, [rows, add]);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <form>
        <TableContainer>
          <Table
            stickyHeader={stickyHeader}
            className={classes.table}
            aria-labelledby="tableTitle"
            size={"medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headCells={headCells}
            />
            <TableBody>
              {stableSort(tableRows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any, index) => {
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleRowClick(event, row)}
                      tabIndex={-1}
                      key={index}
                      selected={row.fincode === selectedRow?.fincode}
                    >
                      {headCells.map((r: any, i: number) => {
                        let data: any = row[r.id];

                        if (r.id === "trndate") {
                          data = moment(row[r]).format("DD/MM/YY");
                        }

                        if (r.id === "qtY1") {
                          data = data.toLocaleString("el-GR");
                        }

                        if (r.id === "xdocname") {
                          const imagefile = row[r];
                          const path = `https://alfa-press.gr/wp-content/themes/porto-child/erp/icons/${imagefile}`;

                          data = imagefile ? (
                            <img alt="xdocname" src={path} height="90" />
                          ) : (
                            <ImageIcon />
                          );
                        }

                        if (r.id === "status") {
                          let imageFile;

                          if (
                            data === "ΚΑΤΑΧΩΡΗΜΕΝΗ" ||
                            data === "ΕΚΤΥΠΩΜΕΝΗ" ||
                            data === "ΕΚΤΕΛΕΣΗ ΠΑΡΑΓΓΕΛΙΑΣ"
                          ) {
                            imageFile = "AVAFO_LEYKO.jpg";
                            status = imageFile;
                          }
                          if (
                            data === "ΠΡΟΣ ΒΑΦΕΙΟ" ||
                            data === "ΕΞΟΔΟΣ ΒΑΦΕΙΟΥ"
                          ) {
                            imageFile = "XRWMA.jpg";
                            status = imageFile;
                          }
                        }
                        //   const path = `https://alfa-press.gr/wp-content/themes/porto-child/erp/icons/${imageFile}`;

                        //   data = imageFile ? (
                        //     <img alt="xdocname" src={path} height="90" />
                        //   ) : (
                        //     <ImageIcon />
                        //   );
                        // }

                        return <TableCell key={i}>{data}</TableCell>;
                      })}
                      {name === "master" && (
                        <TableCell style={{ padding: "0px" }}>
                          <Button
                            onClick={() =>
                              getPdf(row["fincode"], row["findoc"])
                            }
                          >
                            <PictureAsPdfIcon
                              style={{ color: "red", fontSize: "40px" }}
                            />
                          </Button>
                        </TableCell>
                      )}
                      {clearCell && (
                        <TableCell key={`${index}-cancel`}>
                          <CancelIcon
                            color="error"
                            onClick={() => handleRemoveOrder(index)}
                          />
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
              {addRow && <NewRow saveOrder={handleSaveOrder} />}
              {add && (
                <div style={{ margin: "20px 0" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddRowClick}
                  >
                    {addRow ? "ΑΚΥΡΩΣΗ" : "+"}
                  </Button>
                </div>
              )}
              {/* {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )} */}
            </TableBody>
          </Table>
        </TableContainer>
        {pagination && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </form>
      {status && name === "details" && (
        <img
          className="status"
          alt="xdocname"
          src={`https://alfa-press.gr/wp-content/themes/porto-child/erp/icons/${status}`}
        />
      )}
    </div>
  );
}
