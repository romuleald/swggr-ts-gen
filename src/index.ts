import { generateApi } from "swagger-typescript-api";

const config = require(process.env.npm_package_json)?.["swggr-ts-gen"];
const apis = config?.apis;
if (!Array.isArray(apis)) {
  throw new Error("Missing configuration, refer to readme file");
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
