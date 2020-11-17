<template>
  <div class="app-relative app-select-none">
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
        :src="url"
        :style="{
          width: screen.parameters.size.split('x')[0] + 'px',
          height: screen.parameters.size.split('x')[1] + 'px',
        }"
      />
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
    }
  },
  emits: ['remove', 'change'],
  data: () => ({
    configure: false,
    activeParameter: 'size'
  }),
  computed: {
    url () {
      return this.storeActivePreset.mainUrl
    },
    ...mapGetters({
      storeActivePreset: 'activePreset'
    }),
  },
  mounted () {
    // this.mountIframe()
  },
  methods: {
    mountIframe () {
      // this.$refs.iframe.innerHTML = boldkingCode
      var iframe = document.createElement('iframe')
      var html = boldkingCode.replace(/src="\//g, 'src="https://boldking.com/nl/en-gb/').replace(/data-src="\//g, 'data-src="https://boldking.com/nl/en-gb/')
      this.$refs.iframe.appendChild(iframe)
      iframe.src = 'https://boldking.com/nl/en-gb/'
      iframe.width = '100%'
      iframe.height = '100%'
      iframe.contentWindow.document.open()
      iframe.contentWindow.document.write(html)
      iframe.contentWindow.document.close()
    },
    onParameterChange ($event) {
      this.$emit('change', { ...this.screen, parameters: { ...this.screen.parameters, ...$event }})
      this.configure = false
    },
    onParameterSelect ($event) {
      this.activeParameter = $event
      this.configure = true
    }
  }
}
</script>