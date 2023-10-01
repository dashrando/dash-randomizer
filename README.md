# [DASH Randomizer](https://www.dashrando.net)
DASH is a Super Metroid randomizer aimed at competitive play.

This is a monorepo which consists of all the DASH projects, which are located in the [`apps`](apps) and [`packages`](packages) folders.
* [`web`](apps/web): the website for [dashrando.net](https://www.dashrando.net)
* [`headless`](apps/headless/): a standalone Node.js version which can be used to generate seeds outside of the website (such as bots).
* [`core`](packages/core): the logic for seeds for each mode.

## Local Development
### Dependencies
First install the dependencies for the monorepo. [Node.js](https://nodejs.org/) v18 is required.
```sh
npm install
```

This monorepo is powered by [Turborepo](https://turbo.build/repo). You will need to follow their [installation instructions](https://turbo.build/repo/docs/installing) and ensure it is installed.

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
