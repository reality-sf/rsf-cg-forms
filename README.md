# RSF CG Forms

This is the repository for various forms for Reality SF.

## Project Architecture

The repository is split into multiple logical applications, each its own create-react-app instance. Each app has its own folder within [`apps/`](apps/), and gets deployed to its own set of GitHub Pages.

Shared files are placed within the `shared` directory. This directory is made available to each app by creating a symbolic link from `src/shared` within that app's directory to the project root's `shared` folder.

## Creating a new form

1. Within the project root, run `create-react-app apps/<app_name>`. Make sure you have [`create-react-app`](https://facebook.github.io/create-react-app/docs/getting-started) installed. This will create a new directory at `apps/<app_name>`.
2. Change your directory to `apps/<app_name>`.
3. Run `npm install --save-dev react-app-rewired customize-cra`
4. Add a file to the project root called "config-overrides.js", whose contents is `module.exports = require('../../config-overrides');`
5. Change the existing npm scripts from `react-scripts` to `react-app-rewired`.
6. Add `"postinstall": "../../scripts/link_shared"` to the scripts
7. Add an entry to `deployment.json` that points your app to its respective Github repositories. You will need to create two repositories; one for staging, and one for production. The repository name will become the top-level directory of our public URL.

## Deployment

This site is deployed onto Github Pages. To deploy, use the deploy script.

```bash
export TARGET_SITE=apps/<app_name>
export ENV=staging # this is only needed if we want to deploy into staging.
./scripts/deploy
```
