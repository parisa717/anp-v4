import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

const PORT = 4000
const CONTAINER_NAME = 'nexus_workshop-scheduler'
const DOCKER_ORIGIN = 'https://workshop-scheduler.nexus.dev'

// https://vitejs.dev/config/
export default defineConfig(() => {
  const isLocalDockerSetup = process.env.LOCAL_DOCKER_SETUP === 'true'

  return {
    plugins: [react(), tsconfigPaths()],
    server: {
      port: PORT,
      strictPort: true,
      ...(isLocalDockerSetup
        ? {
            host: CONTAINER_NAME,
            origin: DOCKER_ORIGIN,
          }
        : {
            host: true,
            origin: `http://localhost:${PORT}`,
          }),
    },
  }
})
