<template>
  <AppStack
    align="stretch"
    justify="between"
    class="app-h-28 app-mb-8 app-rounded-4 app-pr-32
      app-color-border-1 app-border app-color-bg-1 app-relative"
  >
    <AppStack
      align="center"
      class="app-w-full"
    >
      <AppStack 
        align="center"
        class="app-mr-12 app-px-8 app-group app-cursor-pointer app-h-full
          hover:app-color-bg-2"
        :class="configure ? ['app-color-bg-2'] : []"
        @click="$emit('configure', $event)"
      >
        <AppIcon
          icon="settings"
          size="14"
          :color="false"
          :class="configure ? ['app-color-text-1'] : []"
          class="app-color-text-3 group-hover:app-color-text-1"
        />
      </AppStack>
      <div class="app-overflow-auto app-flex-1">
        <AppStack
          tag="ul"
          align="center"
        >
          <AppText
            weight="bold"
            leading="compact"
            size="12"
            :text="screen.name || screen.parameters.device"
            class="app-whitespace-no-wrap"
          />
          <span
            class="app-mx-8 app-h-2 app-w-2 app-color-bg-opposite
            app-opacity-25 last:app-hidden"
          />
          <template
            v-for="(parameter, key) in parameters(screen)"
            :key="key"
          >
            <AppText
              :text="parameter"
              size="12"
              weight="regular"
              class="app-cursor-pointer app-color-text-2 hover:app-color-text-1 app-whitespace-no-wrap"
              @click="$emit('parameter-select', key)"
            />
            <span
              class="app-mx-8 app-h-2 app-w-2 app-color-bg-opposite
              app-opacity-25 last:app-hidden"
            />
          </template>
        </AppStack>
      </div> 
    </AppStack>
    <AppStack
      align="center"
      class="app-min-w-32 app-absolute app--top-2 app-right-0 app-px-8 app-py-8 app-group app-cursor-pointer"
      @click="$emit('remove', $event)"
    >
      <AppIcon
        icon="remove"
        size="14"
        class="app-color-text-3 group-hover:app-color-text-1"
      />
    </AppStack>
  </AppStack> 
</template>

<script>
import AppStack from '@ryaposov/essentials/AppStack.vue'
import AppIcon from '@ryaposov/essentials/AppIcon.vue'
import AppText from '@ryaposov/essentials/AppText.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'AppCanvasScreenBar',
  components: {
    AppStack,
    AppIcon,
    AppText
  },
  props: {
    screen: {
      type: Object,
      default: () => ({})
    },
    configure: {
      type: Boolean,
      default: false
    }
  },
  emits: ['remove', 'configure', 'parameter-select'],
  computed: {
    ...mapGetters({
      storeActivePreset: 'activePreset'
    }),
  },
  methods: {
    parameters (screen) {
      const parameters = {
        size: screen.parameters.size,
        ...((screen.parameters.language || this.storeActivePreset.settings.defaultLanguage) ? {
          language: screen.parameters.language || this.storeActivePreset.settings.defaultLanguage
        } : {})
      }

      return parameters
    }
  }
}
</script>

<style>

</style>