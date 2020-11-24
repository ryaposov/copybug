<template>
  <div
    class="app-relative app-select-none"
    :style="{ width: scaledScreenSize.width + 'px' }"
  >
    <AppCanvasScreenBar
      :screen="screen"
      :configure="configure"
      @remove="$emit('remove', screen)"
      @configure="configure = !configure"
      @parameter-select="onParameterSelect"
    />
    <div class="app-relative app-color-bg-1 app-overflow-hidden app-rounded-4 app-overflow-hidden app-color-border-1 app-border">
      <div
        ref="iframeContainer"
        :style="{
          width: scaledScreenSize.width + 'px',
          height: scaledScreenSize.height + 'px',
        }"
      >
        <template v-if="loading">
          <div class="app-absolute app-z-10 app-top-0 app-left-0 app-w-full app-h-full app-color-bg-1 app-opacity-90" />
          <div class="app-absolute app-z-10 app-top-1/2 app-left-1/2 app-transform app--translate-x-1/2 app--translate-y-1/2">
            <AppIcon
              icon="refresh"
              size="40"
              class="app-animate-spin app-opacity-50"
            />
          </div>
        </template>
        <iframe
          ref="iframe"
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
    <AppText
      :text="iframeCleanPath"
      size="14"
      display="block"
      color="3"
      class="app-mt-8"
    />
  </div>
</template>

<script>
import AppIcon from '@ryaposov/essentials/AppIcon.vue'
import AppText from '@ryaposov/essentials/AppText.vue'
import AppCanvasScreenBar from './AppCanvasScreenBar.vue'
import AppCanvasScreenConfigure from './AppCanvasScreenConfigure.vue'

import { mapGetters } from 'vuex'
import { debounce } from '/~/plugins/helpers.js'

export default {
  name: 'AppCanvasScreen',
  components: {
    AppIcon,
    AppText,
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
    },
    loading: {
      type: Boolean,
      default: false
    },
  },
  emits: ['remove', 'change'],
  data: () => ({
    iframe: null,
    iframeSrc: null,
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
        src: this.iframeSrc,
        sandbox: 'allow-same-origin allow-scripts allow-forms',
        referrerPolicy: 'no-referrer',
        dataId: this.screen.id,
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
    iframeCleanPath () {
      try {
        const url = new URL(this.iframeCleanSrc)
        return url.searchParams.get('pathUrl')
      } catch (error) {
        return ''
      }
    },
    iframeCleanSrc () {
      try {
        const dirtyUrl = this.$PROXY_URL
        const url = new URL(dirtyUrl)
        let mainUrl = this.storeActivePreset.settings.mainUrl
        let page = this.storeActivePage ? this.storeActivePage.value : ''

        if (this.screen.parameters.language && this.storeActivePreset.languages && this.storeActivePreset.settings.languageRegex) {
          const regex = new RegExp(this.storeActivePreset.settings.languageRegex)
          const langToReplace = page.match(regex) ? page.match(regex)[0].replace(/\//g, '') : ''
          if (langToReplace) page = page.replace(langToReplace, this.screen.parameters.language) 
        }

        url.searchParams.append('mainUrl', mainUrl)
        url.searchParams.append('pathUrl', page)
        url.searchParams.append('iframeId', this.screen.id)

        return url.href
      } catch (error) {
        console.log(error)

        return ''
      }
    },
    ...mapGetters({
      storeActivePreset: 'activePreset',
      storeActivePage: 'activePage'
    }),
  },
  watch: {
    storeActivePage (newValue, oldValue) {
      this.setIframeSrc(newValue)
    },
    'screen.parameters.language' (newValue, oldValue) {
      this.reloadIframe()
    }
  },
  mounted () {
    this.iframe = this.$refs.iframe
    this.setIframeSrc(this.storeActivePage)
    this.subscribeToGlobalEvents()
  },
  methods: {
    setIframeSrcWithDebounce: debounce(function (page) {
      this.setIframeSrc()
    }, 2000),
    setIframeSrc (page) {
      this.iframeSrc = this.iframeCleanSrc
    },
    subscribeToGlobalEvents () {
      this.emitter.on('iframes-reload', this.reloadIframe)
    },
    reloadIframe () {
      const page = this.storeActivePage
      this.iframeSrc = null
      this.$nextTick(this.setIframeSrc)
      // this.iframe.contentWindow.postMessage('reload', this.$PROXY_URL)
    },
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