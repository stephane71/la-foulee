const BASE_URL = "http://bases.athle.com/asp.net/liste.aspx";

module.exports = function getSourceURL(dep, year = "2019") {
  return `${BASE_URL}?frmpostback=true&frmbase=calendrier&frmmode=1&frmespace=0&frmsaison=${year}&frmtype1=Hors+Stade&frmtype2=&frmtype3=&frmtype4=&frmniveau=&frmniveaulab=&frmligue=&frmdepartement=${dep}&frmepreuve=&frmdate_j1=&frmdate_m1=&frmdate_a1=&frmdate_j2=&frmdate_m2=&frmdate_a2=`;
};
