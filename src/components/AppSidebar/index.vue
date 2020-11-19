<template>
  <AppStack 
    :data-name="$NAME"
    direction="col"
    tag="aside"
  >
    <AppSidebarTabs class="app-px-20 app-py-24" />
    <div
      ref="scrollViewEl"
      :class="scrollViewClasses"
      class="app-overflow-y-auto"
    >
      <AppSidebarScreens
        v-if="storeActiveSidebarTab === 'screens'"
        class="app-pt-20"
      />
      <AppSidebarSettings
        v-else-if="storeActiveSidebarTab === 'settings'"
        class="app-pt-20 app-px-20"
      />
    </div>
    <AppStack
      direction="col"
      class="app-mt-auto"
    >
      <AppSidebarScreensPages
        v-if="storeActiveSidebarTab === 'screens' && storeActivePreset.pages.length > 1 && storeActivePreset.activePageId"
        class="app-px-20"
      />
      <AppStack class="app-px-20 app-py-20">
        <AppText
          :text="storeActivePreset.name"
          size="14"
          weight="semibold"
          color="3"
          class="app-mr-8"
        />
        <AppText
          :text="storeActivePreset.screens.length + ' screens'"
          size="14"
          weight="regular"
          color="3"
        />
      </AppStack>
    </AppStack>
  </AppStack>
</template>

<script>
  import AppStack from '@ryaposov/essentials/AppStack.vue'
  import AppText from '@ryaposov/essentials/AppText.vue'
  import AppSidebarTabs from './AppSidebarTabs.vue'
  import AppSidebarScreens from './AppSidebarScreens.vue'
  import AppSidebarSettings from './AppSidebarSettings.vue'
  import AppSidebarScreensPages from './AppSidebarScreensPages.vue'

  import { ref, onMounted, computed } from 'vue'
  import { mapState, mapGetters } from 'vuex'

  export default {
    name: 'AppSidebar',
    components: {
      AppStack,
      AppText,
      AppSidebarTabs,
      AppSidebarScreens,
      AppSidebarSettings,
      AppSidebarScreensPages
    },
    data: () => ({
      scrollViewOverflow: false
    }),
    computed: {
      tabs () {
        return { screens: 'Screens', settings: 'Preset Settings' }
      },
      scrollViewClasses () {
        return [
          ...{
            true: ['app-border-t', 'app-border-b', 'app-color-border-1'],
            false: []
          }[this.scrollViewOverflow]
        ]
      },
      ...mapState({
        storeActiveSidebarTab: 'activeSidebarTab'
      }),
      ...mapGetters({
        storeActivePreset: 'activePreset'
      })
    },
    mounted () {
      const scrollView = this.$refs.scrollViewEl
      this.scrollViewOverflow = scrollView.scrollHeight >= scrollView.clientHeight

      const resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
          this.scrollViewOverflow = entry.target.scrollHeight > entry.target.clientHeight
        }
      })

      resizeObserver.observe(scrollView)
    }
  }
</script>