<template>
  <Layout>
    <div class="create md-layout">
      <MdContent
        md-tag="section"
        class="content-wrapper"
      >
        <h1>{{ tag | capitalize }}</h1>
        <h2>Post A Question</h2>
        <MdField>
          <label>Question</label>
          <MdTextarea v-model="content" />
          <MdButton
            class="md-accent"
            @click="create"
          >
            Submit
          </MdButton>
        </MdField>
        <br>
        <MdCard>
          <MdCardHeader>
            <div class="md-title">
              Questions posted by other users for {{ tag | capitalize }}
            </div>
          </MdCardHeader>

          <MdCardContent>
            <Question
              v-for="(post, index) of posts"
              :id="index"
              :key="post._id"
              :post="post"
              :tag="tag"
            />
          </MdCardContent>
        </MdCard>
      </MdContent>
    </div>
  </Layout>
</template>

<script>
import Layout from '@layouts/main'
import Question from '@components/Question'
import appConfig from '@src/app.config'
import { authComputed, postsComputed } from '@state/helpers'
import { capitalize } from '@filters'

export default {
  page: {
    title: 'Post a Question',
    meta: [
      {
        name: 'description',
        content: `Register to ${appConfig.title}`,
      },
    ],
  },
  components: {
    Layout,
    Question,
  },
  filters: {
    capitalize,
  },
  props: {
    tag: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      content: null,
    }
  },
  computed: {
    ...authComputed,
    ...postsComputed,
  },
  created() {
    this.$store.dispatch('posts/getPostsByTag', this.tag)
  },
  methods: {
    create() {
      this.$store.dispatch('posts/create', {
        user: this.currentUser,
        content: this.content,
        tags: this.tag,
      })
    },
  },
}
</script>

<style lang="scss">
.create {
  justify-content: center;
  text-align: center;

  .content-wrapper {
    width: 768px;
    padding: 2em;
    margin-top: 5em;

    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }
}
</style>
