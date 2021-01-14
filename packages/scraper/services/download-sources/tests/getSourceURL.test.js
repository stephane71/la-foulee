const getSourceURL = require("../getSourceURL");

const MOCK_URL =
  "http://bases.athle.com/asp.net/liste.aspx?frmpostback=true&frmbase=calendrier&frmmode=1&frmespace=0&frmsaison=043&frmtype1=Hors+Stade&frmtype2=&frmtype3=&frmtype4=&frmniveau=&frmniveaulab=&frmligue=&frmdepartement=2017&frmepreuve=&frmdate_j1=&frmdate_m1=&frmdate_a1=&frmdate_j2=&frmdate_m2=&frmdate_a2=";

describe("getSourceURL", () => {
  it("", () => {
    const url = getSourceURL(2017, "043");
    expect(url).toEqual(MOCK_URL);
  });
});
