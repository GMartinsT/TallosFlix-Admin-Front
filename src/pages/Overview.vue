<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-warning">
              <i class="nc-icon nc-single-02 text-warning"></i>
            </div>
            <div slot="content">
              <p class="card-category">Usuários</p>
              <h4 class="card-title">1234</h4>
            </div>
            <div slot="footer"><i class="fa fa-refresh"></i>Atualizar</div>
          </stats-card>
        </div>

        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-success">
              <i class="nc-icon nc-button-play text-success"></i>
            </div>
            <div slot="content">
              <p class="card-category">Filmes</p>
              <h4 class="card-title">1234</h4>
            </div>
            <div slot="footer"><i class="fa fa-refresh"></i>Atualizar</div>
          </stats-card>
        </div>

        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-danger">
              <i class="nc-icon nc-bank text-danger"></i>
            </div>
            <div slot="content">
              <p class="card-category">Cinemas</p>
              <h4 class="card-title">123</h4>
            </div>
            <div slot="footer"><i class="fa fa-refresh"></i>Atualizar</div>
          </stats-card>
        </div>

        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-info">
              <i class="nc-icon nc-chat-round text-primary"></i>
            </div>
            <div slot="content">
              <p class="card-category">Comentários</p>
              <h4 class="card-title">+1000</h4>
            </div>
            <div slot="footer"><i class="fa fa-refresh"></i>Updated now</div>
          </stats-card>
        </div>
        <div class="editCard">
          <card class="editPCard">
            <template slot="header">
              <h3>Meu Perfil:</h3>
            </template>
            <div>
              <div class="profileInput">
                <label for="name">Nome:</label>
                <input type="text" placeholder="Nome Exemplo" disabled />
              </div>
              <div class="profileInput">
                <label for="email">E-mail:</label>
                <input type="email" placeholder="email@exemple.com" disabled />
              </div>
              <div class="profileInput">
                <label for="password">Senha:</label>
                <input type="password" placeholder="******" />
              </div>
            </div>
            <div class="editBtn">
              <button class="editProfile">Editar</button>
            </div>
          </card>
        </div>
        <div class="moviecard">
          <card class="tableCard">
            <template slot="header">
              <h4 class="card-title">Lançamentos:</h4>
              <p class="card-category">Lista dos filmes mais recentes</p>
            </template>
          </card>
          <div class="table-responsive">
            <table class="movieTable">
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Data de Lançamento</th>
                  <th>Duração</th>
                  <th>Nota IMDb</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Movie 1</td>
                  <td>01/01/2023</td>
                  <td>120 min</td>
                  <td>8.5</td>
                </tr>
                <tr>
                  <td>Movie 2</td>
                  <td>15/02/2023</td>
                  <td>95 min</td>
                  <td>7.9</td>
                </tr>
                <tr>
                  <td>Movie 3</td>
                  <td>15/02/2023</td>
                  <td>105 min</td>
                  <td>8.9</td>
                </tr>
                <tr>
                  <td>Movie 4</td>
                  <td>15/02/2023</td>
                  <td>98 min</td>
                  <td>6.9</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Card from "src/components/Cards/Card.vue";
import StatsCard from "src/components/Cards/StatsCard.vue";
import LTable from "src/components/Table.vue";

export default {
  components: {
    Card,
    LTable,
    StatsCard,
  },
  data() {
    return {
      editTooltip: "Edit Task",
      deleteTooltip: "Remove",
      pieChart: {
        data: {
          labels: ["40%", "20%", "40%"],
          series: [40, 20, 40],
        },
      },
    };
  },
};
</script>
<style>
.profileInput {
  display: flex;
  flex-direction: column;
}

.editBtn {
  margin-top: 10px;
}

.editBtn button {
  background-color: #525156;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
}

.editBtn button:hover {
  background-color: #464646;
}

.moviecard {
  width: 72.1%;
}

.editCard {
  margin-left: 15px;
  margin-right: 30px;
}

.tableCard {
  margin-bottom: 0px;
}

table {
  border: 1px solid rgba(0, 0, 0, 0.125);
}

th {
  padding: 0 3.5rem;
  font-weight: 550;
  color: #505050;
}

td {
  padding: 0 3.5rem;
}

.editPCard {
  padding-bottom: 10px;
  margin-bottom: 0px;
}

.navbar-brand {
  margin-left: 40%;
}

.navbar-nav {
  padding-right: 1rem;
}
</style>
