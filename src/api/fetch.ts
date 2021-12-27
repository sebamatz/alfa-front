import {domain} from '../config'
const groupBy = (keys: any) => (array: any) =>
  array.reduce((objectsByKeyValue: any, obj: any) => {
    const value = keys.map((key: any) => obj[key]).join("-");
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat({
      ...obj,
      generatedKey: value,
    });

    return objectsByKeyValue;
  }, {});

const constructApi = (url, params) => {
  const queryString = encodeURIComponent(JSON.stringify(params));
  return url + queryString;
};

export async function getData(url = "", params: any = {}, short = false) {
  const response = await fetch(constructApi(url, params));
  const data = await response.json(); // parses JSON response into native JavaScript objects
  const groupFincodeStatus = groupBy(["trndate", "fincode", "status"]);
  return short ? groupFincodeStatus(data) : data;
}

// returs client orders
export const fechOrders = async (data) => {
  const result = await getData(
    `${domain}/erpapi/getorders/obj?pars=`,
    data,
    true
  );
  return result;
};

export const fechGroups = async () => {
  const data = {
    Company: 1,
  };

  const result = await getData(
  `${domain}/erpapi/getgroups?pars=`,
    data
  );
  return await result;
};

//GET /erpapi/getbranches/obj

export const getbranches = async (afm: string) => {
  const data = {
    Company: 1,
    AFM: afm,
  };

  const result = await getData(
    `${domain}/erpapi/getbranches/obj?pars=`,
    data
  );
  console.log("getbranches", result);
  return result;
};
//put order
const defaults = [
  {
    Company: 1,
    bOption: 0,
    trdr: 3975,
    trdbranch: 125,
    comments: "test1",
    mtrl: 10069,
    commentS1: "test1",
    qtY1: 0,
    qtY2: 0,
  },
  {
    Company: 1,
    bOption: 0,
    trdr: 3975,
    trdbranch: 125,
    comments: "test2",
    mtrl: 10069,
    commentS1: "test2",
    qtY1: 0,
    qtY2: 0,
  },
  {
    Company: 1,
    bOption: 0,
    trdr: 3975,
    trdbranch: 125,
    comments: "test3",
    mtrl: 10069,
    commentS1: "test13",
    qtY1: 0,
    qtY2: 0,
  },
];

// Example POST method implementation:
export async function postData(url = "", data = defaults) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "PUT", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  return { response, data: await response.json() }; // parses JSON response into native JavaScript objects
}

// /erpapi/putorder
//${domain}/erpapi/getorders/pdf?pars=%7B%22Company%22%3A1%2C%22Id%22%3A%22179631%22%7D//

export async function downloadPdf(payload: any, code) {
  try {
    const url = `${domain}/erpapi/getorders/pdf?pars=`;

    const response = await fetch(constructApi(url, { Company: 1, id: code }), {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const pdf = await response.json();
    const linkSource = `data:application/pdf;base64,${pdf}`;
    const downloadLink = document.createElement("a");
    const fileName = `${payload}.pdf`;
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  } catch (err: any) {
    throw new Error(err?.response?.data?.code || err.message);
  }
}
