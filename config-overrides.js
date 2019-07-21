const { override, removeModuleScopePlugin, babelInclude } = require('customize-cra');
const path = require('path');

/**
 * Override
 */
module.exports = override(
  removeModuleScopePlugin(),
  babelInclude([
    path.join(process.cwd(), 'src'),
    path.join(__dirname, 'shared')
  ]),
);
