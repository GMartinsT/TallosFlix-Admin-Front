<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card class="movieCard">
            <template slot="header">
              <h4 class="card-title">Cinemas</h4>
              <p class="card-category">Lista dos cinemas cadastrados</p>
            </template>
          </card>
          <div>
            <GenericTable
              :getData="getTheaters"
              :columns="columns"
              :actionColumn="actionColumn"
              :reload="reloadCount"
              :getSearch="searchTheaters"
              :getById="searchById"
              :register="register"
            >
            </GenericTable>
          </div>
        </div>
      </div>
    </div>
    <card class="addressCard">
      <template slot="header">
        <h4 class="card-title">Informações do Endereço</h4>
        <p class="card-category">Endereço do Cinema Selecionado</p>
      </template>
      <div class="address-data">
        <p><strong>Rua:</strong> {{ selectedTheaterStreet }}</p>
        <p><strong>Cidade:</strong> {{ selectedTheaterCity }}</p>
        <p><strong>Estado:</strong> {{ selectedTheaterState }}</p>
        <p><strong>Código Postal:</strong> {{ selectedTheaterZipcode }}</p>
      </div>
      <div>
        <gmap-map
          id="map"
          :center="center"
          :zoom="13"
          :options="options"
          map-type-id="terrain"
        >
          <gmap-marker :position="center"></gmap-marker>
        </gmap-map>
      </div>
    </card>
  </div>
</template>

<script>
import Card from "src/components/Cards/Card.vue";
import GenericTable from "src/components/GenericTable.vue";
import TheatersService from "src/services/TheatersService.js";
import { API_KEY } from "./Maps/API_KEY";
import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";
Vue.use(VueGoogleMaps, {
  load: {
    key: API_KEY,
    libraries: "places",
  },
});

export default {
  components: {
    Card,
    GenericTable,
  },
  data() {
    return {
      theaters: [],
      columns: [
        { key: "_id", title: "ID" },
        { key: "theaterId", title: "ID do cinema" },
        { key: "location", title: "Endereço" },
        { key: "actions", title: "Ações", class: "actions" },
      ],
      actionColumn: [
        {
          icon: "fas fa-map",
          click: this.showInMap,
        },
        {
          icon: "fas fa-trash",
          click: this.deleteTheater,
        },
      ],
      reloadCount: 0,
      center: {
        lat: 40.748817,
        lng: -73.985428,
      },
      options: {
        styles: [
          {
            featureType: "water",
            stylers: [
              { saturation: 43 },
              { lightness: -11 },
              { hue: "#0088ff" },
            ],
          },
          {
            featureType: "road",
            elementType: "geometry.fill",
            stylers: [
              { hue: "#ff0000" },
              { saturation: -100 },
              { lightness: 99 },
            ],
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#808080" }, { lightness: 54 }],
          },
          {
            featureType: "landscape.man_made",
            elementType: "geometry.fill",
            stylers: [{ color: "#ece2d9" }],
          },
          {
            featureType: "poi.park",
            elementType: "geometry.fill",
            stylers: [{ color: "#ccdca1" }],
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{ color: "#767676" }],
          },
          {
            featureType: "road",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#ffffff" }],
          },
          { featureType: "poi", stylers: [{ visibility: "off" }] },
          {
            featureType: "landscape.natural",
            elementType: "geometry.fill",
            stylers: [{ visibility: "on" }, { color: "#b8cb93" }],
          },
          { featureType: "poi.park", stylers: [{ visibility: "on" }] },
          {
            featureType: "poi.sports_complex",
            stylers: [{ visibility: "on" }],
          },
          { featureType: "poi.medical", stylers: [{ visibility: "on" }] },
          {
            featureType: "poi.business",
            stylers: [{ visibility: "simplified" }],
          },
        ],
      },
      selectedTheaterStreet: "",
      selectedTheaterCity: "",
      selectedTheaterState: "",
      selectedTheaterZipcode: "",
    };
  },
  methods: {
    getTheaters(page) {
      return TheatersService.getAllTheaters(page);
    },

    editTheater(id) {
      this.$router.push({ name: "Theater", params: { id: id } });
    },

    async showInMap(id) {
      try {
        const theater = await TheatersService.getTheaterById(id);
        const location = theater.data.location;
        this.selectedTheaterStreet = location.address.street1;
        this.selectedTheaterCity = location.address.city;
        this.selectedTheaterState = location.address.state;
        this.selectedTheaterZipcode = location.address.zipcode;

        this.center = {
          lat: theater.data.location.geo.coordinates[1],
          lng: theater.data.location.geo.coordinates[0],
        };
        this.$notify({
          message: "Cinema foi localizado no mapa.",
          title: "Localização atualizada",
          type: "primary",
          timeout: 5000,
        });
      } catch (error) {
        this.$notify({
          message: "Não foi possível localizar o cinema.",
          title: "Cinema não encontrado!",
          type: "danger",
          timeout: 5000,
        });
        console.error("Erro ao buscar a localização do cinema:", error);
      }
    },

    deleteTheater(id) {
      TheatersService.deleteTheater(id)
        .then(() => {
          this.$notify({
            message: "Cinema foi excluido com sucesso.",
            title: "Cinema deletado!",
            type: "danger",
            timeout: 5000,
          });
          console.log("Cinema deletado com sucesso.");
          this.getTheater();
        })
        .catch((error) => {
          this.$notify({
            message: "Não foi possível excluír o cinema.",
            title: "Erro!",
            type: "warning",
            timeout: 5000,
          });
          console.error("Erro ao deletar cinema:", error);
        });
    },

    async searchTheaters(page, searchType, searchQuery) {
      try {
        const result = await TheatersService.searchTheaters(
          page,
          searchType,
          searchQuery
        );
        console.log(result.data);
        return result;
      } catch (error) {
        console.error("Erro ao buscar cinema:", error);
      }
    },

    async searchById(searchQuery) {
      const result = await TheatersService.searchTheaterById(searchQuery);
      const data = result.data.data;
      console.log(data);
      return data;
    },

    register() {
      this.$router.push({ name: CreaterTheaterForm });
    },
  },
};
</script>

<style>
#map {
  min-height: calc(100vh - 123px);
}

.addressCard {
  border-bottom: none;
  margin-bottom: none;
}

.address-data {
  display: flex;
  justify-content: center;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 4px;
  margin-bottom: 1rem;
}

.address-data p {
  padding: 5px 10px;
  margin: 1rem 2rem;
  font-weight: 400;
  color: #5e5e5e;
}

.card-body {
  border: 1px solid rgba(0, 0, 0, 0.125);
}

.card-body1 {
  border-bottom: none !important;
}
</style>
