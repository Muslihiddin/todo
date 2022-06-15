export default {
  state: () => ({
    tasks: [],
  }),
  getters: {
    allTasks(state) {
      return state.tasks;
    },
  },
  mutations: {
    updateTasks(state, tasks) {
      state.tasks = tasks;
    },
  },
  actions: {
    getTasks(ctx) {
      if (localStorage.allTasks) {
        let storageData = JSON.parse(localStorage.allTasks);

        ctx.commit("updateTasks", storageData);
      }
    },
  },
};
