import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'
// import reactRefresh from '@vitejs/plugin-react-refresh';
import { fileURLToPath } from 'url';


// https://vitejs.dev/config/
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export default defineConfig({
  plugins: [react()],
  server: {
    host: true
  },
  define:{
    global: 'window'
  },
  css:{
    preprocessorOptions: {
      less: {
        modifyVars: {
          // write default is here
          "primary-color": "#07A0B8",
          "btn-border-radius-base": "10px",
          "btn-border-radius-sm": "6px"
        },
        javascriptEnabled: true
      },
      scss: {
        // additionalData: `@import "@/styles/main.scss";`
      }
    }
  },
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
})
