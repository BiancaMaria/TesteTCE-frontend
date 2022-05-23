<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Lista de Tarefas</a>
      </div>
    </nav>

    <div class="container">
      <ul>
        <li v-for="(erro, index) of errors" :key="index">
          campo <b>{{ erro.field }}</b> - {{ erro.defaultMessage }}
        </li>
      </ul>

      <form>
        <input
          type="text"
          placeholder="Descrição ou Usuário"
          v-on:keyup.enter="listarTarefasPorDescricao(descricao)"
          
        />
        <!-- <div class="input-field">
          <select v-model="tarefa.completada">
            <option disabled value="">Selecione</option>
            <option value="Finalizado">Finalizado</option>
            <option value="Pendente">Pendente</option>
          <select/>
          <label>Status</label>
        </div> -->

        <!-- <button
          @click="listarTarefasPorDescricao(descricao)"
          class="waves-effect btn-small blue darken-1"
        >
          <i class="material-icons">search</i>
        </button> -->
        <button
          @click="clearFilter()"
          class="waves-effect btn-small red darken-1"
        >
          <i class="material-icons">delete_sweep</i>
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th>DESCRIÇÃO</th>
            <th>DATA</th>
            <th>USUÁRIO</th>
            <th>STATUS</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="tarefa of tarefas" :key="tarefa.id">
            <td>{{ tarefa.descricao }}</td>
            <td>{{ tarefa.data }}</td>
            <td>{{ tarefa.usuario.nome }}</td>
            <td>{{ tarefa.completada }}</td>
            <td>
              <button
                @click="editar(tarefa)"
                class="waves-effect btn-small blue darken-1"
              >
                <i class="material-icons">create</i>
              </button>
              <button
                @click="remover(tarefa.id)"
                class="waves-effect btn-small red darken-1"
              >
                <i class="material-icons">delete_sweep</i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Tarefa from "./services/tarefas";
import Usuario from "./services/usuarios";

export default {
  name: "app",
  data() {
    return {
      tarefa: {
        id: "",
        descricao: "",
        data: "",
        usuario: "",
        completada: [
          { value: null, text: "Selecione um status" },
          { value: true, text: "Finalizado" },
          { value: false, text: "Pendente" },
        ],
      },
      search:"",
      tarefas: [],
      errors: [],
      // usuario:{
      //   id: "",
      //   nome: "",
      // },
      // usuarios: [],
    };
  },
  mounted() {
    this.listarTarefas();
    this.listarUsuarios();
    
  },
  methods: {
    listarUsuarios() {
      Usuario.listar()
        .then((resposta) => {
          this.usuarios = resposta.data.usuarios;
          console.log("oioioi user");
        })
        .catch((e) => {
          console.log(e);
          console.log("deu errado");
        });
    },

    listarTarefas() {
      Tarefa.listar()
        .then((resposta) => {
          this.tarefas = resposta.data;
          console.log(resposta.data);
        })
        .catch((e) => {
          console.log(e);
          console.log("deu errado");
        });
    },

     listarTarefasPorDescricao(descricao) {
      Tarefa.listarTarefasPorDescricao(descricao)
        .then((resposta) => {
          this.tarefas = resposta.data;
          console.log("descricao");
        })
        .catch((e) => {
          console.log(e);
          console.log("deu errado");
        });
    },

    salvar() {
      if (!this.tarefa.id) {
        Tarefa.salvar(this.tarefa)
          .then((resposta) => {
            this.resposta = resposta;
            this.tarefa = {};
            alert("Cadastrado com sucesso!");
            this.listar();
            this.errors = {};
          })
          .catch((e) => {
            this.errors = e.response.data.errors;
          });
      } else {
        Tarefa.atualizar(this.tarefa)
          .then((resposta) => {
            this.resposta = resposta;
            this.tarefa = {};
            this.errors = {};
            alert("Atualizado com sucesso!");
            this.listar();
          })
          .catch((e) => {
            this.errors = e.response.data.errors;
          });
      }
    },
    editar(tarefa) {
      this.tarefa = tarefa;
    },
    remover(id) {
      console.log("removido");
      if (confirm("Deseja excluir a tarefa?")) {
        Tarefa.apagar(id)
          .then((resposta) => {
            this.resposta = resposta.data;
            this.listar();
            this.errors = {};
          })
          .catch((e) => {
            this.errors = e.response.data.errors;
          });
      }
    },

    clearFilter() {
      this.search = "";
      this.selected = null;
    },

      filteredItems() {
      let items = [];
      items = this.items.filter((item) => {
        return (
          item.descricao.toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
          item.usuario.toLowerCase().indexOf(this.search.toLowerCase()) > -1
        );
      });

      // items = items.filter((item) => {
      //   if (this.selected == null) return item;
      //   return item.isActive === this.selected;
      // });

      console.log('feegeg');
      return items;
    }
  },
};
</script>

<style></style>
