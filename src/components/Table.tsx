import React, { useRef, useEffect } from "react";
import MaterialTable, { MTableAction } from "material-table";

type IType =
  | "string"
  | "boolean"
  | "numeric"
  | "date"
  | "datetime"
  | "time"
  | "currency";
const string: IType = "string";

const columns1 = [
  {
    title: "Name",
    field: "name",
    type: string,
  },
  {
    title: "Surname",
    field: "surname",
    type: string,
  },
  {
    title: "Birth Year",
    field: "birthYear",
    type: string,
  },
  {
    title: "Birth Place",
    field: "birthCity",
    // lookup: { 34: "İstanbul", 63: "Şanlıurfa", 1: "Berlin", 2: "Tunis" },
    type: string,
  },
];

export default function Editable() {
  const { useState } = React;

  const [columns, setColumns] = useState(columns1);

  const [data, setData] = useState([
    { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 },
    { name: "Zerya Betül", surname: "Baran", birthYear: 2017, birthCity: 34 },
  ]);

  const addActionRef: any = useRef();

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <button
        style={{ marginBottom: 20 }}
        onClick={() => addActionRef.current.click()}
      >
        Add new item
      </button>

      <MaterialTable
        onRowClick={(event, rowData) => console.log('rowData',rowData)}

        components={{
          Action: (props) => {
            console.log("props", props.action.tooltip);

            //If isn't the add action
            if (
              typeof props.action === typeof Function ||
              props.action.tooltip !== "Add"
            ) {
              return <MTableAction {...props} />;
            } else {
              return <div ref={addActionRef} onClick={props.action.onClick} />;
            }
          },
        }}
        title="Editable Preview"
        columns={columns}
        data={data}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                setData([...data, newData]);

                resolve(true);
              }, 1000);
            }),
          onRowUpdate: (newData, oldData: any) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData?.tableData?.id;
                dataUpdate[index] = newData;
                setData([...dataUpdate]);

                resolve(true);
              }, 1000);
            }),
          onRowDelete: (oldData: any) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...data];
                const index = oldData?.tableData?.id;
                dataDelete.splice(index, 1);
                setData([...dataDelete]);

                resolve(true);
              }, 1000);
            }),
        }}
      />
    </>
  );
}
