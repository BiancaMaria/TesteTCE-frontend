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

      <!-- <form @submit.prevent="salvar">
        <label>Descrição</label>
        <input type="text" placeholder="Descrição" v-model="tarefa.descricao" />
        <label>Data</label>
        <input type="date" placeholder="Data" v-model="tarefa.data" />
        <label>Usuário</label>
        <input type="text" placeholder="Usuario" v-model="tarefa.usuario" />

        <span>Completa</span>
        <div class="switch" style="margin-bottom:22px;">
          <label>
            Não
            <input type="checkbox" />
            <span class="lever"></span>
            Sim
          </label>
        </div>

        <button class="waves-effect waves-light btn-small">
          Salvar<i class="material-icons left">save</i>
        </button>
      </form> -->

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
            <td>{{tarefa.completada}}</td>
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
        completada:""
        
      },
      tarefas: [],
      errors: [],
      search: "",
      selected: null,

      // usuario:{
      //   id: "",
      //   nome: "",
      // },
      // usuarios: [],
    };
  },
  mounted() {
    this.listar();
    this.listarUsuarios();
    this.formataData();
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

    listar() {
      Tarefa.listar()
        .then((resposta) => {
          this.tarefas = resposta.data;
          console.log(resposta.data[0].data);
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

    formataData() {
      let data2 = document.querySelectorAll("td");
      console.log(data2);
    },
  },
};
</script>

<style></style>
