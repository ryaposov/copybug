<template>
  <nav :data-name="$NAME">
    <AppForm
      class="app-select-none app-w-260"
    >
      <AppFormItem
        label="Main Url"
        prop="mainUrl"
        class="app-mb-20"
      >
        <AppInput
          name="mainUrl"
          :value="storePresetSettings.mainUrl"
          responsive
          @input="onSettingsChange({ mainUrl: $event })"
        />
      </AppFormItem>
      <AppFormItem
        label="Default Size"
        prop="defaultSize"
        class="app-mb-20"
      >
        <AppInput
          name="defaultSize"
          tag="select"
          :value="storePresetSettings.defaultSize"
          :options="defaultSizeOptions"
          responsive
          @input="onSettingsChange({ defaultSize: $event })"
        />
      </AppFormItem>
      <AppFormItem
        label="Default Platform"
        prop="defaultPlatform"
        class="app-mb-20"
      >
        <AppInput
          name="defaultPlatform"
          tag="select"
          :value="storePresetSettings.defaultPlatform"
          :options="defaultSizeOptions"
          responsive
          @input="onSettingsChange({ defaultPlatform: $event })"
        />
      </AppFormItem>
      <AppFormItem
        label="Default Language"
        prop="defaultLanguage"
        class="app-mb-20"
      >
        <AppInput
          name="defaultLanguage"
          tag="select"
          :value="storePresetSettings.defaultLanguage"
          :options="defaultSizeOptions"
          responsive
          @input="onSettingsChange({ defaultLanguage: $event })"
        />
      </AppFormItem>
      <AppFormItem
        prop="ignoreBrowserUi"
        class="app-mb-16"
      >
        <AppCheckbox
          name="ignoreBrowserUi"
          label="Ignore Browser UI"
          :checked="storePresetSettings.ignoreBrowserUi"
          responsive
          @change="onSettingsChange({ ignoreBrowserUi: $event })"
        />
      </AppFormItem>
      <AppFormItem
        prop="scrollPanesTogether"
        class="app-mb-16"
      >
        <AppCheckbox
          name="scrollPanesTogether"
          label="Scroll Panes Together"
          :checked="storePresetSettings.scrollPanesTogether"
          responsive
          @change="onSettingsChange({ scrollPanesTogether: $event })"
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

  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'AppSidebarSettings',
    components: {
      AppForm,
      AppFormItem,
      AppInput,
      AppCheckbox
    },
    data: () => ({
      defaultSizeOptions: [
        {
          value: '',
          text: 'Select',
          selected: true,
          disabled: true
        },
        {
          value: 'iphone-8',
          text: 'iPhone 8',
          hidden: false,
          disabled: false
        },
        {
          value: 'iphone-8-plus',
          text: 'iPhone 8 Plus',
          hidden: false,
          disabled: false
        },
        {
          value: 'iphone-x',
          text: 'iPhone X',
          hidden: false,
          disabled: false
        },
        {
          value: 'iphone-x-plus',
          text: 'iPhone X Plus',
          hidden: false,
          disabled: false
        },
      ]
    }),
    computed: {
      ...mapState({
        storePresetSettings: state => state.presetSettings,
      })
    },
    methods: {
      onSettingsChange (settings) {
        this.storeUpdatePresetSettings(settings)
      },
      ...mapActions({
        storeUpdatePresetSettings: 'updatePresetSettings'
      })
    }
  }
</script>