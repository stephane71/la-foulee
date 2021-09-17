import axios from "axios";
import getSourceURL from "./getSourceURL";

async function downloadFFADepartmentPage(year, dep) {
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
}

export default downloadFFADepartmentPage;
