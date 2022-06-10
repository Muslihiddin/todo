<script>
import ToDoList from "./ToDoList.vue";
export default {
  name: "ToDo",
  data() {
    return {
      name: "",
      componentKey: 0,
      allDone: true,
    };
  },
  components: {
    ToDoList,
  },
  methods: {
    addToDo() {
      if (this.name.length > 0) {
        let newToDo = {
          name: this.name,
          isCompleted: false,
        };

        fetch("http://localhost:3000/todos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newToDo),
        }).then(() => {
          this.name = "";
          this.componentKey++;
        });
      }
    },
  },
};
</script>

<template>
  <div>
    <h1>todos</h1>
    <div>
      <label class="expandIcon-label">
        <img v-if="allDone" src="../icons/expand.svg" class="expandIcon" />
        <img
          v-if="!allDone"
          src="../icons/expand_black.svg"
          class="expandIcon"
        />
        <input
          type="text"
          placeholder="What needs to be done?"
          class="to-do-input"
          v-model="name"
          @keypress.enter="addToDo"
        />
      </label>
    </div>
  </div>
  <to-do-list :key="componentKey" />
</template>

<style>
h1 {
  font-size: 100px;
  color: rgba(175, 47, 47, 0.15);
  text-align: center;
}
.expandIcon-label {
  position: relative;
}
.expandIcon {
  position: absolute;
  top: -12px;
  left: 10px;
  width: 40px;
  height: 40px;
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
</style>
