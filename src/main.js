import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import './index.css';
import {createI18n} from 'vue-i18n';
import en from './locales/en.json';
import fr from './locales/fr.json';
import 'vue-component-toolkit/dist/style.css';
import 'vue-component-toolkit/dist/library-styles.css';

const app = createApp(App)

app.use(router)
const i18n = createI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
        en,
        fr
    }
});
app.use(i18n);

app.mount('#app')

