import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VitePWA(
      { 
        registerType: 'autoUpdate', 
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
        manifest: {
          name: 'ToSM Junior',
          short_name: 'ToSM Junior',
          description: 'Permainan untuk melatih dan mengingat operasi hitung dasar untuk pelajar SD',
          theme_color: '#595959',
          display: "standalone",
          icons: [
            {
              src: "/img/android-chrome-192x192.png",
              sizes: "192x192",
              type: "image/png"
            },
            {
              src: "/img/android-chrome-512x512.png",
              sizes: "512x512",
              type: "image/png"
            },
            {
              src: 'img/basic-launcher.png',
              sizes: '540x540',
              type: 'image/png',
              purpose: 'any'
            },
            {
              src: 'img/maskable-icon.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable'
            },
          ]
        }
      },
    ),
    vue(),
  ],
})
