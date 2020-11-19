<template>
  <AppStack
    direction="col"
    class="app-relative app-group"
  >
    <AppStack
      align="center"
      class="app-mb-8 app-cursor-pointer "
      @click="$emit('click', preset.id)"
    >
      <AppHeading
        size="16"
        weight="semibold"
        :text="preset.name"
        class="app-mr-12"
      />
      <AppText
        size="14"
        weight="regular"
        color="3"
        :text="preset.screens.length + ' screens'"
        class="app-mr-12"
      />
      <AppText
        size="14"
        weight="regular"
        color="3"
        :text="presetDate"
      />
    </AppStack>
    <AppStack align="center">
      <AppIcon
        size="12"
        icon="globe"
        color="2"
        class="app-mr-4 app-relative app--top-1"
      />
      <AppText
        size="14"
        weight="regular"
        color="2"
        :text="preset.settings.mainUrl"
      />
    </AppStack>
    <AppIcon
      size="18"
      icon="bin"
      color="4"
      hover-color="3"
      class="app-absolute app-right-0 app-top-0 app-transition-opacity app-duration-100 app-opacity-0 group-hover:app-opacity-100"
      @click="$emit('remove', preset.id)"
    />
  </AppStack>
</template>

<script>
import AppIcon from '@ryaposov/essentials/AppIcon.vue'
import AppStack from '@ryaposov/essentials/AppStack.vue'
import AppHeading from '@ryaposov/essentials/AppHeading.vue'
import AppText from '@ryaposov/essentials/AppText.vue'

import dayjs from 'dayjs'

export default {
  name: 'AppCanvasBottomBarPresets',
  components: {
    AppIcon,
    AppStack,
    AppHeading,
    AppText
  },
  props: {
    preset: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['click', 'remove'],
  computed: {
    presetDate () {
      return dayjs().format('HH:mm - DD.MM.YY')
    }
  }
}
</script>