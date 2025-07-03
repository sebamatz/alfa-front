const url: any = document.getElementById("apiUrl");
//Property 'value' does not exist on type 'HTMLElement'.  TS2339

const afmValue = (document.getElementById("userAfm") as HTMLInputElement)
  ?.value;
console.log("amValue", afmValue);
export const domain =
  afmValue === "777777777" ? "https://www.alfaeorders.com:19443" : url?.value;
