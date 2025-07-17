import {
    createAppleSplashScreens,
    defineConfig,
    minimal2023Preset
} from '@vite-pwa/assets-generator/config'

export default defineConfig({
    preset: {
        ...minimal2023Preset,
        appleSplashScreens: createAppleSplashScreens({
            padding: 0.3,
            resizeOptions: {background: '#292524', fit: 'contain'}
        })
    }
})