import { register } from '@tokens-studio/sd-transforms'
import StyleDictionary from 'style-dictionary'

import tokens from './tokens.json' with { type: 'json' }

register(StyleDictionary)

const transforms = ['name/kebab', 'remove-global-prefix', 'ts/resolveMath']

const sd = new StyleDictionary(
  {
    tokens: tokens['nexus-ui'],
    preprocessors: ['tokens-studio'],
    platforms: {
      css: {
        transformGroup: 'tokens-studio',
        transforms: transforms,
        buildPath: 'dist/css/',
        files: [
          {
            destination: 'tokens.css',
            format: 'css/variables',
          },
        ],
      },
      js: {
        transformGroup: 'tokens-studio',
        transforms: transforms,
        buildPath: 'dist/js/',
        files: [
          {
            destination: 'tokens.js',
            format: 'javascript/module',
          },
        ],
      },
    },
    expand: {
      include: ['typography', 'border'],
      typesMap: {
        typography: {
          lineHeight: 'lineHeight',
          fontSize: 'fontSize',
        },
      },
    },
  },
  {
    verbosity: 'verbose',
  },
)

StyleDictionary.registerTransform({
  type: 'name',
  name: 'remove-global-prefix',
  filter: (token) => token.path[0] === 'global',
  transform: (token) => token.name.substring(7),
})

await sd.cleanAllPlatforms()
await sd.buildAllPlatforms()
