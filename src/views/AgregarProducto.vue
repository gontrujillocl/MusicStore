<template>
  <div id="agregarproducto">
    <div class="container mt-5">
      <br />
      <br />
      <br />
      <form
        @submit.prevent="agregarProductoAlListado"
        class="table table-bordered py-3 px-3"
      >
        <div class="form-group">
          <label>Nombre del Disco:</label>

          <input
            class="form-control"
            type="text"
            v-model="form.nombreDisco"
            required
            placeholder="Nombre del Disco"
          />
        </div>

        <div class="form-group">
          <label>Imagen:</label>

          <input
            class="form-control"
            type="text"
            v-model="form.src"
            required
            placeholder="Url"
          />
        </div>
        <div class="form-group">
          <label>Descripción:</label>

          <input
            class="form-control"
            type="text"
            v-model="form.descripcionDisco"
            required
            placeholder="Descripción"
          />
        </div>
        <div class="form-group">
          <label>Precio:</label>

          <input
            class="form-control"
            type="number"
            v-model.number="form.precio"
            required
            placeholder="Precio"
          />
        </div>

        <div class="form-group">
          <label>Categoría:</label>

          <select class="custom-select" v-model="form.categoria" required>
            <option disabled selected value="">Elige una categoría</option>
            <option value="Rock">Rock</option>
            <option value="Pop">Pop</option>
            <option value="Metal">Metal</option>
          </select>
        </div>

        <div class="form-group">
          <label>Color:</label>

          <select class="custom-select" v-model="form.color" required>
            <option disabled selected value="">Color del disco</option>
            <option value="white">Sepia</option>
            <option value="red">Negro</option>
            <option value="blue">Blanco</option>
          </select>
        </div>

        <div class="form-group">
          <label>Descuento:</label>

          <select class="custom-select" v-model="form.acepta" required>
            <option disabled selected value="">Selecciona</option>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        </div>

        <div class="form-group" v-if="form.acepta">
          <label>De cuánto? (%):</label>

          <input
            class="form-control"
            type="number"
            min="0"
            max="100"
            step="1"
            v-model.number="form.descuento"
            v-if="form.acepta"
            required
            placeholder="Descuento"
          />
        </div>

        <button class="btn btn-danger" type="submit">Producto Listo</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "AgregarProductos",
  data: () => ({
    form: {
      nombreDisco: "",
      descripcionDisco: "",
      categoria: "",
      color: "",
      acepta: false,
      descuento: null,
      precio: null,
      src: "",
    },
  }),
  methods: {
    agregarProductoAlListado() {
      console.log("submit");
      console.log(this.form);
      this.$store.dispatch("agregarProductoAlListado", this.form);
      alert(`Disco ${this.form.nombreDisco} listo.`);
      this.form = "";
    },
  },
};
</script>
