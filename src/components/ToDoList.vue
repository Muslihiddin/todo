<script>
import ToDoItem from "./ToDoItem.vue";
import ToDoFooter from "./ToDoFooter.vue";
export default {
  data() {
    return {
      filteredTasks: [],
    };
  },
  components: {
    ToDoItem,
    ToDoFooter,
  },
  props: ["tasks", "completed"],
  computed: {
    notCompleted() {
      let unComplete = this.tasks.filter((task) => task.isCompleted == true);
      return unComplete;
    },
    computedFilteredTasks() {
      return this.filteredTasks;
    },
  },
  mounted() {
    this.filteredTasks = this.tasks;
  },
  methods: {
    clearCompleted() {
      for (let i = this.tasks.length - 1; i >= 0; i--) {
        if (this.tasks[i].isCompleted == true) {
          this.tasks.splice([i], 1);
        }
      }
    },
    showAllTasks() {
      this.filteredTasks = this.tasks;
    },
    showActiveTasks() {
      this.filteredTasks = this.tasks.filter((el) => !el.isCompleted);
    },
    showCompletedTasks() {
      this.filteredTasks = this.tasks.filter((el) => el.isCompleted);
    },
  },
};
</script>

<template>
  <div class="list">
    <ul>
      <li v-for="item in computedFilteredTasks" :key="item">
        <ToDoItem :item="item" />
      </li>
      <li class="footer-li">
        <span v-if="completed == 1"> {{ completed }} item left</span>
        <span v-else> {{ completed }} items left</span>
        <ToDoFooter
          @showAllTasks="showAllTasks"
          @showActiveTasks="showActiveTasks"
          @showCompletedTasks="showCompletedTasks"
        />
        <span
          class="clearCompleted"
          :class="{ disappear: notCompleted.length == 0 }"
          @click="clearCompleted"
          >Clear completed</span
        >
      </li>
    </ul>
  </div>
</template>

<style scoped>
.list {
  width: 100%;
  max-width: 550px;
  font-size: 24px;
  color: #4d4d4d;
}
ul {
  position: relative;
  list-style-type: none;
  background-color: #fff;
  border-top: 1px solid #e6e6e6;
  -webkit-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.1);
  -moz-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.1);
  box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.1);
  z-index: 1;
}
ul::before {
  content: "";
  width: 98%;
  height: 10px;
  position: absolute;
  bottom: -10px;
  left: 4px;
  right: 4px;
  background-color: rgba(255, 255, 255, 0.4);
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
ul::after {
  content: "";
  width: 99%;
  height: 4px;
  position: absolute;
  bottom: -5px;
  left: 2px;
  right: 2px;
  background-color: rgba(255, 255, 255, 0.75);
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
li:nth-last-child(1) {
  height: 35px;
  font-size: 14px;
  color: #777777;
  padding: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

.clearCompleted:hover {
  text-decoration: underline;
  cursor: pointer;
}

.clearCompleted.disappear {
  opacity: 0;
  pointer-events: none;
}
.footer-li {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-li span:nth-child(-n + 2) {
  width: 70px;
}
</style>
