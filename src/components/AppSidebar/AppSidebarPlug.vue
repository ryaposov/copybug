<template>
  <AppStack
    direction="col"
    align="center"
    tag="li"
    class="app-text-center"
  >
    <AppIcon
      icon="pane"
      size="60"
      color="4"
      class="app-mb-12 app-opacity-50"
    />
    <AppText
      text="Add your first pane to canvas"
      size="16"
      color="2"
      class="app-mb-12"
    />
    <AppButton
      type="framed"
      text="Add Pane"
      weight="semibold"
      color="2"
      border="1"
      rounded="3"
      icon="plus"
      @click="$emit('button-click', $event)"
    />
  </AppStack>
</template>

<script>
import AppStack from '@ryaposov/essentials/AppStack.vue'
import AppText from '@ryaposov/essentials/AppText.vue'
import AppIcon from '@ryaposov/essentials/AppIcon.vue'
import AppButton from '@ryaposov/essentials/AppButton.vue'
  
export default {
  name: 'AppSidebarPlug',
  components: {
    AppStack,
    AppText,
    AppIcon,
    AppButton
  },
  emits: ['button-click']
}
</script>