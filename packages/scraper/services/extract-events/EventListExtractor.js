const moment = require("moment");
const slug = require("slug");

const CANCEL = "cancel";
const NOT_VALIDATE = "notValidate";

module.exports = class EventListExtractor {
  constructor($) {
    this.$ = $;
  }

  extract() {
    if (this.$(".messagesContainer").length) {
      return [];
    }

    let year = this.$(".mainheaders > span").text();
    this.year = year.match(/20[(1||2)-9]{2}/)[0];

    return this.getRows()
      .map(($tr) => this.getCells($tr))
      .map((row) => this.formatData(row));
  }

  getRows() {
    const classeFilters = ["listResOff", "listResCom", "listResInc"];

    return this.$("#ctnCalendrier tr")
      .filter((i, tr) =>
        classeFilters.includes(this.$(tr).find("td").first().attr("class"))
      )
      .toArray();
  }

  getCells($tr) {
    const $cells = this.$($tr).find("td");
    return {
      statusCell: $cells.eq(0),
      dateCell: $cells.eq(2),
      titleCell: $cells.eq(6),
      cityCell: $cells.eq(8),
      depCell: $cells.eq(12),
    };
  }

  formatData({ statusCell, dateCell, titleCell, cityCell, depCell }) {
    const state = this.getEventState(statusCell.attr("title"));
    const idFFA = this.getIdFFA(state, titleCell);
    const { dateStart, dateEnd } = this.getDate(dateCell);
    const dep = this.getDep(depCell);
    const title = titleCell.text();
    const keyword = this.getEventKeyword(title);

    return {
      keyword,
      title,
      city: cityCell.text(),
      date: dateStart,
      dateEnd,
      dep,
      idFFA,
    };
  }

  getEventState(status) {
    switch (status) {
      case "Compétition annulée":
        return CANCEL;
        break;
      case "Compétition proposée non validée par la CDCHS":
        return NOT_VALIDATE;
        break;
      default:
        return null;
    }
  }

  getIdFFA(state, titleCell) {
    return state === CANCEL || state === NOT_VALIDATE
      ? null
      : titleCell.find("a").attr("href").match(/'.+'/).join().slice(1, -1);
  }

  getDate(dateCell) {
    let date = dateCell.text();
    const getUnixDate = (date) => {
      return date
        ? moment.utc(`${date}/${this.year}`, "DD/MM/YYYY").unix()
        : date;
    };

    if (date.includes("*")) {
      console.log(date);
    }

    date = date.includes("*") ? date.slice(0, -1) : date;

    let dateEnd = null;
    let range = date.split("-");
    if (range.length > 1) {
      // ex: 13-16/06 see http://bases.athle.com/asp.net/liste.aspx?frmpostback=true&frmbase=calendrier&frmmode=1&frmespace=0&frmsaison=2018&frmtype1=Hors+Stade&frmtype2=&frmtype3=&frmtype4=&frmniveau=&frmniveaulab=&frmligue=&frmdepartement=001&frmepreuve=&frmdate_j1=&frmdate_m1=&frmdate_a1=&frmdate_j2=&frmdate_m2=&frmdate_a2=
      // "L'ain en courant"
      let month = moment(range[1], "DD/MM");
      month =
        range[0] > range[1].slice(0, 2) ? month.subtract(1, "months") : month;
      range[0] = `${range[0]}/${month.format("MM")}`;

      date = range[0];
      dateEnd = range[1];
    }

    return {
      dateStart: getUnixDate(date),
      dateEnd: getUnixDate(dateEnd),
    };
  }

  getDep(depCell) {
    let dep = depCell.text();
    dep = parseInt(dep);
    return dep < 10 ? `0${dep}` : `${dep}`;
  }

  getEventKeyword(title) {
    return slug(title, { lower: true });
  }
};
