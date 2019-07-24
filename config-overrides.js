const { override, removeModuleScopePlugin, babelInclude } = require('customize-cra');
const path = require('path');

/**
 * Create React App doesn't allow users to import files from outside their project root, and also doesn't pass files
 * outside of the `src` directory into their loaders. This overrides these settings so the shared directory is allowed
 * as an import.
 */
module.exports = override(
  removeModuleScopePlugin(),
  babelInclude([
    path.join(process.cwd(), 'src'),
    path.join(__dirname, 'shared')
  ]),
);
