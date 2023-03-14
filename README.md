# dash-randomizer.github.io
Super Metroid DASH Randomizer

## Local Development
To open DASH website locally, first install the dependencies. [Node.js](https://nodejs.org/) v18 is required.
```sh
npm install
```

To build the client-side scripts, you will need to run the `dev` command.
```sh
npm run dev
```

Next, open the [`dash-web.code-workspace`](dash-web.code-workspace) file in VS Code. You will also need the [Live Server Extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension.

Once installed, you will need to open the server. This can be done by clicking "Go Live" in the footer of VS Code, or using one of the [other methods documented by Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer). This will open the browser to `localhost:5501` with the DASH website.

Alternatively, you can use [`serve`](https://github.com/vercel/serve) like so if you do not wish to install Live Server.
```sh
npx serve -p 5501
```
