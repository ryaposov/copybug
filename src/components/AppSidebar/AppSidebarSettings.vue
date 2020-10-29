<template>
  <nav :data-name="$NAME">
    <AppForm
      class="app-select-none"
    >
      <AppFormItem
        label="Main Url"
        prop="mainUrl"
        class="app-mb-20"
      >
        <AppInput
          name="mainUrl"
          :value="props.settings.mainUrl"
          @input="$emit('change', { mainUrl: $event })"
        />
      </AppFormItem>
      <AppFormItem
        label="Default Size"
        prop="defaultSize"
        class="app-mb-20"
      >
        <AppInput
          name="defaultSize"
          :value="props.settings.defaultSize"
          @input="$emit('change', { defaultSize: $event })"
        />
      </AppFormItem>
      <AppFormItem
        label="Default Platform"
        prop="defaultPlatform"
        class="app-mb-20"
      >
        <AppInput
          name="defaultPlatform"
          :value="props.settings.defaultPlatform"
          @input="$emit('change', { defaultPlatform: $event })"
        />
      </AppFormItem>
      <AppFormItem
        label="Default Language"
        prop="defaultLanguage"
        class="app-mb-20"
      >
        <AppInput
          name="defaultLanguage"
          :value="props.settings.defaultLanguage"
          @input="$emit('change', { defaultLanguage: $event })"
        />
      </AppFormItem>
      <AppFormItem
        prop="ignoreBrowserUi"
        class="app-mb-16"
      >
        <AppCheckbox
          name="ignoreBrowserUi"
          label="Ignore Browser UI"
          :checked="props.settings.ignoreBrowserUi"
          @change="$emit('change', { ignoreBrowserUi: $event })"
        />
      </AppFormItem>
      <AppFormItem
        prop="scrollPanesTogether"
        class="app-mb-16"
      >
        <AppCheckbox
          name="scrollPanesTogether"
          label="Scroll Panes Together"
          :checked="props.settings.scrollPanesTogether"
          @change="$emit('change', { scrollPanesTogether: $event })"
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

  export default {
    name: 'AppSidebarSettings',
    components: {
      AppForm,
      AppFormItem,
      AppInput,
      AppCheckbox
    },
    props: {
      settings: {
        type: Object,
        default: () => ({})
      }
    },
    emits: ['change'],
    setup (props, { emit }) {
      
      return {
        props
      }
    }
  }
</script>