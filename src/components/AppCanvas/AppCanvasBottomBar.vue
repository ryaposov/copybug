<template>
  <AppStack class="">
    <AppStack>
      <AppButton
        size="14"
        weight="semibold"
        type="framed"
        bg="brand"
        color="opposite"
        rounded="3"
        text="Save"
        class="app-mr-8"
      />
      <AppButton
        size="14"
        weight="semibold"
        type="framed"
        bg="25"
        color="1"
        rounded="3"
        text="Load Preset"
      />
    </AppStack>
    <AppStack class="app-ml-auto">
      <AppStack class="app-mr-32">
        <AppButton
          size="14"
          weight="semibold"
          type="framed"
          bg="25"
          color="1"
          rounded="3"
          text="Add Pane"
          icon="plus"
          class="app-mr-8"
          @click="onScreenAdd"
        />
        <AppButton
          size="14"
          weight="semibold"
          type="framed"
          bg="opposite"
          color="opposite"
          rounded="3"
          text="Reload"
          icon="refresh"
        />
      </AppStack>
      <AppStack>
        <AppButton
          size="14"
          weight="semibold"
          type="framed"
          bg="1"
          color="1"
          rounded="3"
          border="opposite"
          icon="edit"
          class="app-mr-8"
        />
        <AppButton
          size="14"
          weight="semibold"
          type="framed"
          bg="1"
          :color="storeSidebarVisibility ? 1 : 2"
          :border="storeSidebarVisibility ? 'opposite' : 1"
          rounded="3"
          icon="sidebar"
          @click="onSidebarToggleClick"
        />
      </AppStack>
    </AppStack>
  </AppStack>
</template>

<script>
import AppStack from '@ryaposov/essentials/AppStack.vue'
import AppButton from '@ryaposov/essentials/AppButton.vue'

import { mapState, mapActions } from 'vuex'

export default {
  name: 'AppCanvasBottomBar',
  components: {
    AppStack,
    AppButton,
  },
  computed: {
    ...mapState({
      storeSidebarVisibility: state => state.sidebarVisibility
    }),
  },
  methods: {
    onScreenAdd ($event) {
      this.storeAddScreen()
    },
    onSidebarToggleClick () {
      this.storeUpdateSidebarVisibility(!this.storeSidebarVisibility)
    },
    ...mapActions({
      storeAddScreen: 'addScreen',
      storeUpdateSidebarVisibility: 'updateSidebarVisibility'
    })
  }
}
</script>

<style>

</style>