<template>
  <div :data-name="$NAME">
    <AppStack
      v-for="(page, index) in storeActivePreset.pages"
      :key="index"
      align="center"
      class="app-mb-8 app-cursor-pointer app-group"
      @click="storeUpdateActivePreset({ ...storeActivePreset, activePageId: page.id })"
    >
      <AppStack
        align="center"
        justify="center"
        class="app-relative app--top-1 app-mr-8 app-rounded-full app-w-16 app-h-16 app-border app-transition-colors app-duration-100"
        :class="pageSelectedClasses(page.id)"
      >
        <span class="app-rounded-full app-w-4 app-h-4 app-color-bg-1" />
      </AppStack>
      <AppText
        size="14"
        color="1"
        weight="regular"
        :text="page.name"
        class="app-mr-4"
      />
      <AppText
        size="14"
        color="3"
        weight="regular"
        :text="page.path"
      />
    </AppStack>
  </div>
</template>

<script>
  import AppForm from '@ryaposov/essentials/AppForm.vue'
  import AppFormItem from '@ryaposov/essentials/AppFormItem.vue'
  import AppStack from '@ryaposov/essentials/AppStack.vue'
  import AppIcon from '@ryaposov/essentials/AppIcon.vue'
  import AppText from '@ryaposov/essentials/AppText.vue'

  import { mapState, mapGetters, mapActions } from 'vuex'

  export default {
    name: 'AppSidebarScreensPages',
    components: {
      AppForm,
      AppFormItem,
      AppStack,
      AppIcon,
      AppText
    },
    computed: {
      ...mapGetters({
        storeActivePreset: 'activePreset'
      })
    },
    methods: {
      pageSelectedClasses (id) {
        return [
          ...{
            true: ['app-color-border-transparent', 'app-color-bg-brand'],
            false: ['app-color-border-2', 'group-hover:app-color-border-4']
          }[id === this.storeActivePreset.activePageId]
        ]
      },
      ...mapActions({
        storeUpdateActivePreset: 'updateActivePreset'
      })
    }
  }
</script>