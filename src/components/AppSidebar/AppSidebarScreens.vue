<template>
  <nav :data-name="$NAME">
    <AppStack
      tag="ul"
      direction="col"
      class="app-select-none"
    >
      <AppSidebarPlug
        v-if="!storeActivePreset.screens.length"
        class="app-absolute app-w-full app-top-1/2 app-left-1/2
          app-transform app--translate-x-1/2 app--translate-y-1/2"
        @button-click="storeAddActivePresetScreen"
      />
      <template v-else>
        <AppSidebarScreen
          v-for="(screen, key) in storeActivePreset.screens"
          :key="key"
          :screen="screen"
          @remove="storeRemoveActivePresetScreen"
          @click="$emit('change', screen)"
        />
        <li
          class="app-group app-relative app-cursor-pointer 
      app-mb-4 app-px-20 app-py-12
      last:app-mb-initial hover:app-color-bg-2"
          @click="storeAddActivePresetScreen"
        > 
          <AppStack
            align="center"
            class="app-relative app--left-2"
          >
            <AppIcon
              icon="plus"
              size="16"
              color="3"
              class="app-mr-8 app-relative app--top-2"
            />
            <AppText
              text="Add Screen"
              size="14"
              weight="semibold"
              color="3"
              class="app-mr-8"
            />
          </AppStack>
        </li>
      </template>
    </AppStack>
  </nav>
</template>

<script>
  import AppStack from '@ryaposov/essentials/AppStack.vue'
  import AppText from '@ryaposov/essentials/AppText.vue'
  import AppIcon from '@ryaposov/essentials/AppIcon.vue'
  
  import AppSidebarPlug from './AppSidebarPlug.vue'
  import AppSidebarScreen from './AppSidebarScreen.vue'

  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'AppSidebarScreens',
    components: {
      AppStack,
      AppText,
      AppIcon,
      AppSidebarPlug,
      AppSidebarScreen
    },
    computed: {
      ...mapGetters({
        storeActivePreset: 'activePreset'
      })
    },
    methods: {
      ...mapActions({
        storeRemoveActivePresetScreen: 'removeActivePresetScreen',
        storeAddActivePresetScreen: 'addActivePresetScreen'
      })
    }
  }
</script>