import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    buscar: '',
    carritoDeCompras: [],
    productos: [
      {
        nombreDisco: 'PATTI SMITH – HORSES VINILO (CLEAR VINYL)',
        descripcionDisco: 'Gran obra de esta genial banda.',
        precio: 49990,
        descuento: 30,
        acepta: true,
        categoria: 'Rock',
        color: 'Sepia',
        src: 'https://musicland.cl/wp-content/uploads/2021/09/MUSICLAND-PATTI-SMITH-HORSES-VINILO-CLEAR-VINYL-800x800.jpg'
      },
      {
        nombreDisco: 'MICHAEL JACKSON – AUCKLAND 1996 VINILO (2LP)',
        descripcionDisco: 'El Rey del pop vuelve con esta gran obra.',
        precio: 5990,
        descuento: 10,
        acepta: true,
        categoria: 'POP',
        color: 'Negro',
        src: 'https://musicland.cl/wp-content/uploads/2021/09/MUSICLAND-MICHAEL-JACKSON-AUCKLAND-1996-800x800.jpg'
      },
      {
        nombreDisco: 'KISS – THE MANY FACES OF KISS',
        descripcionDisco: 'Enciendete con esta gran banda de metal.',
        precio: 29990,
        descuento: 20,
        acepta: true,
        categoria: 'Metal',
        color: 'Fuego',
        src: 'https://musicland.cl/wp-content/uploads/2021/09/KISS-MUSICLAND-THE-MANY-FACES-OF-KISS-A-JOURNEY-THROUGH-THE-INNER-WORLD-OF-KISS-VINILO-2LP-800x800.jpg'
      },
      {
        nombreDisco: 'BEATLES – HELP! IN CONCERT VINILO',
        descripcionDisco: 'La legendaria banda vuelve.',
        precio: 69520,
        descuento: 10,
        acepta: true,
        categoria: 'Rock',
        color: 'Blue',
        src: 'https://musicland.cl/wp-content/uploads/2021/09/MUSICLAND-BEATLES-HELP-IN-CONCERT-800x800.jpeg'
      },
      {
        nombreDisco: 'RAMONES – ROCKET TO RUSSIA VINILO',
        descripcionDisco: 'Gran obra de esta genial banda.',
        precio: 35990,
        descuento: 10,
        acepta: true,
        categoria: 'Rock',
        color: 'Sepia',
        src: 'https://musicland.cl/wp-content/uploads/2021/08/MUSICLAND-RAMONES-ROCKET-TO-RUSSIA-800x800.jpg'
      },
      {
        nombreDisco: 'CLASH – TOKYO CALLING LIVE AT THE NAKANO',
        descripcionDisco: 'The Clash llegó para no irse jamás..',
        precio: 25500,
        descuento: 5,
        acepta: true,
        categoria: 'Rock',
        color: 'Red',
        src: 'https://musicland.cl/wp-content/uploads/2021/08/MUSICLAND-THE-CLASH-TOKYO-CALLING-800x800.jpg'
      },


    ]
  },
  getters: {
    buscarProducto(state) {
      if (state.buscar === '') {
        return state.productos
      } else {
        return state.productos.filter(
          (producto) =>
            producto.nombreDisco.toLowerCase().includes(state.buscar.toLowerCase()) ||
            producto.descripcionDisco
              .toLowerCase()
              .includes(state.buscar.toLowerCase()) ||
            producto.color.toLowerCase().includes(state.buscar.toLowerCase()) ||
            producto.categoria.toLowerCase().includes(state.buscar.toLowerCase())
        )
      }
    },

    enElCarro(state) {
      return state.carritoDeCompras.map((item) => {
        const producto = state.productos.find(
          (producto) => producto.nombreDisco === item.nombreDisco
        )
        return {
          nombreDisco: producto.nombreDisco,
          descripcionDisco: producto.descripcionDisco,
          precio: producto.precio,
          descuento: producto.descuento,
          acepta: producto.acepta,
          src: producto.src,
          cantidad: item.cantidad
        }
      })
    },

    montoTotalCarro(state) {
      return state.carritoDeCompras.reduce((acumula, item) => {
        acumula =
          acumula + item.precio * (1 - item.descuento / 100) * item.cantidad
        return acumula
      }, 0)
    },

    productoosEnCarro(state) {
      return state.carritoDeCompras.reduce((acumula, item) => {
        acumula = acumula + item.cantidad
        return acumula
      }, 0)
    },

  },
  mutations: {
    LA_BUSQUEDA(state, busqNueva) {
      state.buscar = busqNueva
    },

    AGREGAR_PRODUCTO_AL_LISTADO(state, pnuevo) {
      state.productos.push(pnuevo)
    },

    AGREGAR_PRODUCTO_AL_CARRO(state, producto) {
      state.carritoDeCompras.push({ ...producto, cantidad: 1 })
    },

    INCREMENTAR_CANTIDAD(state, productoOkEnCarriro) {
      productoOkEnCarriro.cantidad++
    },

    REDUCIR_CANTIDAD(state, index) {
      state.carritoDeCompras[index].cantidad--
    },

    ELIMINAR_PRODUCTO_CARRO(state, index) {
      state.carritoDeCompras.splice(index, 1)
    }
  },
  actions: {
    laBusqueda(context, busqNueva) {
      context.commit('LA_BUSQUEDA', busqNueva)
    },

    agregarProductoAlListado(context, pnuevo) {
      context.commit('AGREGAR_PRODUCTO_AL_LISTADO', { ...pnuevo })
    },

    agregarProductoAlCarro(context, producto) {
      const productoOkEnCarriro = context.state.carritoDeCompras.find(
        (productoOkEnCarriro) =>
          (producto.nombreDisco && producto.descripcionDisco) ===
          (productoOkEnCarriro.nombreDisco &&
            productoOkEnCarriro.descripcionDisco)
      )

      if (productoOkEnCarriro) {
        context.commit(
          'INCREMENTAR_CANTIDAD',
          productoOkEnCarriro
        )
      } else {
        context.commit('AGREGAR_PRODUCTO_AL_CARRO', producto)
      }
    },

    reducircantidad(context, index) {
      if (context.state.carritoDeCompras[index].cantidad > 1) {
        context.commit('REDUCIR_CANTIDAD', index)
      } else {
        context.commit('ELIMINAR_PRODUCTO_CARRO', index)
      }
    },
    eliminarProductoDelCarro(context, index) {
      const productoIndex = context.state.carritoDeCompras[index]
      context.commit('ELIMINAR_PRODUCTO_CARRO', productoIndex)
    }
  },
  modules: {}
})
