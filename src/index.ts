import { dirname } from "path";
import { generateApi } from "swagger-typescript-api";

// if (process.env.phrase_token === undefined || process.env.phrase_project_id === undefined) {
//   throw new Error('Missing Phrase token or project id');
// }

const config = require(process.env.npm_package_json)["swggr-ts-gen"];
const apis = config.apis;
if (!Array.isArray(apis)) {
  throw new Error("lol ya ri1");
}

(async () => {
  await Promise.all(
    apis.map(async (api) => {
      const path = `${process.env.INIT_CWD}/dto/types/`;
      return generateApi({ url: api.url, output: path, name: api.name });
    }),
  );
  // sometimes process is not release
  process.exit(0);
})();
