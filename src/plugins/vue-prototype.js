import { mapGetters } from 'vuex'

export const appEndpoint = process.env.NODE_ENV === 'development' ? 'http://localhost:3030' : 'https://copybug.ryaposov.com'
export const serverEndpoint = process.env.NODE_ENV === 'development' ? 'http://localhost:3032' : 'https://glassframe.ryaposov.com'

export default {
  computed: {
    $APP_ICON_SPRITE_PATH () {
      return this.$DOMAIN + '/icons.svg'
    },
    $DOMAIN () {
      return appEndpoint
    },
    $PROXY_URL () {
      return serverEndpoint
    },
    $NAME () {
      return process.env.NODE_ENV === 'development' ? this.$options.name
        .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
        .map(x => x.toLowerCase())
        .join('-')
        .toUpperCase() : null;
    },
    ...mapGetters({
      $MD: 'isMdBreakpoint',
      $XS: 'isSmBreakpoint'
    }),
  },
  methods: {
    $RESPONSIVE_PROP (name) {
      if (Array.isArray(this[name])) {
        return this[name][this.$MD ? 1 : 0]
      } else {
        return this[name]
      }
    },
  }
}