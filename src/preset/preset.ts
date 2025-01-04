import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';
import Lara from '@primeng/themes/lara';

const MyPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{blue.50}',
            100: '{blue.100}',
            200: '{blue.200}',
            300: '{blue.300}',
            400: '{blue.400}',
            500: '{blue.500}',
            600: '{blue.600}',
            700: '{blue.700}',
            800: '{blue.800}',
            900: '{blue.900}',
            950: '{blue.950}'
        },
    },
    colorScheme: {
        light: {
            primary: {
                color: '{blue.950}',
                inverseColor: '#ffffff',
                hoverColor: '{blue.900}',
                activeColor: '{blue.800}'
            },
            highlight: {
                background: '{blue.950}',
                focusBackground: '{blue.700}',
                color: '#ffffff',
                focusColor: '#ffffff'
            },
            formField: {
                hoverBorderColor: '{primary.color}'
            }
        },
        dark: {
            primary: {
                color: '{zinc.50}',
                inverseColor: '{zinc.950}',
                hoverColor: '{zinc.100}',
                activeColor: '{zinc.200}'
            },
            highlight: {
                background: 'rgba(250, 250, 250, .16)',
                focusBackground: 'rgba(250, 250, 250, .24)',
                color: 'rgba(255,255,255,.87)',
                focusColor: 'rgba(255,255,255,.87)'
            },
            formField: {
                hoverBorderColor: '{primary.color}'
            }
        }
    }
});

export default MyPreset;