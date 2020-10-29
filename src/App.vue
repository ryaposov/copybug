<template>
  <AppStack
    id="main"
    tag="main"
    :data-name="$NAME"
    class="app-pl-320"
  >
    <AppSidebar
      :active-tab="activeTab"
      :screens="screens"
      :settings="settings"
      class="app-absolute app-left-0 app-top-0 app-h-full app-w-320 app-color-bg-1"
      @active-tab-change="activeTab = $event"
      @settings-change="onSettingsChange"
    />
    <RouterView />
    {{ settings }}
  </AppStack>
</template>

<script>
import AppSidebar from '/~/components/AppSidebar/index.vue'
import AppStack from '@ryaposov/essentials/AppStack.vue'

export default {
  name: 'App',
  components: {
    AppStack,
    AppSidebar
  },
  data: () => ({
    activeTab: 'screens',
    settings: {
      mainUrl: 'v2.boldking.localhost',
      defaultSize: 'iPhone 8',
      defaultPlatform: 'nl',
      defaultLanguage: 'en-gb',
      ignoreBrowserUi: false,
      scrollPanesTogether: false
    },
    screens: [
      {
        name: 'iPhone 8',
        size: '375x677',
        parameters: {
          platform: 'nl',
          language: 'en-gb'
        }
      },
      {
        name: 'iPhone 8 Plus',
        size: '414x714',
        parameters: {
          platform: 'nl',
          language: 'nl-nl'
        }
      },
      {
        name: 'iPhone 8',
        size: '375x677',
        parameters: {
          platform: 'nl',
          language: 'en-gb'
        }
      },
      {
        name: 'iPhone 8 Plus',
        size: '414x714',
        parameters: {
          platform: 'nl',
          language: 'nl-nl'
        }
      }
    ]
  }),
  methods: {
    onActiveTabChange () {
      
    },
    onSettingsChange ($event) {
      this.settings = {
        ...this.settings,
        ...$event
      }
    }
  }
}
</script>
