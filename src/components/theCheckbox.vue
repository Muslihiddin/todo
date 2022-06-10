<script>
export default {
  name: "theCheckbox",
  props: ["item"],
  data() {
    return {
      checked: this.item.isCompleted,
      dataBaseURL: "http://localhost:3000/todos/" + this.item.id,
    };
  },
  methods: {
    toggleComplete() {
      fetch(this.dataBaseURL, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isCompleted: !this.checked }),
      })
        .then(() => this.$emit("syncTwoArrays", this.item.id))
        .catch((err) => console.log(err));
    },
  },
};
</script>
<template>
  <label class="listItem-body" :class="{ crossed: checked }">
    <input type="checkbox" v-model="checked" @click="toggleComplete" />
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
