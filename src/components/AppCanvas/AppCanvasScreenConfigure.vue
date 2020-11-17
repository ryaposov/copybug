<template>
  <AppStack
    direction="col"
    class="app-color-bg-1 app-p-20"
  >
    <AppStack
      v-for="(config, key) in configs"
      :key="key"
      direction="col"
      class="app-pb-12 app-mb-12 app-border-b app-color-border-1 last:app-mb-initial last:app-border-b-0"
    >
      <AppStack
        justify="between"
        class="app-cursor-pointer"
        @click="$emit('active-parameter-change', activeParameter === key ? false : key)"
      >
        <AppStack
          align="center"
        >
          <AppIcon
            :icon="activeParameter === key ? 'chevron-down' : 'chevron-right'"
            size="14"
            color="1"
            class="app--ml-2 app-mr-4 app-relative app--top-2"
          />
          <AppText
            size="14"
            weight="medium"
            color="1"
            leading="compact"
            :text="configs[key]"
          />
        </AppStack>
        <AppText
          size="14"
          weight="medium"
          color="1"
          :text="parameters[key]"
        />
      </AppStack>
      <AppStack
        v-if="activeParameter === key"
        tag="ul"
        direction="col"
        class="app-pt-12"
      >
        <AppStack
          v-for="(option, name) in options[key]"
          :key="name"
          tag="li"
          justify="between"
          class="app-cursor-pointer app-mb-12 app-group last:app-mb-initial"
          @click="onParameterClick(option, key)"
        >
          <AppText
            :text="option.name"
            size="14"
            weight="regular"
            class="app-color-text-2 group-hover:app-color-text-1"
          />
          <AppText
            :text="option.value"
            size="14"
            weight="regular"
            class="app-color-text-2 group-hover:app-color-text-1"
          />
        </AppStack>
      </AppStack>
    </AppStack>
  </AppStack>
</template>

<script>
import AppStack from '@ryaposov/essentials/AppStack.vue'
import AppText from '@ryaposov/essentials/AppText.vue'
import AppIcon from '@ryaposov/essentials/AppIcon.vue'

import { mapState } from 'vuex'

export default {
  name: 'AppCanvasScreenConfigure',
  components: {
    AppStack,
    AppText,
    AppIcon
  },
  props: {
    parameters: {
      type: Object,
      default: () => ({})
    },
    activeParameter: {
      type: String,
      default: 'size'
    }
  },
  emits: ['active-parameter-change', 'parameter-change'],
  data: () => ({
    configs: {
      size: 'Size', 
      platform: 'Platform',
      language: 'Language'
    }
  }),
  computed: {
    options () {
      return {
        size: this.devices,
        platform: this.platforms,
        language: this.languages
      }
    },
    ...mapState({
      devices: state => state.devices,
      platforms: state => state.platforms,
      languages: state => state.languages
    })
  },
  methods: {
    onParameterClick (option, key) {
      const payload = {}

      if (key === 'size') {
        const device = this.devices.find(size => size.value === option.value)
        payload.device = device.name
      }

      return this.$emit('parameter-change', { [key]: option.value, ...payload })
    }
  }
}
</script>

<style>

</style>