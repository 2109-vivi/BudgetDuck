//month from getMonth returns 1-11, so we need to add 1 to get the correct month
export const currentMonth = new Date().getMonth() + 1;
export const currentYear = new Date().getFullYear();

 export const monthChart = {
  1: "January",
  2: "February",
  3: "March",
  4:"April",
  5:"May",
  6:"June",
  7:"July",
  8:"August",
  9:"September",
  10:"October",
  11:"November",
  12: "December",
}
