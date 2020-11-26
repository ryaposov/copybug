<template>
  <AppStack direction="col">
    <AppHeading
      size="24"
      weight="bold"
      text="Export Preset"
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
          text="Click below to copy the export data:"
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
          transparent
          class="app-w-full app-p-20 app-border app-rounded-8 app-border-dashed app-color-border-2 
            app-cursor-pointer group-hover:app-color-border-brand group-hover:app-color-bg-2
            group-hover:app-color-text-3 app-truncate app-pr-52
            app-transition app-duration-100 app-ease-in-out"
        >
          {{ presetString }}
        </AppText>
         <AppIcon
          size="20"
          icon="copy"
          color="4"
          class="app-cursor-pointer app-absolute app-top-1/2 app-right-20 app-transform app--translate-y-1/2
            group-hover:app-color-text-brand app-transition app-duration-100 app-ease-in-out"
        />
      </AppStack>
      <AppHeading
        size="18"
        weight="semibold"
        text="Insert exported data:"
        color="3"
        class="app-mt-32 app-mb-20"
      />
      </AppStack>
      <AppStack
        align="end"
        direction="col"
        class="app-relative app-group"
      >
        <AppInput
          :value="imported"
          size="18"
          color="3"
          tag="textarea"
          rows="10"
          placeholder="Paste import data here..."
          transparent
          class="app-w-full app-color-text-2"
          @input="imported = $event"
        />
        <AppButton
          size="16"
          weight="semibold"
          type="framed"
          bg="brand"
          color="opposite"
          rounded="3"
          text="Import Data"
          class="app-mt-20"
          @click="onImportPresetClick"
        />
    </AppStack>
  </AppStack>
</template>

<script>
import AppStack from '@ryaposov/essentials/AppStack.vue'
import AppHeading from '@ryaposov/essentials/AppHeading.vue'
import AppText from '@ryaposov/essentials/AppText.vue'
import AppInput from '@ryaposov/essentials/AppInput.vue'
import AppIcon from '@ryaposov/essentials/AppIcon.vue'
import AppButton from '@ryaposov/essentials/AppButton.vue'
import { mapActions, mapMutations } from 'vuex'

export default {
  name: 'AppCanvasBottomBarImportExportPreset',
  components: {
    AppStack,
    AppHeading,
    AppText,
    AppInput,
    AppIcon,
    AppButton
  },
  props: {
    preset: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['preset-select', 'preset-remove'],
  data: () => ({
    copied: false,
    imported: 'hey ya'
  }),
  computed: {
    presetString () {
      return JSON.stringify(this.preset)
    }
  },
  methods: {
    copyLink () {
      this.copied = true
      this.fallbackCopyTextToClipboard(this.presetString)
      setTimeout(() => this.copied = false, 2000)
    },
    async onImportPresetClick () {
      try {
        const newPreset = await this.storeAddPreset(JSON.parse(this.imported))
        this.storeSetActivePresetId(newPreset.id)
      } catch (error) {
        console.log('Could not import preset')
      }
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
    },
    ...mapActions({
      storeAddPreset: 'addPreset'
    }),
    ...mapMutations({
      storeSetActivePresetId: 'setActivePresetId'
    })
  }
}
</script>

<style>

</style>