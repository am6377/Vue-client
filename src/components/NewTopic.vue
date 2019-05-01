<template>
  <div class="theContainer">
    <MdContent class="small-wrapper">
      <div class="textArea">
        <span class="md-display-1">
          Create topic
        </span>
      </div>
      <div class="inputbox">
        <input
          id="fname"
          v-model="newTag"
          type="text"
          placeholder="Input..."
        >
      </div>
      <div class="theButton">
        <MdButton
          class="md-primary md-raised"
          @click="createTopic"
        >
          Create
        </MdButton>
      </div>
    </MdContent>
  </div>
</template>

<script>
import { doesTagExist } from '@services/posts'
export default {
  name: 'NewTopic',
  props: {},
  data: function() {
    return {
      newTag: '',
    }
  },
  computed: {},
  methods: {
    async createTopic() {
      const response = await doesTagExist(this.newTag.toLowerCase())

      if (response === true) {
        this.$notification.dark(
          'This TOPIC already exists! Try searching it on the search bar!',
          { timer: 10, title: 'Whoops!', showCloseIcn: true }
        )
      } else {
        this.$router.push({ name: 'create', params: { tag: response.tags[0] } })
      }
    },
  },
}
</script>



<style lang="scss" >
.theContainer {
  width: 80%;
  text-align: center;
}
#fname[type='text'] {
  box-sizing: border-box;
  width: 100%;
  height: 3em;
  padding: 12px 20px;
}
.textArea {
  float: left;
  width: 33%;
  padding-top: 4px;
  // padding-right: 10px;
  // padding-left: 120px;
}
.inputbox {
  float: left;
  width: 50%;
}
.theButton {
  font-size: 5vw;
}
</style>
