<script>
import { mapGetters } from "vuex";
import ToDoList from "./ToDoList.vue";
export default {
  name: "ToDoInput",
  components: { ToDoList },
  data() {
    return {
      name: "",
      refreshComponent: 0,
    };
  },
  mounted() {
    this.$store.dispatch("getTasks");
  },
  computed: {
    ...mapGetters(["allTasks"]),
    completed() {
      let completed = this.allTasks.filter((task) => task.isCompleted == false);
      return completed;
    },
  },
  methods: {
    addToDo() {
      if (this.name.length > 0) {
        this.allTasks.push({
          name: this.name,
          isCompleted: false,
          id: Date.now(),
        });
        this.refreshComponent++;
        this.name = "";
      }
    },
    undone() {
      for (let i = 0; this.allTasks.length > i; i++) {
        this.allTasks[i].isCompleted = false;
      }
    },
    allDone() {
      for (let i = 0; this.allTasks.length > i; i++) {
        this.allTasks[i].isCompleted = true;
      }
    },
  },
  watch: {
    allTasks: {
      handler(newTasks) {
        localStorage.allTasks = JSON.stringify(newTasks);
      },
      deep: true,
    },
  },
};
</script>
<template>
  <div>
    <h1>todos</h1>
    <label class="allDoneLabel">
      <img
        v-if="completed.length === 0 && allTasks.length > 0"
        src="../icons/expand_black.svg"
        class="allDone"
        @click="undone"
      />
      <img v-else src="../icons/expand.svg" class="allDone" @click="allDone" />
      <input
        type="text"
        placeholder="What needs to be done?"
        class="to-do-input"
        v-model="name"
        @keypress.enter="addToDo"
      />
    </label>
  </div>
  <ToDoList
    v-if="this.allTasks.length > 0"
    :key="refreshComponent"
    :tasks="allTasks"
    :completed="completed.length"
  />
</template>

<style>
h1 {
  font-size: 100px;
  color: rgba(175, 47, 47, 0.15);
  text-align: center;
}
.to-do-input {
  min-width: 550px;
  min-height: 65px;
  border: none;
  outline: none;
  font-size: 24px;
  color: #4d4d4d;

  padding: 16px 16px 16px 60px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%), 0 25px 50px 0 rgb(0 0 0 / 10%);
}
.to-do-input::placeholder {
  font-style: italic;
  font-size: 24px;
  line-height: 1.4em;
  opacity: 0.3;
}
.allDoneLabel {
  position: relative;
}
.allDone {
  position: absolute;
  top: -24px;
  left: 4px;
  padding: 8px 2px 2px 2px;
}
</style>
