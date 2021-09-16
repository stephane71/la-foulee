import fs from "fs";
import YAML from "json-to-pretty-yaml";
import { PROPERTIES, TABLE_BASE } from "../commons/table.definition.js";

const properties = YAML.stringify(PROPERTIES);
const tableBase = YAML.stringify(TABLE_BASE);

fs.writeFileSync("commons/serverless-dynamodb-table.yml", properties);
fs.writeFileSync("commons/serverless-table-base.yml", tableBase);
