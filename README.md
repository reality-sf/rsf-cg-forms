# RSF CG Forms

This is the repository for various forms for Reality SF.

## Project Architecture

The repository is split into multiple logical applications, each its own create-react-app instance. Each app has its own folder within [`apps/`](apps/), and gets deployed to its own set of GitHub Pages.

Shared files are placed within the `shared` directory. This directory is made available to each app by creating a symbolic link from `src/shared` within that app's directory to the project root's `shared` folder.

## Deployment

This site is deployed onto Github Pages. To deploy:

```bash
cd <directory> # directory should be where that create-react-app application lives.
npm install
npm run deploy
```
