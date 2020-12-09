<template>
  <AppStack
    :data-name="$NAME"
    direciton="row"
    wrap="wrap"
  >
    <template v-if="storeActivePreset.screens.length">
      <AppCanvasScreen
        v-for="screen in storeActivePreset.screens"
        :key="screen.id"
        :ref="setCanvasScreenRefs"
        :screen="screen"
        class="app-mr-28 app-mb-28"
        @remove="storeRemoveActivePresetScreen"
        @change="storeUpdateActivePresetScreen"
        @mouseover="controlledScreenId = screen.id"
        @mouseout="controlledScreenId = null"
      />
    </template>
    <AppStack
      v-else
      direction="col"
      align="center"
      justify="center"
      :style="placeholderStyles"
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
            html="Use different languages!"
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

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'AppCanvasScreens',
  components: {
    AppStack,
    AppText,
    AppIcon,
    AppCanvasScreen
  },
  data: () => ({
    controlledScreenId: null,
    canvasScreens: {},
  }),
  computed: {
    placeholderStyles () {
      const lastScreen = this.storeActivePreset.screens.length ? [...this.storeActivePreset.screens].pop() : null
      const scale = this.storeActivePreset.scale
      let screenWidth = lastScreen ? parseInt(lastScreen.parameters.size.split('x')[0]) : 320
      let screenHeight = lastScreen ? parseInt(lastScreen.parameters.size.split('x')[1]) : 480

      screenWidth = (screenWidth * (scale / 100))
      screenHeight = (screenHeight * (scale / 100))

      return {
        width: screenWidth + 'px',
        height: screenHeight + 'px'
      }
    },
    ...mapState({
      storeReplicateEvents: state => state.replicateEvents,
    }),
    ...mapGetters({
      storeActivePreset: 'activePreset'
    })
  },
  watch: {
    'storeActivePreset.screens' (newVal, oldValue) {
      this.$nextTick(() => {
        if (newVal.length < oldValue.length) {
          const existingKeys = newVal.map(item => item.id)
          const missingKeys = Object.keys(this.canvasScreens).filter(key => !existingKeys.includes(key))
          missingKeys.forEach(key => delete this.canvasScreens[key])
        }
      })
    }
  },
  mounted () {
    window.addEventListener('message', this.onMessage, false)
  },
  methods: {
    onMessage (e) {
      if (!e.data.manual && e.data.isTrusted || e.data.type === 'scroll') {
        if (this.controlledScreenId !== e.data.iframeId) return

        // console.log('parent recieved a message:', e, e.data)
      
        if (this.storeReplicateEvents) {
          Object.keys(this.canvasScreens).forEach(key => {
            const screen = this.storeActivePreset.screens.find(screen => screen.id === key)
  
            if (screen && e.data.iframeId !== screen.id) {
              this.canvasScreens[key].iframe.contentWindow.postMessage(e.data, this.$PROXY_URL)
            }
          })
        }

      } else if (e.data.manual) {
        if (e.data.type === 'ready') {
          
        }
      }
    },
    setCanvasScreenRefs (ref) {
      if (ref) this.canvasScreens[ref.screen.id] = ref
    },
    ...mapActions({
      storeRemoveActivePresetScreen: 'removeActivePresetScreen',
      storeAddActivePresetScreen: 'addActivePresetScreen',
      storeUpdateActivePresetScreen: 'updateActivePresetScreen'
    })
  }
}
</script>