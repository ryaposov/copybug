<template>
  <AppStack direction="col">
    <AppHeading
      size="24"
      weight="bold"
      text="Share Preset"
    />
    <AppStack
      class="app-mt-40"
      direction="col"
    >
      <AppStack
        align="center"
        justify="between"
        class="app-mb-20"
        @click="copyLink"
      >
        <AppHeading
          size="18"
          weight="semibold"
          text="Click below to copy the link:"
          color="3"
        />
        <transition
          enter-active-class="app-transition app-duration-300 app-ease-in-out"
          leave-active-class="app-transition app-duration-300 app-ease-in-out"
          enter-class="app-opacity-0"
          enter-to-class="app-opacity-100"
          leave-class="app-opacity-100"
          leave-to-class="app-opacity-0"
        >
          <AppText
            v-if="copied"
            size="18"
            color="brand"
            text="Copied!"
          />
        </transition>
      </AppStack>
      <AppStack
        align="center"
        class="app-relative app-group"
        @click="copyLink"
      >
        <AppText
          size="18"
          color="3"
          :text="link"
          class="app-p-20 app-border app-rounded-8 app-border-dashed app-color-border-2
          app-truncate app-cursor-pointer group-hover:app-color-border-brand group-hover:app-color-bg-2
          group-hover:app-color-text-3 app-pr-52
          app-transition app-duration-100 app-ease-in-out"
        >
          {{ link }}
        </AppText>
        <AppIcon
          size="20"
          icon="copy"
          color="4"
          class="app-cursor-pointer app-absolute app-top-1/2 app-right-20 app-transform app--translate-y-1/2
            group-hover:app-color-text-brand app-transition app-duration-100 app-ease-in-out"
        />
      </AppStack>
    </AppStack>
  </AppStack>
</template>

<script>
import AppStack from '@ryaposov/essentials/AppStack.vue'
import AppHeading from '@ryaposov/essentials/AppHeading.vue'
import AppText from '@ryaposov/essentials/AppText.vue'
import AppIcon from '@ryaposov/essentials/AppIcon.vue'

export default {
  name: 'AppCanvasBottomBarSharePreset',
  components: {
    AppStack,
    AppHeading,
    AppText,
    AppIcon
  },
  props: {
    preset: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['preset-select', 'preset-remove'],
  data: () => ({
    copied: false
  }),
  computed: {
    presetString () {
      return JSON.stringify(this.preset)
    },
    link () {
      const url = new URL(this.$DOMAIN)
      url.searchParams.append('preset', this.presetString)

      return url.href
    }
  },
  methods: {
    copyLink () {
      this.copied = true
      this.fallbackCopyTextToClipboard(this.link)
      setTimeout(() => this.copied = false, 2000)
    },
    fallbackCopyTextToClipboard (text) {
      var textArea = document.createElement('textarea')
      textArea.value = text
      
      // Avoid scrolling to bottom
      textArea.style.top = '0'
      textArea.style.left = '0'
      textArea.style.position = 'fixed'

      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()

      try {
        var successful = document.execCommand('copy')
        var msg = successful ? 'successful' : 'unsuccessful'
        console.log('Fallback: Copying text command was ' + msg)
      } catch (err) {
        console.error('Fallback: Oops, unable to copy', err)
      }

      document.body.removeChild(textArea)
    }
  }
}
</script>

<style>

</style>