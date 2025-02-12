export const useStore = defineStore("counter", {
  state: () => ({
    isOpen: true,
    moduleTitle: '',
    link: [] as BreadCrumbsModel[],
  }),
  getters: {
    // getToggleState: (state) => state.isOpen,
  },
  actions: {
    toggleState() {
      this.isOpen = !this.isOpen;
    },
    setModuleTitle(title: string) {
      this.moduleTitle = title
    },
    setLink(link: BreadCrumbsModel[]) {
      this.link = link;
    }
  },
});
