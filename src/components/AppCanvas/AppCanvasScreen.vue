<template>
  <div
    class="app-relative app-select-none"
    :style="{
      width: scaledScreenSize.width + 'px'
    }"
  >
    <AppCanvasScreenBar
      :screen="screen"
      :configure="configure"
      @remove="$emit('remove', screen)"
      @configure="configure = !configure"
      @parameter-select="onParameterSelect"
    />
    <div class="app-relative app-color-bg-1 app-overflow-hidden app-rounded-4 app-color-border-1 app-border">
      <div
        ref="iframe"
        :style="{
          width: scaledScreenSize.width + 'px',
          height: scaledScreenSize.height + 'px',
        }"
      >
        <iframe
          v-bind="iframeProps"
        />
      </div>
      <AppCanvasScreenConfigure
        v-if="configure"
        :parameters="screen.parameters"
        :active-parameter="activeParameter"
        class="app-absolute app-top-0 app-left-0 app-w-full app-h-full"
        @active-parameter-change="activeParameter = $event"
        @parameter-change="onParameterChange"
      />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

import AppCanvasScreenBar from './AppCanvasScreenBar.vue'
import AppCanvasScreenConfigure from './AppCanvasScreenConfigure.vue'

import { mapGetters } from 'vuex'

import boldkingCode from './boldking.js'

export default {
  name: 'AppCanvasScreen',
  components: {
    AppCanvasScreenBar,
    AppCanvasScreenConfigure
  },
  props: {
    screen: {
      type: Object,
      default: () => ({})
    },
    html: {
      type: String,
      default: ''
    }
  },
  emits: ['remove', 'change'],
  data: () => ({
    configure: false,
    activeParameter: 'size'
  }),
  computed: {
    scaledScreenSize () {
      const scale = this.storeActivePreset.scale
      let screenWidth = parseInt(this.screen.parameters.size.split('x')[0])
      let screenHeight = parseInt(this.screen.parameters.size.split('x')[1])

      screenWidth = (screenWidth * (scale / 100))
      screenHeight = (screenHeight * (scale / 100))

      return {
        width: screenWidth,
        height: screenHeight
      }
    },
    iframeProps () {
      const scale = this.storeActivePreset.scale
      const multiplier = this.scaledScreenSize.width / (this.scaledScreenSize.width * (scale / 100))

      return {
        src: this.$PROXY_URL + (this.storeActivePage ? this.storeActivePage.path : ''),
        sandbox: 'allow-same-origin allow-scripts allow-forms',
        referrerPolicy: 'no-referrer',
        width: '100%',
        height: '100%',
        style: {
          'width': `${multiplier * 100}% !important`,
          'height': `${multiplier * 100}% !important`,
          '-webkit-transform': `scale(${scale / 100})`,
          'transform': `scale(${scale / 100})`,
          '-webkit-transform-origin': '0 0',
          'transform-origin': '0 0',
        }
      }
    },
    ...mapGetters({
      storeActivePreset: 'activePreset',
      storeActivePage: 'activePage'
    }),
  },
  methods: {
    onParameterChange ($event) {
      this.$emit('change', { ...this.screen, parameters: { ...this.screen.parameters, ...$event }})
      this.configure = false
    },
    onParameterSelect ($event) {
      this.configure = this.activeParameter === $event && this.configure ? false : true
      this.activeParameter = $event
    }
  }
}
</script>