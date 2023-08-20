<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card class="theaterCard">
            <template slot="header">
              <h4 class="card-title">Inserindo novo teatro</h4>
            </template>
            <div class="card-body">
              <form @submit.prevent="createTheater">
                <div class="form-group">
                  <label for="theaterId">ID do Teatro</label>
                  <input
                    v-model="theater.theaterId"
                    type="number"
                    class="form-control"
                    id="theaterId"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="street1">Endereço - Rua</label>
                  <input
                    v-model="theater.location.address.street1"
                    type="text"
                    class="form-control"
                    id="street1"
                    required
                  />
                </div>

                <div class="form-group">
                  <label for="city">Cidade</label>
                  <input
                    v-model="theater.location.address.city"
                    type="text"
                    class="form-control"
                    id="city"
                    required
                  />
                </div>

                <div class="form-group">
                  <label for="state">Estado</label>
                  <input
                    v-model="theater.location.address.state"
                    type="text"
                    class="form-control"
                    id="state"
                    required
                  />
                </div>

                <div class="form-group">
                  <label for="zipcode">CEP</label>
                  <input
                    v-model="theater.location.address.zipcode"
                    type="text"
                    class="form-control"
                    id="zipcode"
                    required
                  />
                </div>

                <div class="form-group">
                  <label for="latitude">Latitude</label>
                  <input
                    v-model.number="theater.location.geo.coordinates[1]"
                    type="number"
                    step="any"
                    class="form-control"
                    id="latitude"
                    required
                  />
                </div>

                <div class="form-group">
                  <label for="longitude">Longitude</label>
                  <input
                    v-model.number="theater.location.geo.coordinates[0]"
                    type="number"
                    step="any"
                    class="form-control"
                    id="longitude"
                    required
                  />
                </div>

                <button type="submit" class="sbmtBtn">Salvar Teatro</button>
              </form>
            </div>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "src/components/Cards/Card.vue";
import TheatersService from "src/services/TheatersService.js";

export default {
  components: {
    Card,
  },

  data() {
    return {
      theater: {
        theaterId: 0,
        location: {
          address: {
            street1: "",
            city: "",
            state: "",
            zipcode: "",
          },
          geo: {
            type: "Point",
            coordinates: [0, 0],
          },
        },
      },
    };
  },

  methods: {
    createTheater() {
      TheatersService.createTheater(this.theater)
        .then(() => {
          this.$notify({
            message: "Cinema criado com sucesso.",
            title: "Cinema registrado!",
            type: "success",
            timeout: 5000,
          });
          console.log("Teatro criado com sucesso.");
          this.$router.push({ name: "Theaters List" });
        })
        .catch((error) => {
          this.$notify({
            message: "Não foi possível registrar o cinema.",
            title: "Erro!",
            type: "danger",
            timeout: 5000,
          });
          console.error("Erro ao criar teatro:", error);
        });
    },
  },
};
</script>

<style>
.theaterCard {
  padding-bottom: 5px;
}
.card-body {
  padding: 20px;
}

.card-header {
  padding: 15px 15px 10px !important;
  border-bottom: 1px solid rgba(0, 0, 0, 0.125) !important;
}

.sbmtBtn {
  padding: 5px 20px;
  background-color: #525156;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
  margin-block-start: 8px;
  font-weight: bold;
}

.sbmtBtn:hover {
  transform: scale(1.05);
  background-color: #464646;
}
</style>
