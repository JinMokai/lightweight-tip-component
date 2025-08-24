import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig(({ command, mode }) => {
  const isLib = command === 'build' && mode === 'lib'
  if (isLib) {
    return {
      build: {
        lib: {
          entry: resolve(__dirname, 'src/main.js'),
          name: 'LightweightTipComponent',
          fileName: (format) => `lightweight-tip-component.${format}.js`,
          formats: ['es', 'umd', 'iife'],
        },
        rollupOptions: {
          external: [],
          output: {
            globals: {}
          }
        },
        sourcemap: true,
        emptyOutDir: true
      },
      server: {
        open: true,
        port: 3000
      }
    }
  }

  return {
    build: {
      outDir: 'distDemo',
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html')
        }
      }
    },
    server: {
      open: true,
      port: 3000
    }
  }

});