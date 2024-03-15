import type { ThemeTypes } from '@/types/themeTypes/ThemeType';

const AuroraTheme: ThemeTypes = {
    name: 'AuroraTheme',
    dark: false,
    variables: {
        'border-color': '#3f0423',
        'carousel-control-size': 10
    },
    colors: {
        primary: '#952166',
        secondary: '#49BEFF',
        info: '#539BFF',
        success: '#13DEB9',
        accent: '#FFAB91',
        warning: '#FFAE1F',
        error: '#FA896B',
        muted:'#5a6a85',
        lightprimary: '#cf3f95',
        lightsecondary: '#E8F7FF',
        lightsuccess: '#E6FFFA',
        lighterror: '#FDEDE8',
        lightwarning: '#FEF5E5',
        textPrimary: '#2A3547',
        textSecondary: '#2A3547',
        borderColor: '#e5eaef',
        inputBorder: '#000',
        containerBg: '#ffffff',
        hoverColor: '#f6f9fc',
        surface: '#fff',
        'on-surface-variant': '#fff',
        grey100: '#F2F6FA',
        grey200: '#EAEFF4',
        indigo: '#3F51B5',
        orange: '#cb5a2d',
        pink: '#e32e88',
        teal: '#26A69A',
        green: '#4CAF50',
        red: '#F44336',
    }
};
export { AuroraTheme };
