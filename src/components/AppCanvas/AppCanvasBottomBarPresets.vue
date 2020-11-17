<template>
  <AppStack direction="col">
    <AppHeading
      size="24"
      weight="bold"
      text="Load Preset"
    />
    <AppStack
      class="app-mt-40"
      direction="col"
    >
      <AppHeading
        size="18"
        weight="semibold"
        text="Custom Presets"
        color="3"
        class="app-mb-32"
      />
      <AppCanvasBottomBarPreset
        v-for="preset in presets"
        :key="preset.id"
        :preset="preset"
        class="app-mb-32 last:app-mb-initial"
        @click="$emit('preset-select', preset.id)"
        @remove="$emit('preset-remove', preset.id)"
      />
    </AppStack>
    <!-- <AppStack
      class="app-mt-40"
      direction="col"
    >
      <AppHeading
        size="18"
        weight="semibold"
        text="Default Presets"
        color="3"
        class="app-mb-32"
      />
      <AppCanvasBottomBarPreset
        v-for="preset in presets"
        :key="preset.id"
        :preset="preset"
        class="app-cursor-pointer app-mb-32 last:app-mb-initial"
        @click="$emit('preset-select', preset.id)"
      />
    </AppStack> -->
  </AppStack>
</template>

<script>
import AppStack from '@ryaposov/essentials/AppStack.vue'
import AppHeading from '@ryaposov/essentials/AppHeading.vue'

import AppCanvasBottomBarPreset from './AppCanvasBottomBarPreset.vue'

export default {
  name: 'AppCanvasBottomBarPresets',
  components: {
    AppStack,
    AppHeading,
    AppCanvasBottomBarPreset
  },
  props: {
    presets: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['preset-select', 'preset-remove']
}
</script>

<style>

</style>