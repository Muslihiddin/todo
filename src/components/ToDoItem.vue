<script>
import { mapGetters } from "vuex";
import TheCheckbox from "./TheCheckbox.vue";
export default {
  data() {
    return {
      editing: false,
    };
  },
  props: ["item"],
  components: {
    TheCheckbox,
  },
  computed: mapGetters(["allTasks"]),
  methods: {
    deleteItem() {
      let index = this.allTasks
        .map((x) => {
          return x.id;
        })
        .indexOf(this.item.id);

      this.allTasks.splice(index, 1);
    },
    editTask() {
      this.editing = true;
      // this.$refs.$el.input.focus(); //--throwing error couldn't figure out why
    },
    editingDone() {
      this.editing = false;
    },
  },
};
</script>
<template>
  <div class="listItem" v-if="!editing" @dblclick="editTask">
    <TheCheckbox :item="item" />

    <img src="../icons/close.svg" class="destroy" @click="deleteItem" />
  </div>
  <div class="inputHolder" v-if="editing">
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
