import { createVuetify } from 'vuetify';
import '@mdi/font/css/materialdesignicons.css';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { AuroraTheme} from '@/theme/AuroraTheme';


export default createVuetify({
    components,
    directives,

    theme: {
        defaultTheme: 'AuroraTheme',
        themes: {
            AuroraTheme,
        }
    },
    defaults: {
        VBtn: {},
        VCard: {
            rounded: 'md'
        },
        VTextField: {
            rounded: 'lg'
        },
        VTooltip: {
            // set v-tooltip default location to top
            location: 'top'
        }
    }
});
