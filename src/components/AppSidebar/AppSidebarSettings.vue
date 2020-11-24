AppSide<template>
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
        />
      </AppFormItem>
      <AppFormItem
        label="Language Regex"
        prop="settings.languageRegex"
        class="app-mb-20"
      >
        <AppInput
          name="settings.languageRegex"
          :value="storeActivePreset.settings.languageRegex"
          responsive
          @input="storeUpdateActivePresetSettings({ languageRegex: $event })"
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
      <!-- <AppFormItem
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
      </AppFormItem> -->
      <AppFormItem
        v-if="storeActivePreset.languages.length"
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
        label="Languages"
        prop="languages"
        class="app-mb-16"
      >
        <AppSidebarSettingsList
          :list="storeActivePreset.languages"
          @add="storeAddActivePresetLanguage"
          @remove="storeRemoveActivePresetLanguage($event)"
          @input="storeUpdateActivePresetLanguage($event)"
        />
      </AppFormItem>
      <AppFormItem
        label="Pages"
        prop="pages"
        class="app-mb-16"
      >
        <AppSidebarSettingsList
          :list="storeActivePreset.pages"
          @add="storeAddActivePresetPage"
          @remove="storeRemoveActivePresetPage($event)"
          @input="storeUpdateActivePresetPage($event)"
        />
      </AppFormItem>
    </AppForm>
  </nav>
</template>

<script>
  import AppForm from '@ryaposov/essentials/AppForm.vue'
  import AppFormItem from '@ryaposov/essentials/AppFormItem.vue'
  import AppInput from '@ryaposov/essentials/AppInput.vue'
  import AppCheckbox from '@ryaposov/essentials/AppCheckbox.vue'
  import AppSidebarSettingsList from './AppSidebarSettingsList.vue'

  import { mapState, mapGetters, mapActions } from 'vuex'

  export default {
    name: 'AppSidebarSettings',
    components: {
      AppForm,
      AppFormItem,
      AppInput,
      AppCheckbox,
      AppSidebarSettingsList
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
      // defaultPlatformOptions () {
      //   return this.storePlatforms.map(platform => ({
      //     text: platform.name,
      //     value: platform.value
      //   }))
      // },
      defaultLanguageOptions () {
        return this.storeActivePreset.languages.map(language => ({
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
        // storePlatforms: state => state.platforms,
        storeLanguages: state => state.languages,
        storeScales: state => state.scales
      }),
      ...mapGetters({
        storeActivePreset: 'activePreset'
      })
    },
    methods: {
      onSettingsMainUrlInput (value) {
        this.storeUpdateActivePresetSettings({ mainUrl: value })
      },
      onSettingsMainUrlFocusout (value) {
        
      },
      ...mapActions({
        storeUpdateActivePreset: 'updateActivePreset',
        storeUpdateActivePresetSettings: 'updateActivePresetSettings',
        storeUpdateActivePresetPage: 'updateActivePresetPage',
        storeAddActivePresetPage: 'addActivePresetPage',
        storeRemoveActivePresetPage: 'removeActivePresetPage',
        storeUpdateActivePresetLanguage: 'updateActivePresetLanguage',
        storeAddActivePresetLanguage: 'addActivePresetLanguage',
        storeRemoveActivePresetLanguage: 'removeActivePresetLanguage'
      })
    }
  }
</script>