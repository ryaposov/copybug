<template>
  <AppStack 
    :data-name="$NAME"
    direction="col"
    tag="aside"
  >
    <AppSidebarTabs
      :active="props.activeTab"
      class="app-px-20 app-py-24"
      @change="$emit('active-tab-change', $event)"
    />
    <div
      ref="scrollViewEl"
      :class="scrollViewClasses"
      class="app-overflow-y-auto"
    >
      <AppSidebarScreens
        v-if="props.activeTab === 'screens'"
        :screens="props.screens"
        class="app-pt-20"
      />
      <AppSidebarSettings
        v-else-if="props.activeTab === 'settings'"
        :settings="props.settings"
        class="app-pt-20 app-px-20"
        @change="$emit('settings-change', $event)"
      />
    </div>
    <AppStack class="app-px-20 app-py-20 app-mt-auto">
      <AppText
        text="Default Preset"
        size="14"
        weight="semibold"
        color="3"
        class="app-mr-8"
      />
      <AppText
        text="4 screens"
        size="14"
        weight="regular"
        color="3"
      />
    </AppStack>
  </AppStack>
</template>

<script>
  import AppStack from '@ryaposov/essentials/AppStack.vue'
  import AppText from '@ryaposov/essentials/AppText.vue'
  import AppSidebarTabs from './AppSidebarTabs.vue'
  import AppSidebarScreens from './AppSidebarScreens.vue'
  import AppSidebarSettings from './AppSidebarSettings.vue'

  import { ref, onMounted, computed } from 'vue'

  export default {
    name: 'AppSidebar',
    components: {
      AppStack,
      AppText,
      AppSidebarTabs,
      AppSidebarScreens,
      AppSidebarSettings
    },
    props: {
      activeTab: {
        type: String,
        default: 'screens',
        validator: val => ['screens', 'settings'].includes(val)
      },
      activePreset: {
        type: Object,
        default: () => ({
          name: '',
          description: ''
        })
      },
      screens: {
        type: Array,
        default: () => ([])
      },
      settings: {
        type: Object,
        default: () => ({})
      }
    },
    emits: ['settings-change', 'active-tab-change'],
    setup (props, { }) {
      const scrollViewOverflow = ref(false)
      const scrollViewEl = ref(null)
      const scrollViewClasses = computed(() => [
        ...{
          true: ['app-border-t', 'app-border-b', 'app-color-border-1'],
          false: []
        }[scrollViewOverflow.value]
      ])

      onMounted(() => {
        const scrollView = scrollViewEl.value
        scrollViewOverflow.value = scrollView.scrollHeight >= scrollView.clientHeight

        const resizeObserver = new ResizeObserver(entries => {
          for (let entry of entries) {
            console.log(entries, scrollViewOverflow.value, entry.target.scrollHeight > entry.target.clientHeight, entry.target.scrollHeight, entry.target.clientHeight)
            scrollViewOverflow.value = entry.target.scrollHeight > entry.target.clientHeight
          }
        })

        resizeObserver.observe(scrollViewEl.value)
      })

      return {
        scrollViewEl,
        scrollViewClasses,
        scrollViewOverflow,
        props
      }
    }
  }
</script>