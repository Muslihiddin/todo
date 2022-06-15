<script>
import { mapGetters } from "vuex";
export default {
  props: ["item"],
  computed: mapGetters(["allTasks"]),
  methods: {
    toggleComplete() {
      this.item.isCompleted = !this.item.isCompleted;
    },
  },
};
</script>
<template>
  <label
    class="listItem-body"
    :class="{ crossed: this.item.isCompleted == true }"
  >
    <input type="checkbox" v-model="item.isCompleted" @click="toggleComplete" />
    {{ item.name }}
  </label>
</template>

<style scoped>
input[type="checkbox"] {
  appearance: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background-color: #fff;
  border: 1px solid rgba(175, 175, 175, 0.3);
  border-radius: 50%;
  margin-inline: 15px;
}
input[type="checkbox"]:after {
  content: "";
  display: none;
  width: 25px;
  height: 25px;
  background-size: 25px 25px;
  background-image: url(../icons/done.svg);
  background-repeat: no-repeat;
}
input[type="checkbox"]:checked {
  border: 1px solid rgba(175, 175, 175, 0.7);
}
input[type="checkbox"]:checked::after {
  display: block;
}
.crossed {
  color: #d9d9d9;
  text-decoration: line-through;
  transition: all ease 0.3s;
}
</style>
