<template>
  <AppStack class="">
    <AppStack>
      <AppButton
        size="14"
        weight="semibold"
        type="framed"
        bg="brand"
        color="opposite"
        rounded="3"
        text="New Preset"
        icon="plus"
        class="app-mr-8"
        @click="onNewPresetClick"
      />
      <AppButton
        size="14"
        weight="semibold"
        type="framed"
        bg="25"
        color="1"
        rounded="3"
        href="#presets"
        text="Load Preset"
      />
      <AppModal
        ref="presetModal"
        anchor="presets"
      >
        <AppCanvasBottomBarPresets
          :presets="storePresets"
          class="app-w-520 app-pb-80 app-px-60"
          @preset-select="onPresetSelect"
          @preset-remove="onPresetRemove"
        />
      </AppModal>
    </AppStack>
    <AppStack class="app-ml-auto">
      <AppStack class="app-mr-32">
        <AppButton
          size="14"
          weight="semibold"
          type="framed"
          bg="25"
          color="1"
          rounded="3"
          text="Add Pane"
          icon="plus"
          class="app-mr-8"
          @click="storeAddActivePresetScreen"
        />
        <AppButton
          size="14"
          weight="semibold"
          type="framed"
          bg="opposite"
          color="opposite"
          rounded="3"
          text="Reload"
          icon="refresh"
          @click="onReloadClick"
        />
      </AppStack>
      <AppStack>
        <AppButton
          size="14"
          weight="semibold"
          type="framed"
          bg="1"
          :color="storeReplicateEvents ? 1 : 4"
          :border="storeReplicateEvents ? 3 : 1"
          rounded="3"
          icon="magic-wand"
          class="app-mr-8"
          @click="storeUpdateReplicateEvents(!storeReplicateEvents)"
        />
        <AppButton
          size="14"
          weight="semibold"
          type="framed"
          bg="1"
          :color="storeSidebarVisibility ? 1 : 4"
          :border="storeSidebarVisibility ? 3 : 1"
          rounded="3"
          icon="sidebar"
          class="app-mr-32"
          @click="storeUpdateSidebarVisibility(!storeSidebarVisibility)"
        />
        <AppInput
          tag="select"
          transparent
          class="app-min-w-92"
          :value="storeActivePreset.scale"
          :options="defaultScaleOptions"
          responsive
          @change="storeUpdateActivePreset({ scale: parseInt($event) })"
        />
      </AppStack>
    </AppStack>
  </AppStack>
</template>

<script>
import AppStack from '@ryaposov/essentials/AppStack.vue'
import AppButton from '@ryaposov/essentials/AppButton.vue'
import AppModal from '@ryaposov/essentials/AppModal.vue'
import AppInput from '@ryaposov/essentials/AppInput.vue'

import AppCanvasBottomBarPresets from './AppCanvasBottomBarPresets.vue'

import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'AppCanvasBottomBar',
  components: {
    AppStack,
    AppButton,
    AppModal,
    AppInput,
    AppCanvasBottomBarPresets
  },
  computed: {
    defaultScaleOptions () {
      return this.storeScales.map(scale => ({
        text: scale.name,
        value: scale.value
      }))
    },
    ...mapState({
      storeSidebarVisibility: state => state.sidebarVisibility,
      storeReplicateEvents: state => state.replicateEvents,
      storePresets: state => state.presets,
      storeScales: state => state.scales
    }),
    ...mapGetters({
      storeActivePreset: 'activePreset'
    }),
  },
  methods: {
    onNewPresetClick () {
      this.storeAddPreset()
        .then(preset => this.storeSetActivePresetId(preset.id))
    },
    onPresetSelect (id) {
      this.storeSetActivePresetId(id)
      this.$refs.presetModal.close()
    },
    onPresetRemove (id) {
      this.storeRemovePreset(id)
    },
    onReloadClick () {
      this.emitter.emit('iframes-reload')
    },
    ...mapActions({
      storeAddActivePresetScreen: 'addActivePresetScreen',
      storeAddPreset: 'addPreset',
      storeRemovePreset: 'removePreset',
      storeUpdateActivePreset: 'updateActivePreset',
      storeUpdateSidebarVisibility: 'updateSidebarVisibility',
      storeUpdateReplicateEvents: 'updateReplicateEvents'
    }),
    ...mapMutations({
      storeSetActivePresetId: 'setActivePresetId'
    })
  }
}
</script>