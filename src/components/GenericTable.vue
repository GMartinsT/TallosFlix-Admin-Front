<template>
  <div>
    <div class="search-bar">
      <select v-model="searchType">
        <option value="abc" disabled>Filtros:</option>
        <option
          v-for="column in columns.slice(0, -1)"
          :key="column.key"
          :value="column.key"
        >
          {{ column.title }}
        </option>
      </select>
      <div class="search-box">
        <input
          v-model="searchQuery"
          placeholder="Pesquisar"
          class="search-input"
          @change="search"
        />
        <span class="search-icon" @click="search">
          <i class="fas fa-search"></i>
        </span>
      </div>
    </div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            :class="column.class ?? ''"
          >
            {{ column.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data.data" :key="item">
          <td
            v-for="column in columns"
            :key="column.key"
            :class="column.class ?? ''"
          >
            <div class="actionColumn" v-if="column.key === 'actions'">
              <i
                v-for="(action, index) in actionColumn"
                :key="index"
                :class="[
                  action.icon,
                  index === 0 ? 'edit-icon' : 'delete-icon',
                ]"
                @click="action.click(item._id)"
                style="cursor: pointer; margin-right: 10px"
              ></i>
            </div>
            <div v-else>
              {{ item[column.key] }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="register-container" v-if="register">
      <button class="registerBtn" @click="registerNew">Registrar</button>
    </div>
    <div class="pagination-container">
      <nav class="pagnav" aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item">
            <a
              class="page-link"
              href="#"
              aria-label="Previous"
              @click="getList(currentPage - 1)"
              :disabled="currentPage === 1"
            >
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li v-for="page in displayedPages" :key="page" class="page-item">
            <a
              class="page-link"
              href="#"
              @click="getList(page)"
              :class="{ active: currentPage === page }"
            >
              {{ page }}
            </a>
          </li>
          <li class="page-item">
            <a
              class="page-link"
              href="#"
              aria-label="Next"
              @click="getList(currentPage + 1)"
              :disabled="currentPage === totalPages"
            >
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: "GenericTable",

  data() {
    return {
      data: {
        data: [],
        count: 0,
      },
      perPage: 10,
      currentPage: 1,
      searchQuery: "",
      searchType: "abc",
    };
  },

  props: {
    columns: Array,
    getData: Function,
    actionColumn: Array,
    reload: Number,
    getSearch: Function,
    getById: Function,
    register: Function,
  },

  watch: {
    reload() {
      this.getList(this.currentPage);
    },
  },

  created() {
    this.getList(1);
  },

  methods: {
    getList(page = 1) {
      this.currentPage = page;
      this.getData(page)
        .then((response) => {
          this.data = response.data;
        })
        .catch((error) => {
          console.error("Erro ao obter a lista de usuários:", error);
        });
    },
    search() {
      if (this.searchQuery === "") {
        this.searchType = "abc";
        this.getList(1);
      }
      if (this.searchType === "_id") {
        this.getById(this.searchQuery).then((response) => {
          this.data.data = response;
        });
      } else {
        this.getSearch(1, this.searchType, this.searchQuery)
          .then((response) => {
            this.data = response.data;
          })
          .catch((error) => {
            console.error("Erro ao obter a busca de usuários:", error);
          });
      }
    },
    registerNew() {
      this.register();
    },
  },

  computed: {
    totalPages() {
      return Math.ceil(this.data.count / this.perPage);
    },
    displayedPages() {
      const pages = [];
      const totalDisplayPages = 5;

      let startPage = this.currentPage - 2;
      if (startPage < 1) {
        startPage = 1;
      }

      let endPage = startPage + totalDisplayPages - 1;
      if (endPage > this.totalPages) {
        endPage = this.totalPages;
        startPage = endPage - totalDisplayPages + 1;
        if (startPage < 1) {
          startPage = 1;
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      return pages;
    },
  },
};
</script>

<style>
.pagination-container {
  display: flex;
  justify-content: center;
}

.register-container {
  position: absolute;
  left: 15px;
}

.registerBtn {
  margin-top: 2px !important;
}

.page-link.active {
  color: #fff;
  background-color: #898686;
}

.registerBtn {
  padding: 5px 20px;
  background-color: #525156 !important;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
  margin-block-start: 8px;
  font-weight: bold;
}

.registerBtn:hover {
  transform: scale(1.05);
  background-color: #464646 !important;
}
</style>
