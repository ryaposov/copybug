<template>
  <nav :data-name="$NAME">
    <AppStack
      tag="ul"
      class="app-select-none"
      role="tablist"
      aria-label="Screens & Settings Tabs"
    >
      <AppButton
        v-for="(tab, key) in tabs"
        :key="key"
        :text="tab"
        :hover="false"
        size="14"
        tag="button"
        underline="brand"
        underline-width="2"
        v-bind="tabProps(key)"
        class="app-relative app-cursor-pointer app-mr-16 last:app-mr-initial"
        @click="storeUpdateActiveSidebarTab(key)"
      />
    </AppStack>
  </nav>
</template>

<script>
  import AppStack from '@ryaposov/essentials/AppStack.vue'
  import AppButton from '@ryaposov/essentials/AppButton.vue'

  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'AppSidebarTabs',
    components: {
      AppStack,
      AppButton
    },
    computed: {
      tabs () {
        return {
          screens: 'Screens',
          settings: 'Preset Settings'
        }
      },
      ...mapState({
        storeActiveSidebarTab: state => state.activeSidebarTab,
      })
    },
    methods: {
      tabProps (tab) {
        return {
          true: {
            weight: 'bold',
            color: 1,
            type: 'underlined'
          },
          false: {
            weight: 'semibold',
            color: 3,
            hoverColor: 2,
            type: 'text'
          }
        }[this.storeActiveSidebarTab === tab]
      },
      ...mapActions({
        storeUpdateActiveSidebarTab: 'updateActiveSidebarTab'
      })
    }
  }
</script>