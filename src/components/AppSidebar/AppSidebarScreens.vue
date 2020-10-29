<template>
  <nav :data-name="$NAME">
    <AppStack
      tag="ul"
      direction="col"
      class="app-select-none"
    >
      <li
        v-for="(screen, key) in props.screens"
        :key="key"
        class="app-group app-relative app-cursor-pointer app-mb-4 app-px-20 app-py-12
          last:app-mb-initial hover:app-color-bg-2"
        @click="$emit('change', key)"
      >
        <AppStack direction="col">
          <AppStack>
            <AppText
              :text="screen.name"
              size="14"
              weight="semibold"
              class="app-mr-8"
            />
            <AppText
              :text="screen.size"
              size="14"
              weight="regular"
              color="3"
            />
          </AppStack>
          <AppStack align="center">
            <template
              v-for="(parameter, key) in screen.parameters"
              :key="key"
            >
              <AppText
                :text="parameter"
                size="14"
                weight="regular"
                color="2"
              />
              <span
                class="app-mx-4 app-h-2 app-w-4 app-color-bg-opposite
                  app-opacity-25 last:app-hidden"
              />
            </template>
          </AppStack>
        </AppStack>
        <AppStack
          class="app-opacity-0 app-absolute app-right-20 app-top-12
            group-hover:app-opacity-100"
        >
          <AppIcon
            icon="settings"
            size="16"
            color="3"
            hover-color="2"
            class="app-mr-12"
          />
          <AppIcon
            icon="target"
            size="16"
            color="3"
            hover-color="2"
          />
        </AppStack>
      </li>
    </AppStack>
  </nav>
</template>

<script>
  import AppStack from '@ryaposov/essentials/AppStack.vue'
  import AppText from '@ryaposov/essentials/AppText.vue'
  import AppIcon from '@ryaposov/essentials/AppIcon.vue'

  export default {
    name: 'AppSidebarScreens',
    components: {
      AppStack,
      AppText,
      AppIcon
    },
    props: {
      screens: {
        type: Array,
        default: () => ([])
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