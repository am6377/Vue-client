<template>
  <div class="autocomplete">
    <div
      class="input"
      @click="toggleVisible"
      v-text="selectedItem ? selectedItem[filterby] : ''"
    />
    <div
      v-if="selectedItem == null"
      class="placeholder"
      v-text="title"
    />
    <button
      v-if="selectedItem"
      class="close"
      @click="selectedItem = null"
    />
    <div
      v-show="visible"
      class="popover"
    >
      <input
        ref="input"
        v-model="query"
        type="text"
        placeholder="Start Typing..."
        @keydown.up="up"
        @keydown.down="down"
        @keydown.enter="enterNewItem"
      >
      <div
        ref="optionsList"
        class="options"
      >
        <ul>
          <li
            v-for="(match, index) in matches"
            :key="index"
            :class="{ 'selected': (selected == index)}"
            @click="itemClicked(index)"
            v-text="match[filterby]"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      default: () => [],
      type: Array,
    },
    filterby: {
      default: () => '',
      type: String,
    },
    title: {
      default: 'Select One...',
      type: String,
    },
    shouldReset: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      itemHeight: 39,
      selectedItem: null,
      selected: 0,
      query: '',
      visible: false,
      newItem: '',
    }
  },
  computed: {
    matches() {
      this.$emit('change', this.query)
      if (this.query === '') {
        return []
      }
      return this.items.filter(item =>
        item[this.filterby].toLowerCase().includes(this.query.toLowerCase())
      )
    },
  },
  methods: {
    enterNewItem() {
      this.selectedItem = { name: this.query.toLowerCase() }
      this.$emit('selected', JSON.parse(JSON.stringify(this.selectedItem)))

    },
    toggleVisible() {
      this.visible = !this.visible
      setTimeout(() => {
        this.$refs.input.focus()
      }, 50)
    },
    itemClicked(index) {
      this.selected = index
      this.selectItem()
    },
    selectItem() {
      if (!this.matches.length) {
        return
      }
      this.selectedItem = this.matches[this.selected]
      this.visible = false
      if (this.shouldReset) {
        this.query = ''
        this.selected = 0
      }
      this.$emit('selected', JSON.parse(JSON.stringify(this.selectedItem)))

    },
    up() {
      if (this.selected === 0) {
        return
      }
      this.selected -= 1
      this.scrollToItem()
    },
    down() {
      if (this.selected >= this.matches.length - 1) {
        return
      }
      this.selected += 1
      this.scrollToItem()
    },
    scrollToItem() {
      this.$refs.optionsList.scrollTop = this.selected * this.itemHeight
    },
  },
}
</script>

<style scoped>
.autocomplete {
  position: relative;
  z-index: 4;
  width: 100%;
}
.input {
  height: 50px;
  padding-top: 10px;
  padding-left: 10px;
  font-size: 25px;
  cursor: text;
  border: 4px solid white;
  border-radius: 3px;
}
.close {
  position: absolute;
  top: 4px;
  right: 2px;
  font-size: 30px;
  color: lightgrey;
  cursor: pointer;
  background: none;
  border: none;
}
.placeholder {
  position: absolute;
  top: 11px;
  left: 11px;
  font-size: 25px;
  color: #d0d0d0;
  pointer-events: none;
}
.popover {
  position: absolute;
  top: 46px;
  right: 0;
  left: 0;
  min-height: 50px;
  text-align: center;
  background: #fff;
  border: 2px solid lightgray;
  border-radius: 3px;
}
.popover input {
  width: 95%;
  height: 40px;
  padding-left: 8px;
  margin-top: 5px;
  font-size: 16px;
  border: 1px solid black;
  border-radius: 3px;
}
.options {
  max-height: 150px;
  margin-top: 5px;
  overflow-y: scroll;
}
.options ul {
  padding-left: 0;
  color: black;
  text-align: left;
  list-style-type: none;
}
.options ul li {
  padding: 10px;
  cursor: pointer;
  background: white;
  border-bottom: 2px solid white;
}
.options ul li:first-child {
  border-top: 2px solid pink;
}
.options ul li:not(.selected):hover {
  background: #448afe;
}
.options ul li.selected {
  font-weight: 600;
  color: white;
  background: #ff5252;
}
</style>
