// components/tab-control/tab-control.js
Component({
  properties: {
    titles: {
      type: Array,
      value: []
    }
  },
  data: {
    currentIndex: 0
  },
  methods: {
    handleItemTap(e) {
      const {index} = e.currentTarget.dataset;
      this.triggerEvent('tabsItemChange', {index})
    }
  }
})
