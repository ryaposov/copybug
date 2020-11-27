import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

const generateId = (length = 3) => {
  return '_' + Math.random().toString(36).substr(2, length + 2)
}

const store = createStore({
  plugins: [createPersistedState({
    paths: ['presets', 'activePresetId', 'sidebarVisibility', 'replicateEvents', 'activeSidebarTab']
  })],
  state () {
    return {
      activeSidebarTab: 'screens',
      sidebarVisibility: true,
      replicateEvents: false,
      activePresetId: null,
      presets: {},
      devices: [
        {
          name: 'iPhone 12 Pro Max',
          value: '428x926'
        },
        {
          name: 'iPhone 12/12 Pro',
          value: '390x844'
        },
        {
          name: 'iPhone 12 Mini',
          value: '360x780'
        },
        {
          name: 'iPhone XS Max/XR/11/11 Pro Max',
          value: '414x896'
        },
        {
          name: 'iPhone X/XS/11 Pro/',
          value: '375x812'
        },
        {
          name: 'iPhone 6 Plus/6s Plus/7 Plus/8 Plus',
          value: '414x736'
        },
        {
          name: 'iPhone 6/6s/7/8/SE-2G',
          value: '375x667'
        },
        {
          name: 'iPhone 5/5s/5c/SE-1G',
          value: '320x568'
        },
        {
          name: 'iPhone 4/4s',
          value: '320x480'
        }
      ],
      platforms: [
        {
          value: 'gb',
          name: 'United Kingdom'
        },
        {
          value: 'nl',
          name: 'Netherlands'
        },
        {
          value: 'de',
          name: 'Germany'
        },
        {
          value: 'fr',
          name: 'France'
        },
        {
          value: 'at',
          name: 'Austia'
        },
        {
          value: 'sw',
          name: 'Sweden'
        },
        {
          value: 'es',
          name: 'Spain'
        },
        {
          value: 'it',
          name: 'Italy'
        },
        {
          value: 'ir',
          name: 'Ireland'
        },
        {
          value: 'pl',
          name: 'Poland'
        },
      ],
      languages: [
        {
          value: 'gb',
          name: 'English'
        },
        {
          value: 'nl',
          name: 'Dutch'
        },
        {
          value: 'de',
          name: 'German'
        },
        {
          value: 'fr',
          name: 'French'
        },
        {
          value: 'sw',
          name: 'Swedish'
        },
        {
          value: 'es',
          name: 'Spanish'
        },
        {
          value: 'it',
          name: 'Italian'
        },
        {
          value: 'pl',
          name: 'Polish'
        }
      ],
      scales: [...Array(20).fill(0)].map((value, key) => ({
        name: `${((key + 1) * 5) + 45}%`,
        value: ((key + 1) * 5) + 45,
      }))
    }
  },
  getters: {
    activePreset (state) {
      return state.presets[state.activePresetId]
    },
    activePresetCleanMainUrl (state) {
      return state.presets[state.activePresetId].settings.mainUrl.replace('[', '').replace(']', '')
    },
    activePage (state, getters) {
      return getters.activePreset.pages.find(page => page.id === getters.activePreset.activePageId)
    },
    isMdBreakpoint () {
      return true
    },
    isSmBreakpoint () {
      return false
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
    updateReplicateEvents ({ commit }, payload) {
      commit('setReplicateEvents', payload)
    },
    addPreset ({ commit, state }, payload) {
      if (payload && payload.id) delete payload.id
      
      const id = generateId()
      const preset = {
        id: id,
        ...(payload || {
          name: 'Custom Preset ' + id,
          createdAt: new Date().getTime() / 1000,
          activePageId: null,
          settings: {
            mainUrl: 'https://www.apple.com/',
            defaultSize: null,
            // defaultPlatform: 'gb', 
            defaultLanguage: null,
            ignoreBrowserUi: false,
            languageRegex: ''
          },
          scale: 100,
          screens: [],
          pages: [],
          languages: []
        })
      }

      commit('createPreset', preset)
      if (Object.keys(state.presets).length === 1) commit('setActivePresetId', preset.id)

      return preset
    },
    removePreset ({ state, commit, getters }, id) {
      // No such page anymore
      if (Object.keys(state.presets).length === 1) return
      
      commit('deletePreset', id)
      if (state.activePresetId === id) commit('setActivePresetId', [...Object.values(state.presets)].pop().id)
    },
    updateActivePreset ({ state, commit, getters }, preset) {
      commit('patchPreset', { key: state.activePresetId, payload: { ...getters.activePreset, ...preset } })
    },
    updateActivePresetSettings ({ state, commit, getters }, settings) {
      const activePresetScreens = JSON.parse(JSON.stringify(getters.activePreset.settings))
      commit('patchPreset', { key: state.activePresetId, payload: { settings: { ...activePresetScreens, ...settings} } })
    },
    addActivePresetScreen ({ state, commit, getters: { activePreset }}, screen) {
      const activePresetScreens = JSON.parse(JSON.stringify(activePreset.screens))
      const lastDevice = [...state.devices].pop()
      const newScreen = {
        name: '',
        parameters: {
          size: lastDevice.value,
          device: lastDevice.name,
          platform: activePreset.settings.defaultPlatform,
          language: activePreset.settings.defaultLanguage || null
        },
        id: generateId(7)
      }

      if (activePresetScreens.length) {
        const lastPresetScreen = [...activePresetScreens].pop()
        let nextPresetDeviceIndex = state.devices.findIndex(device => device.value === lastPresetScreen.parameters.size) - 1
        nextPresetDeviceIndex = nextPresetDeviceIndex < 0 ? 0 : nextPresetDeviceIndex
        newScreen.parameters.device = state.devices[nextPresetDeviceIndex].name
        newScreen.parameters.size = state.devices[nextPresetDeviceIndex].value
      }

      if (activePreset.settings.defaultSize) {
        let defaultDevice = state.devices.find(device => device.value === activePreset.settings.defaultSize)
        newScreen.parameters.device = defaultDevice.name
        newScreen.parameters.size = defaultDevice.value
      }

      commit('patchPreset', { key: state.activePresetId, payload: { screens: [...activePresetScreens, newScreen] } })
    },
    removeActivePresetScreen ({ state, commit, getters }, id) {
      const activePresetScreens = JSON.parse(JSON.stringify(getters.activePreset.screens))
      const screenIndex = activePresetScreens.findIndex(screen => screen.id === id)
      activePresetScreens.splice(screenIndex, 1)

      commit('patchPreset', { key: state.activePresetId, payload: { screens: activePresetScreens } })
    },
    updateActivePresetScreen ({ state, commit, getters }, screen) {
      const activePresetScreens = JSON.parse(JSON.stringify(getters.activePreset.screens))
      const screenIndex = activePresetScreens.findIndex(item => item.id === screen.id)
      activePresetScreens.splice(screenIndex, 1, screen)

      commit('patchPreset', { key: state.activePresetId, payload: { screens: activePresetScreens } })
    },
    addActivePresetLanguage ({ state, dispatch, commit, getters: { activePreset }}, language) {
      const activePresetLanguages = JSON.parse(JSON.stringify(activePreset.languages || []))
      const newLanguage = { id: generateId(3), name: 'English', value: 'uk' }
      const newLanguages = [...activePresetLanguages, newLanguage]

      if (!activePreset.settings.defaultLanguage) {
        dispatch('updateActivePresetSettings', { defaultLanguage: 'uk' })
      }

      commit('patchPreset', { key: state.activePresetId, payload: { languages: newLanguages } })
    },
    removeActivePresetLanguage ({ state, dispatch, commit, getters }, id) {
      const activePresetLanguages = JSON.parse(JSON.stringify(getters.activePreset.languages))
      const languageIndex = activePresetLanguages.findIndex(item => item.id === id)
      activePresetLanguages.splice(languageIndex, 1)

      if (!activePresetLanguages.length) {
        dispatch('updateActivePresetSettings', { defaultLanguage: null })
      }

      commit('patchPreset', { key: state.activePresetId, payload: { languages: activePresetLanguages } })
    },
    updateActivePresetLanguage ({ state, commit, getters }, language) {
      const activePresetLanguages = JSON.parse(JSON.stringify(getters.activePreset.languages))
      const languageIndex = activePresetLanguages.findIndex(item => item.id === language.id)
      activePresetLanguages.splice(languageIndex, 1, language)

      commit('patchPreset', { key: state.activePresetId, payload: { languages: activePresetLanguages } })
    },
    addActivePresetPage ({ state, commit, getters: { activePreset }}, page) {
      const activePresetPages = JSON.parse(JSON.stringify(activePreset.pages || []))
      const newPage = { id: generateId(3), name: 'New Page ' + (activePresetPages.length + 1), value: '/page-' + (activePresetPages.length + 1) }
      const newPages = [...activePresetPages, newPage]
      commit('patchPreset', { key: state.activePresetId, payload: {
        pages: newPages,
        ...(newPages.length === 1 ? { activePageId: newPages[0].id } : {})
      } })
    },
    removeActivePresetPage ({ state, commit, getters }, id) {
      const activePresetPages = JSON.parse(JSON.stringify(getters.activePreset.pages))
      const pageIndex = activePresetPages.findIndex(item => item.id === id)
      activePresetPages.splice(pageIndex, 1)
      
      let activePageId = getters.activePreset.activePageId

      // No such page anymore
      if (activePresetPages.length === 0) {
        activePageId = null
      } else if (!activePresetPages.find(page => page.id === activePresetPages)) {
        activePageId = [...activePresetPages].pop().id
      }
    
      commit('patchPreset', { key: state.activePresetId, payload: {
        pages: activePresetPages,
        activePageId
      } })
    },
    updateActivePresetPage ({ state, commit, getters }, page) {
      const activePresetPages = JSON.parse(JSON.stringify(getters.activePreset.pages))
      const pageIndex = activePresetPages.findIndex(item => item.id === page.id)
      activePresetPages.splice(pageIndex, 1, page)

      commit('patchPreset', { key: state.activePresetId, payload: { pages: activePresetPages } })
    }
  },
  mutations: {
    setActivePresetId (state, id) {
      state.activePresetId = id
    },
    setActiveSidebarTab (state, payload) {
      state.activeSidebarTab = payload
    },
    setSidebarVisibility (state, payload) {
      state.sidebarVisibility = payload
    },
    setReplicateEvents (state, payload) {
      state.replicateEvents = payload
    },
    createPreset (state, payload) {
      state.presets[payload.id] = { ...payload }
    },
    deletePreset (state, key) {
      delete state.presets[key]
    },
    patchPreset (state, { key, payload }) {
      state.presets[key] = { ...state.presets[key], ...payload }
    },
  }
})

export default {
  async init () {
    // On startup, if there're not other preset
    // create new draft preset and set active preset ID
    if (!Object.keys(store.state.presets).length) {
      await store.dispatch('addPreset')
    }

    return
  }, 
  vuex: store
}