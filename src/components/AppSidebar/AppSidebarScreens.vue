<template>
  <nav :data-name="$NAME">
    <AppStack
      tag="ul"
      direction="col"
      class="app-select-none"
    >
      <AppSidebarPlug
        v-if="!storeScreens.length"
        class="app-absolute app-w-full app-top-1/2 app-left-1/2
          app-transform app--translate-x-1/2 app--translate-y-1/2"
        @button-click="onScreenAdd"
      />
      <template v-else>
        <AppSidebarScreen
          v-for="(screen, key) in storeScreens"
          :key="key"
          :screen="screen"
          @remove="onScreenRemove"
          @click="$emit('change', screen)"
        />
      </template>
    </AppStack>
  </nav>
</template>

<script>
  import AppStack from '@ryaposov/essentials/AppStack.vue'
  
  import AppSidebarPlug from './AppSidebarPlug.vue'
  import AppSidebarScreen from './AppSidebarScreen.vue'

  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'AppSidebarScreens',
    components: {
      AppStack,
      AppSidebarPlug,
      AppSidebarScreen
    },
    computed: {
      ...mapState({
        storeScreens: state => state.screens
      })
    },
    methods: {
      onScreenRemove ({ id }) {
        this.storeRemoveScreen(id)
      },
      onScreenAdd ($event) {
        this.storeAddScreen()
      },
      ...mapActions({
        storeAddScreen: 'addScreen',
        storeRemoveScreen: 'removeScreen'
      })
    }
  }
</script>