import { GenerateApiParams, generateApi } from "swagger-typescript-api";
import fs from "fs";

interface Config {
  apis: Array<{ file?: string; name: string; url?: string }>;
  output: string;
  localJson: string | undefined;
  typePrefix: boolean | undefined;
}

const projectPackage = process.env.npm_package_json;
const projectPath = process.env.INIT_CWD;
const config = require(projectPackage)?.["swggr-ts-gen"] as Config;
const jsonPath = config.localJson;

const apis = config?.apis.concat(
  ...fs
    .readdirSync(jsonPath)
    .map((a) => ({ file: `${jsonPath}/${a}`, name: a.split(".")[0] ?? a })),
);

if (!Array.isArray(apis) || (!jsonPath && !config.output)) {
  console.table(config);
  throw new Error("Missing configuration, refer to readme file");
}

(async () => {
  await Promise.all(
    apis.map(async (api) => {
      const path = `${projectPath}/${config.output}`;
      const apiOutput: GenerateApiParams = api.url
        ? {
            url: api.url,
            output: path,
            name: api.name,
          }
        : {
            input: api.file,
            output: path,
            name: api.name,
          };

      if (config.typePrefix) {
        apiOutput.typePrefix = api.name;
      }

      return generateApi(apiOutput);
    }),
  );
  // sometimes process is not release
  process.exit(0);
})();
