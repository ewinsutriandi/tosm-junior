import { defineStore } from "pinia";

export const useStore = defineStore("exercise_data", {
  state: () => ({
    users: {},
    current_user: "",
    users_test_history: {},
    current_ops: null,
  }),
  getters: {
    maxOpsLevel: (state) =>
      state.users_test_history[state.current_user]
        ? state.users_test_history[state.current_user]
            .filter(
              (rec) => rec.operation == state.current_ops && rec.end_state == 2
            )
            .reduce((a, b) => (a < b.level ? b.level : a), 0) + 1
        : 1,
  },
  actions: {
    newStats(stats) {
      //console.log('stat exists:',this.current_user in this.users_test_history)
      if (this.current_user in this.users_test_history) {
        this.users_test_history[this.current_user].push(stats);
      } else {
        this.users_test_history[this.current_user] = [stats];
      }
      //console.log("User exist:",!(this.current_user in this.users))
      if (!(this.current_user in this.users))
        this.users[this.current_user] = {};
    },
    updateCurrentUser(user) {
      //console.log('store',user)
      this.current_user = user;
    },
    updateSettings(partialSettings) {
      this.settings = {
        ...this.settings,
        ...partialSettings,
      };
    },
  },
  persist: true,
});
