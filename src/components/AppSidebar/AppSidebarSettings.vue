<template>
  <nav :data-name="$NAME">
    <AppForm class="app-select-none app-w-260">
      <AppFormItem
        label="Preset Name"
        prop="name"
        class="app-mb-20"
      >
        <AppInput
          name="name"
          :value="storeActivePreset.name"
          responsive
          @input="storeUpdateActivePreset({ name: $event })"
        />
      </AppFormItem>
      <AppFormItem
        label="Main Url"
        prop="settings.mainUrl"
        class="app-mb-20"
      >
        <AppInput
          name="settings.mainUrl"
          :value="storeActivePreset.settings.mainUrl"
          responsive
          @input="onSettingsMainUrlInput"
          @focusout="onSettingsMainUrlFocusout"
        />
      </AppFormItem>
      <AppFormItem
        label="Default Size"
        prop="settings.defaultSize"
        class="app-mb-20"
      >
        <AppInput
          name="settings.defaultSize"
          tag="select"
          :value="storeActivePreset.settings.defaultSize"
          :options="defaultSizeOptions"
          responsive
          @input="storeUpdateActivePresetSettings({ defaultSize: $event })"
        />
      </AppFormItem>
      <AppFormItem
        label="Default Platform"
        prop="settings.defaultPlatform"
        class="app-mb-20"
      >
        <AppInput
          name="settings.defaultPlatform"
          tag="select"
          :value="storeActivePreset.settings.defaultPlatform"
          :options="defaultPlatformOptions"
          responsive
          @input="storeUpdateActivePresetSettings({ defaultPlatform: $event })"
        />
      </AppFormItem>
      <AppFormItem
        label="Default Language"
        prop="settings.defaultLanguage"
        class="app-mb-20"
      >
        <AppInput
          name="settings.defaultLanguage"
          tag="select"
          :value="storeActivePreset.settings.defaultLanguage"
          :options="defaultLanguageOptions"
          responsive
          @input="storeUpdateActivePresetSettings({ defaultLanguage: $event })"
        />
      </AppFormItem>
      <AppFormItem
        prop="settings.ignoreBrowserUi"
        class="app-mb-16"
      >
        <AppCheckbox
          name="settings.ignoreBrowserUi"
          label="Ignore Browser UI"
          :checked="storeActivePreset.settings.ignoreBrowserUi"
          responsive
          @change="storeUpdateActivePresetSettings({ ignoreBrowserUi: $event })"
        />
      </AppFormItem>
      <AppFormItem
        label="Pages"
        prop="pages"
        class="app-mb-16"
      >
        <div class="app-mb-8">
          <AppStack
            v-for="(page, index) in storeActivePreset.pages"
            :key="index"
            align="center"
            class="app-mb-4 last:app-mb-initial"
          >
            <AppStack
              align="center"
              justify="center"
              class="app-cursor-pointer app-w-16 app-h-16 app-color-bg-2 app-mr-4 app-rounded-4
              app-transition-opacity app-duration-100 hover:app-opacity-75"
              @click="storeRemoveActivePresetPage(index)"
            >
              <AppIcon
                size="10"
                color="3"
                icon="minus"
              />
            </AppStack>
            <AppText
              size="14"
              color="1"
              weight="regular"
              class="app-relative app-border app-overflow-hidden app-rounded-4 app-color-border-transparent
              hover:app-color-border-1"
            >
              <input
                ref="pageNameInput"
                type="text"
                :value="page.name"
                class="app-outline-none app-px-4 app-pt-2 app-appearance-none app-color-bg-transparent"
                :style="fluidInputStyle(page.name, 'pageNameInput')"
                @input="storeUpdateActivePresetPage({ ...page, name: $event.target.value })"
              >
            </AppText>
            <AppText
              size="14"
              color="3"
              weight="regular"
              class="app-relative app-border app-overflow-hidden app-rounded-4 app-color-border-transparent
              hover:app-color-border-1"
            >
              <input
                ref="pagePathInput"
                type="text"
                :value="page.path"
                class="app-outline-none app-px-4 app-pt-2 app-appearance-none app-color-bg-transparent"
                :style="fluidInputStyle(page.path, 'pagePathInput')"
                @input="storeUpdateActivePresetPage({ ...page, path: $event.target.value })"
              >
            </AppText>
          </AppStack>
        </div>
        <AppStack
          class="app-cursor-pointer app-transition-opacity app-duration-100 hover:app-opacity-75"
          align="center"
          @click="storeAddActivePresetPage"
        >
          <AppStack
            align="center"
            justify="center"
            class="app-relative app--top-1 app-w-16 app-h-16 app-mr-8 app-border app-color-border-brand app-rounded-4"
          >
            <AppIcon
              size="10"
              color="brand"
              icon="plus"
            />
          </AppStack>
          <AppText
            size="14"
            color="brand"
            text="Add Page"
            weight="regular"
            class="app-mr-4"
          />
        </AppStack>
      </AppFormItem>
    </AppForm>
  </nav>
</template>

<script>
  import AppForm from '@ryaposov/essentials/AppForm.vue'
  import AppFormItem from '@ryaposov/essentials/AppFormItem.vue'
  import AppInput from '@ryaposov/essentials/AppInput.vue'
  import AppCheckbox from '@ryaposov/essentials/AppCheckbox.vue'
  import AppStack from '@ryaposov/essentials/AppStack.vue'
  import AppIcon from '@ryaposov/essentials/AppIcon.vue'
  import AppText from '@ryaposov/essentials/AppText.vue'

  import { mapState, mapGetters, mapActions } from 'vuex'

  export default {
    name: 'AppSidebarSettings',
    components: {
      AppForm,
      AppFormItem,
      AppInput,
      AppCheckbox,
      AppStack,
      AppIcon,
      AppText
    },
    computed: {
      defaultSizeOptions () {
        return [{
          text: 'Auto',
          value: ''
        }, ...this.storeDevices.map(device => ({
          text: device.name,
          value: device.value
        }))]
      },
      defaultPlatformOptions () {
        return this.storePlatforms.map(platform => ({
          text: platform.name,
          value: platform.value
        }))
      },
      defaultLanguageOptions () {
        return this.storeLanguages.map(language => ({
          text: language.name,
          value: language.value
        }))
      },
      defaultScaleOptions () {
        return this.storeScales.map(scale => ({
          text: scale.name,
          value: scale.value
        }))
      },
      ...mapState({
        storeDevices: state => state.devices,
        storePlatforms: state => state.platforms,
        storeLanguages: state => state.languages,
        storeScales: state => state.scales
      }),
      ...mapGetters({
        storeActivePreset: 'activePreset'
      })
    },
    methods: {
      onSettingsMainUrlInput (value) {
        const url = new URL(value)

        this.storeUpdateActivePresetSettings({ mainUrl: url.origin })
      },
      onSettingsMainUrlFocusout (value) {
        
      },
      fluidInputStyle (string, ref) {
        const numUpper = (string.match(/[A-Z]/g) || []).length
        const numLower = string.length - numUpper
        const width = (numUpper * 10.5) + (numLower * 8)

        // if (this.$refs[ref]) {
        //   console.log(this.$refs[ref].scrollLeft)
        // }

        return {
          width: (width + 8) + 'px'
        }
      },
      ...mapActions({
        storeUpdateActivePreset: 'updateActivePreset',
        storeUpdateActivePresetSettings: 'updateActivePresetSettings',
        storeUpdateActivePresetPage: 'updateActivePresetPage',
        storeAddActivePresetPage: 'addActivePresetPage',
        storeRemoveActivePresetPage: 'removeActivePresetPage'
      })
    }
  }
</script>