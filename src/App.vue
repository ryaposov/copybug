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

import { mapState, mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
    AppStack,
    AppSidebar,
    AppCanvas
  },
  data: () => ({
    
  }),
  computed: {
    canvasClasses () {
      return [
        ...{
          true: ['app-pl-320'],
          false: []
        }[this.storeSidebarVisibility]
      ]
    },
    ...mapState({
      storeSidebarVisibility: state => state.sidebarVisibility,
    })
  }
}
</script>
