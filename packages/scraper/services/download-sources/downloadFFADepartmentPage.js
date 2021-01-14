const axios = require("axios");
const getSourceURL = require("./getSourceURL");

const BASE_URL = "http://bases.athle.com/asp.net/liste.aspx";
const getSourceURL = (dep, year = "2019") =>
  `${BASE_URL}?frmpostback=true&frmbase=calendrier&frmmode=1&frmespace=0&frmsaison=${year}&frmtype1=Hors+Stade&frmtype2=&frmtype3=&frmtype4=&frmniveau=&frmniveaulab=&frmligue=&frmdepartement=${dep}&frmepreuve=&frmdate_j1=&frmdate_m1=&frmdate_a1=&frmdate_j2=&frmdate_m2=&frmdate_a2=`;

module.exports = async function (year, dep) {
  if (!year || !dep) {
    throw {
      type: "MissingArguments",
      message:
        "[La Foulée] downloadDepartmentPage | Error: missing (year || dep) arguments",
    };
  }

  const url = getSourceURL(dep, year);

  console.log(
    "[La Foulée] downloadDepartmentPage | arguments: dep",
    dep,
    "year",
    year,
    "url",
    url
  );

  const req = await axios.get(url);
  return req.data;
};
