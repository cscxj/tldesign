import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import alias from '@cxj-npm/rollup-plugin-alias'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    alias({
      entries: [
        {
          find: '@',
          replacement: (_, importer) => {
            // importer 是使用别名的文件的绝对路径
            const pkgPath = importer.match(/^(.+(apps|packages)\/.+?\/).*/)?.[1]
            if (!pkgPath) {
              throw Error('在非项目指定目录下的文件中使用了别名：' + importer)
            }
            return path.resolve(__dirname, pkgPath, './src')
          }
        }
      ]
    })
  ],
  server: {
    port: 6001
  }
})
