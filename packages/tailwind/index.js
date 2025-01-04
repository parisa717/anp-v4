import tokens from '@nexus-ui/tokens'
import fs from 'fs'

const theme = {
  backgroundColor: {},
  borderColor: {},
  borderRadius: {},
  borderWidth: {},
  boxShadow: {},
  boxShadowColor: {},
  colors: {},
  fontSize: {},
  fontWeight: {},
  height: {},
  lineHeight: {},
  margin: {},
  minWidth: {},
  padding: {},
  sizing: {},
  spacing: {},
  textColor: {},
  width: {},
  opacity: {},
}

const skipped = {}

function generateFontSizes(token) {
  const name = token.name.replace('-font-size', '').replace('-typography', '')

  theme.fontSize[name] = `var(--${token.name})`
}

function generateFontWeights(token) {
  const name = token.name.replace('-font-weight', '').replace('-typography', '')

  theme.fontWeight[name] = `var(--${token.name})`
}

function generateBorderColors(token) {
  const name = token.name.replace('-border-color', '')

  theme.borderColor[name] = `var(--${token.name})`
}

function generateBackgroundColors(token) {
  const name = token.name.replace('-background', '')

  theme.backgroundColor[name] = `var(--${token.name})`
}

function generateTextColors(token) {
  const name = token.name.replace('-color', '')

  theme.textColor[name] = `var(--${token.name})`
}

function generateBoxShadowColors(token) {
  const name = token.name.replace('-shadow', '')

  theme.boxShadowColor[name] = `var(--${token.name})`
}

function generateColors(token) {
  if (token.name.includes('border-color')) {
    generateBorderColors(token)
  } else if (token.name.includes('background')) {
    generateBackgroundColors(token)
  } else if (token.name.includes('color')) {
    generateTextColors(token)
  } else if (token.name.includes('shadow')) {
    generateBoxShadowColors(token)
  } else {
    theme.colors[token.name] = `var(--${token.name})`
  }
}

function generateLineHeights(token) {
  const name = token.name.replace('-line-height', '').replace('-typography', '')

  theme.lineHeight[name] = `var(--${token.name})`
}

function generateBorderRadius(token) {
  const name = token.name.replace('-border-radius', '')

  theme.borderRadius[name] = `var(--${token.name})`
}

function generateBorderWidth(token) {
  const name = token.name.replace('-border-width', '')

  theme.borderWidth[name] = `var(--${token.name})`
}

function generateHeights(token) {
  const name = token.name.replace('-height', '')

  theme.height[name] = `var(--${token.name})`
}

function generateWidths(token) {
  const name = token.name.replace('-width', '')

  theme.width[name] = `var(--${token.name})`
}

function generateMinWidths(token) {
  const name = token.name.replace('-min-width', '')

  theme.minWidth[name] = `var(--${token.name})`
}

function generateSizes(token) {
  if (token.name.includes('height')) {
    generateHeights(token)
  } else if (token.name.includes('min-width')) {
    generateMinWidths(token)
  } else if (token.name.includes('width')) {
    generateWidths(token)
  } else {
    const name = token.name.replace('-size', '')

    theme.sizing[name] = `var(--${token.name})`
  }
}

function generatePaddings(token) {
  const name = token.name.replace('-padding', '')

  theme.padding[name] = `var(--${token.name})`
}

function generateMargins(token) {
  const name = token.name.replace('-margin', '')

  theme.margin[name] = `var(--${token.name})`
}

function generateSpacings(token) {
  if (token.name.includes('padding')) {
    generatePaddings(token)
  } else if (token.name.includes('margin')) {
    generateMargins(token)
  } else {
    const name = token.name.replace('-spacing', '')

    theme.spacing[name] = `var(--${token.name})`
  }
}

function generateDimensions(token) {
  const extensions = token.$extensions

  if (extensions) {
    const originalType = extensions['studio.tokens'].originalType

    if (originalType === 'borderRadius') {
      generateBorderRadius(token)
    } else if (originalType === 'borderWidth') {
      generateBorderWidth(token)
    } else if (originalType === 'spacing') {
      generateSpacings(token)
    } else if (originalType === 'sizing') {
      generateSizes(token)
    }
  } else {
    if (token.name.includes('border-width')) {
      generateBorderWidth(token)
    } else {
      generateSkippedTokens(token)
    }
  }
}

function generateBoxShadows(token) {
  const name = token.name.replace('-shadow', '')

  theme.boxShadow[name] = `var(--${token.name})`
}

function generateOpacities(token) {
  const name = token.name.replace('-opacity', '')

  theme.opacity[name] = `var(--${token.name})`
}

function generateConfig(tokens) {
  Object.values(tokens).forEach((token) => {
    const { value, type } = token

    if (!value) {
      return generateConfig(token)
    }

    switch (type) {
      case 'color': {
        return generateColors(token)
      }
      case 'fontSize': {
        return generateFontSizes(token)
      }
      case 'lineHeight': {
        return generateLineHeights(token)
      }
      case 'fontWeight': {
        return generateFontWeights(token)
      }
      case 'dimension': {
        return generateDimensions(token)
      }
      case 'shadow': {
        return generateBoxShadows(token)
      }
      case 'opacity': {
        return generateOpacities(token)
      }
      default: {
        generateSkippedTokens(token)
      }
    }
  })
}

function generateSkippedTokens(token) {
  if (skipped[token.type] === undefined) {
    skipped[token.type] = []
  }

  skipped[token.type] = [...skipped[token.type], token]
}

generateConfig(tokens)

fs.writeFileSync('tailwind.tokens.json', JSON.stringify(theme, null, 2))
fs.writeFileSync('skipped.tokens.json', JSON.stringify(skipped, null, 2))
