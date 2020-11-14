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
    },
    sizes: [
      {
        name: 'iPhone X',
        value: '375x812'
      },
      {
        name: 'iPhone 8 Plus',
        value: '414x736'
      },
      {
        name: 'iPhone 8',
        value: '375x667'
      },
      {
        name: 'iPhone 7 Plus',
        value: '414x736'
      },
      {
        name: 'iPhone 6s Plus',
        value: '375x667'
      },
      {
        name: 'iPhone 6 Plus',
        value: '375x667'
      },
      {
        name: 'iPhone 7',
        value: '375x667'
      },
      {
        name: 'iPhone 6s',
        value: '375x667'
      },
      {
        name: 'iPhone 6',
        value: '375x667'
      },
      {
        name: 'iPhone SE',
        value: '320x568'
      }
    ],
    platforms: [
      {
        value: 'gb',
        name: 'United Kingdom'
      },
      {
        value: 'nl',
        name: 'Netherlands'
      },
      {
        value: 'de',
        name: 'Germany'
      },
      {
        value: 'fr',
        name: 'France'
      },
      {
        value: 'at',
        name: 'Austia'
      },
      {
        value: 'sw',
        name: 'Sweden'
      },
      {
        value: 'es',
        name: 'Spain'
      },
      {
        value: 'it',
        name: 'Italy'
      },
      {
        value: 'ir',
        name: 'Ireland'
      },
      {
        value: 'pl',
        name: 'Poland'
      },
    ],
    languages: [
      {
        value: 'gb',
        name: 'English'
      },
      {
        value: 'nl',
        name: 'Dutch'
      },
      {
        value: 'de',
        name: 'German'
      },
      {
        value: 'fr',
        name: 'French'
      },
      {
        value: 'sw',
        name: 'Swedish'
      },
      {
        value: 'es',
        name: 'Spanish'
      },
      {
        value: 'it',
        name: 'Italian'
      },
      {
        value: 'pl',
        name: 'Polish'
      }
    ]
  }),
  computed: {
    options () {
      return {
        size: this.sizes,
        platform: this.platforms,
        language: this.languages
      }
    }
  },
  methods: {
    onParameterClick (option, key) {
      const payload = {}

      if (key === 'size') {
        const device = this.sizes.find(size => size.value === option.value)
        payload.device = device.name
      }

      return this.$emit('parameter-change', { [key]: option.value, ...payload })
    }
  }
}
</script>

<style>

</style>