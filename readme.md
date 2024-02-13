# swggr-ts-gen

A low config over `swagger-typescript-api` to manage type in your project.

1. install `npm i -D @romuleald/swggr-ts-gen`
1. at the root of you `package.json` add

   ```json
   "swggr-ts-gen": {
   "apis": [
       {
           "url": "https://raw.githubusercontent.com/OAI/OpenAPI-Specification/main/examples/v2.0/json/api-with-examples.json",
           "name": "test"
       }
   ]}
   ```

   `url` will be your openapi json from swagger and `name` the name of the file.
1. add a command in your scripts `"dto-doc": "swggr-ts-gen"`
1. execute `npm run dto-doc`
1. DTOs will be generated in `./dto/types` from the root of your project
