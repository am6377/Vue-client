<template>
  <div v-show="post.content.length > 1">
    <div
      class="question-answer"
      @click="routeToAnswer"
    >
      <div
        class="question-type question-id color"
      >
        {{ id + 1 }}
      </div>
      <div
        class="question-type question color"
      >
        {{ post.content }}
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Question',
  props: {
    post: {
      type: Object,
      default: () => ({}),
    },
    id: {
      type: Number,
      default: 0,
    },
    tag: {
      type: String,
      default: '',
    },
  },
  methods: {
    routeToAnswer() {
      this.$router.push({
        name: 'answer',
        params: {
          tag: this.tag,
          id: this.post._id,
        },
      })
    },

  },
}
</script>

<style lang="scss" scoped>
.question-type {
  display: inline-block;
  padding: 1em;
  font-size: 1rem;
  font-weight: 500;
}
.question-id {
  width: 10%;
  margin: 1em 1em 1em 0;
}
.question {
  width: 80%;
  margin: 1em 0;
}
.question-answer {
  cursor: pointer;
}
.color {
  color: #07070A;
  background-color: #ECD5FB;

}
</style>
