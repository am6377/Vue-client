<template>
  <div>
    <div class="textStyle">
      <h1>
        {{ post.content }}
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserQuestions',
  props: {
    post: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>

<style lang="scss" scoped>
.textStyle {
  margin: 20px;
  background-color: #FFF4EF;
  border: 2px solid #D1C8C4;
  border-radius: 20px;


}
.textStyle h1{
  font-size: 1.5vw;
  color: #2D3656;
}
</style>
