import { GenerateApiParams, generateApi } from "swagger-typescript-api";
import fs from "fs";

const path = `${process.env.INIT_CWD}/dto/jsons/`;
const config = require(process.env.npm_package_json)?.[
  "swggr-ts-gen"
] as Record<"apis", Array<{ file?: string; name: string; url?: string }>>;

const apis = config?.apis.concat(
  ...fs
    .readdirSync(path)
    .map((a) => ({ file: path + a, name: a.split(".")[0] ?? a })),
);
console.log({ apis });

if (!Array.isArray(apis)) {
  throw new Error("Missing configuration, refer to readme file");
}

(async () => {
  await Promise.all(
    apis.map(async (api) => {
      const path = `${process.env.INIT_CWD}/dto/types/`;
      const conf: GenerateApiParams = api.url
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
      console.log({ conf });

      return generateApi(conf);
    }),
  );
  // sometimes process is not release
  process.exit(0);
})();
