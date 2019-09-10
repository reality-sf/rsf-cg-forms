# RSF CG Forms

This is the repository for various forms for Reality SF.

## Project Architecture

Each form is its own logical create-react-app instance. Each app has its own folder within [`apps/`](apps/), and gets deployed to its own set of GitHub Pages.

Shared files are placed within the `shared` directory. This directory is made available to each app by creating a symbolic link from `src/shared` within that app's directory to the project root's `shared` folder.

## Creating a new app

1. Within the project root, run `create-react-app apps/<app_name>`. Make sure you have [`create-react-app`](https://facebook.github.io/create-react-app/docs/getting-started) installed. This will create a new directory at `apps/<app_name>`.
2. Change your directory to `apps/<app_name>`.
3. Run `npm install --save-dev react-app-rewired customize-cra`
4. Within the new package.json:
    1. Change the existing npm scripts from `react-scripts` to `react-app-rewired`.
    2. Add `"postinstall": "../../scripts/link_shared"` to the scripts
    3. Add `"homepage": "."` to the document root.
5. Add a file to the project root called "config-overrides.js", whose contents is `module.exports = require('../../config-overrides');`
6. Add an entry to `deployment.json` that points your app to its respective Github repositories. You will need to create two repositories; one for staging, and one for production. The repository name will become the top-level directory of our public URL.

## Deployment

This site is deployed onto Github Pages. To deploy, use the deploy script.

```bash
export TARGET_SITE=apps/<app_name>
export ENV=staging # this is only needed if we want to deploy into staging.
./scripts/deploy
```

## Local Development

To develop each sub-app, navigate to that project's directory, and run `npm start`. This will start create-react-app, with live reloading as you edit the codebase.
