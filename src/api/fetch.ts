const groupBy = (keys: any) => (array: any) =>
  array.reduce((objectsByKeyValue: any, obj: any) => {
    const value = keys.map((key: any) => obj[key]).join("-");
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat({
      ...obj,
      generatedKey: value,
    });
    return objectsByKeyValue;
  }, {});

export async function getData(url = "", params: any = {}, short = false) {
  const queryString = encodeURIComponent(JSON.stringify(params));
  const structUrl = url + queryString;
  const response = await fetch(structUrl);
  const data = await response.json(); // parses JSON response into native JavaScript objects
  const groupFincodeStatus = groupBy(["fincode", "status"]);
  return short ? groupFincodeStatus(data) : data;
}

// returs client orders
export const fechOrders = async (data) => {
  const result = await getData(
    "https://80.245.167.105:19580/erpapi/getorders/obj?pars=",
    data,
    true
  );
  return result;
};

export const fechGroups = async () => {
  const result = await fetch("https://80.245.167.105:19580/erpapi/getgroups");
  return await result.json();
};
