<template>
  <nav :data-name="$NAME">
    <AppStack
      tag="ul"
      class="app-select-none"
    >
      <li
        v-for="(tab, key) in tabs"
        :key="key"
        class="app-relative app-cursor-pointer app-mr-16 last:app-mr-initial"
        @click="$emit('change', key)"
      >
        <AppText
          :text="tab"
          size="14"
          leading="compact"
          v-bind="tabProps(key)"
          class="app-transition-colors app-duration-150 app-ease-in-out"
        />
        <span
          v-if="key === props.active"
          class="app-absolute app-left-0 app--bottom-2 
            app-h-2 app-w-full app-color-bg-brand"
        />
      </li>
    </AppStack>
  </nav>
</template>

<script>
  import AppStack from '@ryaposov/essentials/AppStack.vue'
  import AppText from '@ryaposov/essentials/AppText.vue'

  export default {
    name: 'AppSidebarTabs',
    components: {
      AppStack,
      AppText
    },
    props: {
      active: {
        type: String,
        default: 'screens',
        validator: val => ['screens', 'settings'].includes(val)
      }
    },
    emits: ['change'],
    setup (props, { emit }) {
      const tabProps = (tab) => ({
        true: {
          weight: 'bold',
          color: 1
        },
        false: {
          weight: 'semibold',
          color: 3,
          hoverColor: 2
        }
      }[props.active === tab])

      return {
        props,
        tabProps,
        tabs: {
          screens: 'Screens',
          settings: 'Preset Settings'
        }
      }
    }
  }
</script>