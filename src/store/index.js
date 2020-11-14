import { createStore } from 'vuex'
import { createApp } from 'vue'

const store = createStore({
  state () {
    return {
      activeSidebarTab: 'screens',
      sidebarVisibility: true,
      presetSettings: {
        mainUrl: 'http://localhost:3032',
        defaultSize: 'iPhone 8',
        defaultPlatform: 'nl',
        defaultLanguage: 'en-gb',
        ignoreBrowserUi: false,
        scrollPanesTogether: false
      },
      screens: []
    }
  },
  actions: {
    updateActiveSidebarTab ({ commit }, payload) {
      if (!['screens', 'settings'].includes(payload)) {
        throw Error('Store [updateActiveSidebarTab]: wrong payload')
      }

      commit('setActiveSidebarTab', payload)
    },
    updateSidebarVisibility ({ commit }, payload) {
      commit('setSidebarVisibility', payload)
    },
    updatePresetSettings ({ state, commit }, payload) {
      if (Object.keys(payload).every(key => Object.keys(state).includes('key'))) {
        throw Error('Store [updatePresetSettings]: wrong payload')
      }

      commit('setPresetSettings', payload)
    },
    addScreen ({ commit }, payload) {
      commit('createScreen', payload || {
        name: '',
        parameters: {
          size: '375x667',
          device: 'iPhone 8',
          platform: 'nl',
          language: 'en-gb'
        },
        id: '_' + Math.random().toString(36).substr(2, 9)
      })
    },
    removeScreen ({ state, commit }, id) {
      const index = state.screens.findIndex(screen => screen.id === id)
      commit('deleteScreen', index)
    },
    updateScreen ({ state, commit }, payload) {
      const index = state.screens.findIndex(screen => screen.id === payload.id)
      commit('patchScreen', { index, payload })
    }
  },
  mutations: {
    setActiveSidebarTab (state, payload) {
      state.activeSidebarTab = payload
    },
    setSidebarVisibility (state, payload) {
      state.sidebarVisibility = payload
    },
    setPresetSettings (state, payload) {
      state.presetSettings = { ...state.presetSettings, ...payload }
    },
    createScreen (state, payload) {
      state.screens.push({ ...payload })
    },
    deleteScreen (state, index) {
      state.screens.splice(index, 1)
    },
    patchScreen (state, { index, payload }) {
      state.screens.splice(index, 1, { ...payload })
    },
  }
})

export default store