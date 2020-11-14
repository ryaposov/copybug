<template>
  <main>
    <div class="app-relative app-h-full">
      <div class="app-h-full app-w-full app-overflow-auto">
        <AppCanvasScreens class="app-px-40 app-pt-20 app-pb-80" />
        <AppCanvasBottomBar class="app-w-full app-absolute app-bottom-0 app-left-0 app-px-40 app-py-20" />
      </div>
    </div>
  </main>
</template>

<script>
import AppCanvasScreens from './AppCanvasScreens.vue'
import AppCanvasBottomBar from './AppCanvasBottomBar.vue'

export default {
  name: 'AppCanvas',
  components: {
    AppCanvasScreens,
    AppCanvasBottomBar
  }
}
</script>