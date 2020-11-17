<template>
  <li
    class="app-group app-relative app-cursor-pointer 
      app-mb-4 app-px-20 app-py-12
      last:app-mb-initial hover:app-color-bg-2"
    @click="$emit('change', key)"
  >
    <AppStack direction="col">
      <AppStack>
        <AppText
          :text="screen.name || screen.parameters.device"
          size="14"
          weight="semibold"
          class="app-mr-8"
        />
        <AppText
          :text="screen.parameters.size"
          size="14"
          weight="regular"
          color="3"
        />
      </AppStack>
      <AppStack
        align="center"
        wrap="wrap"
      >
        <template
          v-for="(parameter, key) in parameters"
          :key="key"
        >
          <AppText
            :text="screen.parameters[parameter]"
            size="14"
            weight="regular"
            color="2"
          />
          <span
            class="app-mx-4 app-h-2 app-w-4 app-color-bg-opposite
                  app-opacity-25 last:app-hidden"
          />
        </template>
      </AppStack>
    </AppStack>
    <AppStack
      class="app-opacity-0 app-absolute app-right-20 app-top-12
            group-hover:app-opacity-100"
    >
      <!-- <AppIcon
        icon="settings"
        size="16"
        color="3"
        hover-color="2"
        class="app-mr-12"
      />
      <AppIcon
        icon="target"
        size="16"
        color="3"
        hover-color="2"
        class="app-mr-20"
      /> -->
      <AppIcon
        icon="remove"
        size="16"
        color="3"
        hover-color="2"
        @click="$emit('remove', screen)"
      />
    </AppStack>
  </li>
</template>

<script>
import AppStack from '@ryaposov/essentials/AppStack.vue'
import AppText from '@ryaposov/essentials/AppText.vue'
import AppIcon from '@ryaposov/essentials/AppIcon.vue'

export default {
  name: 'AppSidebarScreen',
  components: {
    AppStack,
    AppText,
    AppIcon
  },
  props: {
    screen: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['change', 'remove'],
  computed: {
    parameters () {
      const parameters = ['language', 'platform']

      if (screen.name) parameters.unshift('device')

      return parameters
    }
  }
}
</script>