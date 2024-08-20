import { defineStore } from "pinia";

export const useStore = defineStore("tosmjr_data", {
  state: () => ({
    users: {},
    current_user: "",
    users_test_history: {},
    current_ops: null,
  }),
  getters: {
    maxOpsLevel: (state) => (ops) => 
      state.users_test_history[state.current_user]
        ? state.users_test_history[state.current_user]
            .filter(
              (rec) => rec.operation == ops && rec.end_state == 2
            )
            .reduce((a, b) => (a < b.level ? b.level : a), 0) + 1
        : 1,
    winsOnLevel: (state) => (level,ops) =>
      state.users_test_history[state.current_user]
        ? state.users_test_history[state.current_user]
            .filter(
              (rec) => rec.operation == ops && rec.end_state == 2 && rec.level == level
            )
        : 0,
    starsOnLevel: (state) => (level,ops) =>
      state.winsOnLevel(level,ops)
        .reduce((max, attempt) => Math.max(max, attempt.star_cnt), 0),
    totalStarsOnOps: (state) => (ops) =>
      [...Array(state.maxOpsLevel(ops)).keys()]
        .map(i => state.starsOnLevel(state.maxOpsLevel(ops) - i,ops))
        .reduce((accum,val) => accum + val,0)
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
