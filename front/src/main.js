import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import mixins from './mixins'
// import YouTube from 'vue3-youtube'
// import 'vue-youtube-embed/dist/vue-youtube-embed.css'
 // ES6 or TypeScript
//const googleTTS = require('google-tts-api'); // CommonJS

// get audio URL

const app = createApp(App)
// app.component('YouTube', YouTube)
app.use(router).mixin(mixins).mount('#app')
// createApp(App).use('youtube', VueYoutube).use(router).mixin(mixins).mount('#app')

