import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],

    server: {
      host: true,
    },

    preview: {
      allowedHosts: [
        env.VITE_ALLOWED_HOST,
        env.VITE_LOCAL_ALLOWED_HOST,
      ].filter(Boolean),
    },
  };
});
