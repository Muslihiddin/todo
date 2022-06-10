<script>
import TheCheckbox from "./theCheckbox.vue";
export default {
  name: "ToDoItem",
  props: {
    item: Object,
  },
  components: { TheCheckbox },
  data() {
    return {
      dataBaseURL: "http://localhost:3000/todos/" + this.item.id,
      editing: false,
      inputEdit: this.item.name,
    };
  },
  methods: {
    handleDelete() {
      fetch(this.dataBaseURL, { method: "DELETE" }).then(() =>
        this.$emit("delete", this.item.id).catch((err) => console.log(err))
      );
    },
    syncTwoArrays(id) {
      this.$emit("handleSyncingTwoArrays", id);
    },
    editTask() {
      this.editing = !this.editing;
      // this.$refs.input.focus();   --throwing error couldn't figure out why
    },
    editingDone() {
      fetch(this.dataBaseURL, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: this.inputEdit }),
      })
        .then(() => (this.editing = false))
        .catch((err) => console.log(err));
    },
  },
};
</script>
<template>
  <div class="listItem" v-if="!editing" @dblclick="editTask">
    <the-checkbox :item="item" @syncTwoArrays="syncTwoArrays" />

    <img src="../icons/close.svg" class="destroy" @click="handleDelete" />
  </div>
  <div class="inputHolder" v-if="editing" @dblclick="editTask">
    <input
      ref="input"
      type="text"
      class="editingInput"
      @keypress.enter="editingDone"
      v-model="item.name"
    />
  </div>
</template>
<style scoped>
.listItem {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 16px 16px 16px 0;
  border-bottom: 1px solid #ededed;
}
.listItem:hover .destroy {
  opacity: 0.6;
  transition: all ease 0.5s;
}

.listItem-body {
  display: flex;
  align-items: center;
}

.destroy {
  width: 22px;
  height: 22px;
  opacity: 0;
}
.listItem .destroy:hover {
  opacity: 1;
}

.inputHolder {
  padding-left: 45px;
}

.editingInput {
  font-size: 24px;
  line-height: 1.4em;
  color: #4d4d4d;
  width: calc(100% - 1px);
  min-height: 58px;
  padding: 12px 16px;
  outline: none;
  border: 1px solid #999;
  box-shadow: inset 0 -1px 5px 0 rgb(0 0 0 / 20%);
}
</style>
