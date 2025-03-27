import React from 'react'
import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react'
import type { PropsWithChildren } from 'react'

const system = createSystem(defaultConfig, {
  globalCss: {
    body: {
      colorPalette: 'teal',
    },
  },
  theme: {
    tokens: {
      fonts: {
        body: { value: 'var(--font-outfit)' },
      },
    },
    semanticTokens: {
      radii: {
        l1: { value: '0.5rem' },
        l2: { value: '0.75rem' },
        l3: { value: '1rem' },
      },
    },
  },
})

export const Provider = (props: PropsWithChildren) => (
  <ChakraProvider value={system}>
    {props.children}
  </ChakraProvider>
)