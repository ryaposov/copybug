<template>
  <AppStack
    direciton="row"
    wrap="wrap"
    class=""
  >
    <template v-if="storeActivePreset.screens.length">
      <AppCanvasScreen
        v-for="screen in storeActivePreset.screens"
        :key="screen.id"
        :screen="screen"
        class="app-mr-28 app-mb-28"
        @remove="storeRemoveActivePresetScreen"
        @change="storeUpdateActivePresetScreen"
      />
    </template>
    <AppStack
      direction="col"
      align="center"
      justify="center"
      :style="storeActivePreset.screens.length ? {
        width: storeActivePreset.screens[storeActivePreset.screens.length - 1].parameters.size.split('x')[0] + 'px',
        height: storeActivePreset.screens[storeActivePreset.screens.length - 1].parameters.size.split('x')[1] + 'px',
      } : {}"
      class="app-mt-36 app-overflow-hidden app-rounded-4 app-color-border-2 app-opacity-75
        app-border app-group app-w-320 app-h-600 hover:app-opacity-100 app-transition-opacity app-duration-100"
    >
      <AppStack
        direction="col"
        align="center"
        class="app-text-center app-cursor-pointer"
        @click="storeAddActivePresetScreen"
      >
        <AppStack
          align="center"
          justify="center"
          direction="col"
          class="app-relative app-cursor-pointer app-w-40 app-h-40
            app-overflow-hidden app-rounded-full app-mb-12 app-group"
        >
          <AppIcon
            size="20"
            icon="plus"
            color="brand"
          />
          <div
            class="app-color-bg-brand app-absolute app-w-full app-h-full app-opacity-10
              app-transition-opacity app-duration-100 group-hover:app-opacity-20"
          />
        </AppStack>
        <AppStack direction="col">
          <AppText
            size="16"
            weigth="semibold"
            text="Add panes to the canvas."
            color="2"
          />
          <AppText
            size="14"
            weight="regular"
            html="Use different combinations <br>of language and platform."
            color="3"
            class="app-mt-4"
          />
        </AppStack>
      </AppStack>
    </AppStack>
  </AppStack>
</template>

<script>
import AppStack from '@ryaposov/essentials/AppStack.vue'
import AppText from '@ryaposov/essentials/AppText.vue'
import AppIcon from '@ryaposov/essentials/AppIcon.vue'
import AppCanvasScreen from './AppCanvasScreen.vue'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AppCanvasScreens',
  components: {
    AppStack,
    AppText,
    AppIcon,
    AppCanvasScreen
  },
  computed: {
    ...mapGetters({
      storeActivePreset: 'activePreset'
    })
  },
  methods: {
    ...mapActions({
      storeRemoveActivePresetScreen: 'removeActivePresetScreen',
      storeAddActivePresetScreen: 'addActivePresetScreen',
      storeUpdateActivePresetScreen: 'updateActivePresetScreen'
    })
  }
}
</script>