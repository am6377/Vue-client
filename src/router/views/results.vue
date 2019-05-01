<script>
import Layout from '@layouts/main'
import { authComputed, postsComputed } from '@state/helpers'
import Question from '@components/Question'
import Box from '@components/GridBox'

export default {
  components: { Layout, Question, Box },
  props: {
    inputVal: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      title: 'userProfile',
      name: 'username',
      meta: [
        {
          name: 'description',
        },
      ],
    }
  },
  computed: {
    ...authComputed,
    ...postsComputed,

    doesSearchExist() {
      if (this.posts[0]) {
        return this.posts[0].tags.includes(this.inputVal)
      }
    }
  },
  created() {
    this.$store.dispatch('posts/getPostsByTag', this.inputVal)
  },
}
</script>

<template>
  <Layout>
    <div class="create md-layout">
      <MdContent
        class="frist-wrapper"
      >
        <span class="md-display-1">
          Search Results for ...
        </span>
        <span class="md-display-2">
          {{ inputVal }}
        </span>
      </MdContent>
      <MdContent
        v-if="doesSearchExist"
        md-tag="div"
        class="another-wrapper extra-margin"
      >
        <h3 class="md-title">
          <Question
            v-for="(post, index) of posts"
            :id="index"
            :key="post._id"
            :post="post"
            :tag="inputVal"
          />
        </h3>
      </MdContent>
      <MdContent
        v-else
        md-tag="section"
        class="another-wrapper "
      >
        <h3 class="md-title">
          sorry ... there are no Questions related to this topic
        </h3>
      </MdContent>
      <div
        v-if="doesSearchExist"
      >
        <Box :tag="inputVal">
          <div class="md-title">
            {{ inputVal }}
          </div>
        </Box>
      </div>
      <MdContent
        v-else
        md-tag="section"
        class="another-wrapper"
      >
        <h3 class="md-title ">
          sorry ... there are no Topics related to this topic
        </h3>
      </MdContent>
    </div>
  </Layout>
</template>

<style lang="scss">
.create {
  z-index: -1;
  justify-content: center;
  text-align: center;

  .frist-wrapper {
    width: 768px;
    padding: 2em;
    margin-top: 4em;

    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }


  .another-wrapper {
    width: 768px;
    padding: 2em;
    margin: 2em 4em 0 4em;

    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }

  .extra-margin{
    margin-bottom: 2em;
  }
}
</style>
