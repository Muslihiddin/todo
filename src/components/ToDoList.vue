<script>
import { isTemplateNode } from "@vue/compiler-core";
import ToDoFooter from "./ToDoFooter.vue";
import ToDoItem from "./ToDoItem.vue";
export default {
  name: "ToDoList",
  data() {
    return {
      tasks: [],
      filteringTasks: [],
    };
  },
  components: {
    ToDoFooter,
    ToDoItem,
  },
  methods: {
    localDelete(id) {
      this.tasks = this.tasks.filter((task) => {
        return task.id !== id;
      });
      this.filteringTasks = this.filteringTasks.filter((task) => {
        return task.id !== id;
      });
    },
    fetchData() {
      return fetch("http://localhost:3000/todos")
        .then((res) => res.json())
        .then((data) => ((this.tasks = data), (this.filteringTasks = data)));
    },
    async tasksDone() {
      await this.fetchData();
      this.filteringTasks = await this.tasks.filter((el) => !el.isCompleted);
    },
    async completed() {
      await this.fetchData();
      this.filteringTasks = await this.tasks.filter((el) => el.isCompleted);
    },
    handleSyncingTwoArrays(idThatNeedsToBeChanged) {
      let objectId = this.tasks.find((el) => el.id === idThatNeedsToBeChanged);
      objectId.isCompleted = !objectId.isCompleted;
    },
  },
  computed: {
    listRender() {
      return this.filteringTasks;
    },
    taskCounter() {
      if (this.tasksCounter === 1) {
        return true;
      }
      return false;
    },
    tasksCounter() {
      return this.tasks.filter((el) => !el.isCompleted).length;
    },
  },
  mounted() {
    this.fetchData();
    // fetch("http://localhost:3000/todos")
    //   .then((res) => res.json())
    //   .then((data) => (this.tasks = data));
  },
};
</script>

<template>
  <div v-if="tasks.length > 0" class="list">
    <ul>
      <li v-for="item in listRender" :key="item.id">
        <to-do-item
          :item="item"
          @delete="localDelete"
          @handleSyncingTwoArrays="handleSyncingTwoArrays"
        />
      </li>
      <li class="footer-li">
        <span v-if="taskCounter">{{ tasksCounter }} item left</span>
        <span v-else>{{ tasksCounter }} items left</span>
        <to-do-footer
          @fetchData="fetchData"
          @tasksDone="tasksDone"
          @completed="completed"
        />
        <span class="clearCompleted" @click="clearCompleted"
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
.clearCompleted .disappear {
  opacity: 0;
  pointer-events: none;
}
.clearCompleted:hover {
  cursor: pointer;
  text-decoration: underline;
}

.footer-li {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
