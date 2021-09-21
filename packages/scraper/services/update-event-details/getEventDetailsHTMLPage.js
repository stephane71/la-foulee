import axios from "axios";

const BASE_URL_DETAILS =
  "http://bases.athle.com/asp.net/competitions.aspx?base=calendrier";

async function getEventDetailsHTMLPage(idFFA) {
  if (!idFFA) {
    return null;
  }

  const url = `${BASE_URL_DETAILS}&id=${idFFA}`;

  const req = await axios.get(url);
  return req.data;
}

export default getEventDetailsHTMLPage;
