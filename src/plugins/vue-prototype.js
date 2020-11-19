import { mapGetters } from 'vuex'

export default {
  computed: {
    $APP_ICON_SPRITE_PATH () {
      return this.$DOMAIN + '/icons.svg'
    },
    $DOMAIN () {
      return process.env.NODE_ENV === 'development' ? 'http://localhost:3030' : 'http://localhost:3030'
    },
    $PROXY_URL () {
      return process.env.NODE_ENV === 'development' ? 'http://localhost:3032' : 'http://localhost:3032'
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