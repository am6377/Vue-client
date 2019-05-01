<template>
  <Layout>
    <div class="answer md-layout">
      <MdContent
        md-tag="section"
        class="content-wrapper"
      >
        <MdCard>
          <MdCardHeader>
            <div class="md-title">
              <h1>{{ tag | capitalize }}</h1>
            </div>
          </MdCardHeader>

          <MdCardContent>
            <UserQuestions
              :key="post._id"
              :post="post"
            />
            <MdList>
              <MdListItem
                v-for="(reply, index) in post.replies"
                :id="index"
                :key="index"
              >
                <div class="reply-item">
                  <span
                    class="vote-count"
                  >
                    {{ reply.votes }}
                  </span>
                  <span
                    class="vote"
                  >
                    <MdIcon>expand_less</MdIcon>
                    <MdIcon>expand_more</MdIcon>
                  </span>
                  <div
                    class="cta"
                  >
                    <span
                      class="md-list-item-text"
                    >
                      {{ reply.content }}
                    </span>
                    <MdButton class="md-icon-button md-raised md-primary">
                      <MdIcon>reply</MdIcon>
                    </MdButton>
                  </div>
                </div>
              </MdListItem>
            </MdList>
          </MdCardContent>
          <Advice
            :post="post"
            :tag="tag"
          />
        </MdCard>
      </MdContent>
    </div>
  </Layout>
</template>

<script>
import Layout from '@layouts/main'
import Advice from '@components/Advice'
import UserQuestions from '@components/UserQuestions'
import appConfig from '@src/app.config'
import { authComputed } from '@state/helpers'
import { getPost } from '@services/posts'
import { capitalize } from '@filters'

export default {
  page: {
    title: 'Answer Question',
    meta: [
      {
        name: 'description',
        content: `Register to ${appConfig.title}`,
      },
    ],
  },
  components: {
    Advice,
    Layout,
    UserQuestions,
  },
  filters: {
    capitalize,
  },
  props: {
    id: {
      type: String,
      default: '',
    },
    tag: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      post: {},
    }
  },
  computed: {
    ...authComputed,
  },
  async created() {
    const post = await getPost(this.id)

    this.post = post
  },
}
</script>

<style lang="scss">
.answer {
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

  .reply-item {
    display: flex;
    margin: 2rem 0;

    span {
      align-self: center
    }

    .vote-count {
      margin-right: 1rem;
      color: grey;
    }

    .vote {
      display: flex;
      flex-direction: column;
      margin-right: 2rem;
    }

    .cta {
      .md-list-item-text {
        margin-bottom: 1rem;
      }
    }
  }


}
</style>
