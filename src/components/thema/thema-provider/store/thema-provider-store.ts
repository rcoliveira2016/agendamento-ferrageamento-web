import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useQuasar } from "quasar";

export const useThemaProviderStore = defineStore("themaProviderStore", {
  state() {
    return {
      dark: useQuasar().dark,
    };
  },
  actions: {
    setarDark(heDark: boolean) {
      this.dark.set(heDark);
    },
  },
  getters: {
    isDark(): boolean {
      return this.dark.mode === "auto" ? false : this.dark.mode;
    },
  },
});
