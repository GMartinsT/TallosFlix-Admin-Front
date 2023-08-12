<template>
  <div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th v-for="column in columns" :key="column.key">
            {{ column.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data.data" :key="item">
          <td v-for="column in columns" :key="column.key">
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
    <div class="pagination-container">
      <nav aria-label="Page navigation example">
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
import { watch } from "vue";

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
    };
  },

  props: {
    columns: Array,
    getData: Function,
    actionColumn: Array,
    reload: Number,
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
          console.log("Usuários obtidos:", this.data, this.columns);
        })
        .catch((error) => {
          console.error("Erro ao obter a lista de usuários:", error);
        });
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

.page-link.active {
  color: #fff;
  background-color: #898686;
}
</style>
