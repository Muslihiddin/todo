<script>
export default {
  name: "ToDoFooter",
  data() {
    return {
      sorting: [
        { link: "all", title: "All", isSelected: true },
        { link: "active", title: "Active", isSelected: false },
        { link: "completed", title: "Completed", isSelected: false },
      ],
    };
  },
  methods: {
    toSelect(index, item) {
      if (item.link === "all") {
        this.$emit("fetchData");
      } else if (item.link === "active") {
        this.$emit("tasksDone");
      } else if (item.link === "completed") {
        this.$emit("completed");
      }
      for (let i = 0; i < this.sorting.length; i++) {
        if (i == index) {
          this.sorting[i].isSelected = true;
        } else {
          this.sorting[i].isSelected = false;
        }
      }
    },
  },
};
</script>
<template>
  <div style="display: flex">
    <div class="sorting" v-for="(item, index) in sorting" :key="index">
      <a
        :href="'#' + item.link"
        :class="{ selected: item.isSelected }"
        @click="toSelect(index, item)"
        >{{ item.title }}</a
      >
    </div>
  </div>
</template>
<style>
a {
  padding: 4px;
  margin-left: 10px;
  text-decoration: none;
  color: #777777;
  border: 1px solid transparent;
  border-radius: 3px;
}

.selected {
  border: 1px solid rgba(0, 0, 0, 0.3);
}

a:hover {
  border: 1px solid rgba(0, 0, 0, 0.1);
}
</style>
