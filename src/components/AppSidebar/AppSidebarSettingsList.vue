<template>
  <div
    :data-name="$NAME"
    class="component"
  >
    <div
      v-if="list.length"
      class="app-mb-8"
    >
      <AppStack
        v-for="(item, index) in list"
        :key="index"
        align="center"
        class="app-mb-4 last:app-mb-initial"
      >
        <AppStack
          align="center"
          justify="center"
          class="app-cursor-pointer app-w-16 app-h-16 app-color-bg-2 app-mr-4 app-rounded-4 app-flex-shrink-0
      app-transition-opacity app-duration-100 hover:app-opacity-75"
          @click="$emit('remove', index)"
        >
          <AppIcon
            size="10"
            color="3"
            icon="minus"
          />
        </AppStack>
        <AppText
          :data-text="item.name.replace(/\s/g, '&nbsp;')"
          size="14"
          color="1"
          weight="regular"
          display="block"
          class="component__input-wrap app-relative app-border app-overflow-hidden app-rounded-4 
            app-color-border-transparent app-px-4 app-flex-shrink-0 app-pb-1
            hover:app-color-border-1"
        >
          <input
            ref="itemNameInput"
            :value="item.name"
            type="text"
            spellcheck="false"
            class="app-outline-none app-appearance-none app-color-bg-transparent
              app-absolute app-top-0 app-left-0 app-w-full app-text-center app-leading-14"
            @input="$emit('input', { ...item, name: $event.target.value })"
          >
        </AppText>
        <AppText
          :data-text="item.value.replace(/\s/g, '&nbsp;')"
          size="14"
          color="3"
          weight="regular"
          display="block"
          class="component__input-wrap app-relative app-border app-overflow-hidden app-rounded-4 
            app-color-border-transparent app-px-4 app-pb-1
            hover:app-color-border-1"
        >
          <input
            ref="itemValueInput"
            :value="item.value"
            type="text"
            spellcheck="false"
            class="app-outline-none app-appearance-none app-color-bg-transparent
              app-absolute app-top-0 app-left-0 app-w-full app-text-center app-leading-14"
            @input="$emit('input', { ...item, value: $event.target.value })"
          >
        </AppText>
      </AppStack>
    </div>
    <AppStack
      class="app-cursor-pointer app-transition-opacity app-duration-100 hover:app-opacity-75"
      align="center"
      @click="$emit('add')"
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
        text="Add Item"
        weight="regular"
        class="app-mr-4"
      />
    </AppStack>
  </div>
</template>

<script>
import AppStack from '@ryaposov/essentials/AppStack.vue'
import AppIcon from '@ryaposov/essentials/AppIcon.vue'
import AppText from '@ryaposov/essentials/AppText.vue'

export default {
  name: 'AppSidebarSettingsList',
  components: {
    AppStack,
    AppIcon,
    AppText
  },
  props: {
    list: {
      type: Array,
      default: () => ([])
    }
  },
  emits: ['remove', 'add', 'input']
}
</script>

<style scoped>
  .component__input-wrap:after {
    content: attr(data-text);
    display: inline-block;
    color: transparent
  }
</style>