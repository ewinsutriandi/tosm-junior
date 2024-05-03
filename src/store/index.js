import { defineStore } from 'pinia'

export const useStore = defineStore('tosmj', {
  state: () => ({
    settings: {
      fontSize: 14,
      tabSize: 2,
      zoomLevel: 0,
    },
    users: {},
    current_user: "",
    users_test_history: {},
    current_ops: null,

  }),
  getters: {
    doubleCounter: (state) => state.counter * 2,
    maxLevel: (state) => {
      let maxLevel = 1
      if (state.current_user in state.users_test_history) {
        let statses = state.users_test_history[state.current_user]
        for (const s of statses) {
          if (s.level >= maxLevel && s.end_state == 2) {
            maxLevel = s.level + 1
          }
        }
      }
      return maxLevel
    }
  },
  actions: {
    newStats(stats) {
      console.log('stat exists:',this.current_user in this.users_test_history)
      if (this.current_user in this.users_test_history) {
        this.users_test_history[this.current_user].push(stats)
      } else {
        this.users_test_history[this.current_user] = [stats]
      }
    },
    updateCurrentUser(user) {
        console.log('store',user)
        this.current_user = user
    },
    updateSettings(partialSettings) {
      this.settings = {
        ...this.settings,
        ...partialSettings,
      }
    },
  },
  persist: true,
})