# [DASH Randomizer](https://www.dashrando.net)
DASH is a Super Metroid randomizer aimed at competitive play.

This is a monorepo which consists of all the DASH projects, which are located in the [`apps`](apps) and [`packages`](packages) folders.
* [`web`](apps/web): the website for [dashrando.net](https://www.dashrando.net)
* [`core`](packages/core): the logic for seeds for each mode.
* [`stats`](packages/stats): performs seed verification/validation and produces statistics.

## Local Development
### Dependencies
First install the dependencies for the monorepo. [Node.js](https://nodejs.org/) v18 is required.
```sh
npm install
```

This monorepo is powered by [Turborepo](https://turbo.build/repo). You will need to follow their [installation instructions](https://turbo.build/repo/docs/installing) and ensure it is installed.

### Key-Value Store
This application utilizes Vercel KV when generating seeds. To run locally, you will need the following variables defined in your `.env.local` file:
- `KV_REST_API_READ_ONLY_TOKEN`
- `KV_REST_API_TOKEN`
- `KV_REST_API_URL`


### Running Apps
To run all apps in parallel, you will need to run the `dev` command.
```sh
npm run dev
```

If you only want to run a single app, you will need to go to that folder and run the `dev` command there. For example, to run the website, you would do something similar to the following.
```sh
cd apps/web
npm run dev
```

### Unit Testing
We use Jest to perform unit tests. Run the `test` command at the top level to initiate them.
```sh
npm test
```
Part of the verification process is checking that the first _n_ seeds produce expected results. For that type of testing, we generate seeds of every registered preset, encode them, and then compare them to the _known good_ values which are committed to the repo. One of the most common failure cases is introducing a new preset and not updated the baseline results.