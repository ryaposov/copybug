<template>
  <AppStack
    id="main"
    tag="div"
    :data-name="$NAME"
    class="app-pl-320"
  >
    <AppSidebar
      v-if="storeSidebarVisibility"
      class="app-absolute app-z-10 app-left-0 app-top-0 app-h-full app-w-320 app-color-bg-1"
    />
    <AppCanvas
      :class="canvasClasses"
      class="app-absolute app-z-0 app-left-0 app-top-0 app-h-full app-w-full"
    />
  </AppStack>
</template>

<script>
import AppStack from '@ryaposov/essentials/AppStack.vue'
import AppSidebar from '/~/components/AppSidebar/index.vue'
import AppCanvas from '/~/components/AppCanvas/index.vue'

import { debounce } from '/~/plugins/helpers.js'
import { mapState, mapGetters, mapActions } from 'vuex'
import Cookies from 'js-cookie'

export default {
  name: 'App',
  components: {
    AppStack,
    AppSidebar,
    AppCanvas
  },
  computed: {
    canvasClasses () {
      return [
        ...{
          true: ['app-pl-320'],
          false: []
        }[this.storeSidebarVisibility]
      ]
    },
    value () {
      return this.storeActivePreset.pages.length ? 
        this.storeActivePreset.pages.find(page => this.storeActivePreset.activePageId === page.id).value : ''
    },
    url () {
      return this.storeActivePreset.mainUrl
    },
    fullUrl () {
      return this.url + this.value
    },
    ...mapState({
      storeSidebarVisibility: state => state.sidebarVisibility,
    }),
    ...mapGetters({
      storeActivePresetCleanMainUrl: 'activePresetCleanMainUrl',
      storeActivePreset: 'activePreset',
    })
  },
  watch: {
    storeActivePresetCleanMainUrl: function (newValue, oldValue) {
      this.changeMainUrlCookie(newValue)
    }
  },
  methods: {
    changeMainUrlCookie: debounce(function (value) {
      Cookies.set('mainUrl', value, { expires: 365 })
    }, 500)
  }
}
</script>
