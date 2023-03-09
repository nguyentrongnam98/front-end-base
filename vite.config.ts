import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'
// import reactRefresh from '@vitejs/plugin-react-refresh';
import { fileURLToPath } from 'url';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createAntdLessConfig = (env: Record<string, string>) => {
  const prefixAntdCls = env.VITE_PREFIX_CLASS_NAME || 'ulk-antd';
  return {
    less: {
      javascriptEnabled: true,
      modifyVars: {
        'ant-prefix': prefixAntdCls,
        "primary-color": "#07A0B8",
        "btn-border-radius-base": "10px",
        "btn-border-radius-sm": "6px",
      },
    },
  };
};

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const antdLessConfig = createAntdLessConfig(env);
  const isLocalMode = mode === 'devLocal';
  return {
    plugins: [react(), eslint({
      cache: !isLocalMode,
      emitError: true,
      emitWarning: isLocalMode,
    }),],
    server: {
      host: true,
      open: true,
      port: +env.DEV_PORT,
    },
    define: {
      global: 'window'
    },
    css: {
      preprocessorOptions: {
        ...antdLessConfig,
      },
    },
    resolve: {
      alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
    },
    build: {
      manifest: true,
      target: 'esnext',
      minify: true,
      cssCodeSplit: false,
    },
  }
})
