import * as path from 'path'

// vite.config.js
export default {
  alias: {
    '/~/': path.resolve(__dirname, 'src'),
    '/packages/': path.resolve(__dirname, 'packages')
  },
  port: 3030
}