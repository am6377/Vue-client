<script>
import appConfig from '@src/app.config'
import Layout from '@layouts/main'
import Box from '@components/GridBox'
import NewTopic from '@components/NewTopic'
import { tagsComputed } from '@state/helpers'
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'

export default {
  page: {
    title: 'Home',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  filters: {
    lowercase(string) {
      if (!string) {
        return string
      }
      return string.toLowerCase()
    },
  },
  components: {
    Layout,
    Box,
    NewTopic,
    VueperSlides,
    VueperSlide
  },
  data: () => ({
    slides: [
      {
        title: '',
        content: '<div style="background:rgba(255,255,255,0.8); border-radius: 10px; padding: 0.3em; margin-left:2em;"><h1 style="font-size: 3.4vw;color: #C01D51";>Share your knowledge and help others grow!</h1></div>',
        image:
          "https://cdn0.tnwcdn.com/wp-content/blogs.dir/1/files/2015/09/interactiondesign.jpg"
      },
      {
        title: '',
        content: '<div style="background:rgba(255,255,255,0.8); border-radius: 10px; padding: 0.1em;"><h1 style="font-size: 3.4vw;color: #000000;">Learn from content creators and show your support by crowdfunding! </h1></div>',
        image:
          "https://media.treehugger.com/assets/images/2018/02/green_business_iStock_Getty_Images_Plus.jpg.860x0_q70_crop-scale.jpg"
      },
    ]
  }),
  computed: {
    ...tagsComputed,
  },
  created() {
    this.$store.dispatch('tags/getTrending')
  },
}
</script>

<template>
  <Layout>
    <div class="create md-layout">
      <div class="slide">
        <VueperSlides autoplay>
          <VueperSlide
            v-for="(slide, i) in slides"
            :key="i"
            :image="slide.image"
            :title="slide.title"
            :content="slide.content"
          />
        </VueperSlides>
      </div>

      <NewTopic />

      <MdContent class="small-wrapper">
        <span class="md-display-1">
          Trending topics
        </span>
      </MdContent>
      <Box
        v-for="(tag, index) in tags"
        :key="index"
        :tag="tag"
      >
        <div class="md-title">
          {{ tag | lowercase }}
        </div>
      </Box>
    </div>
  </Layout>
</template>

<style lang="scss">
.slide {
  width: 100%;
  margin: 1em 0 1em 0;
}
.create {
  justify-content: center;
  text-align: center;

  .big-wrapper {
    width: 900px;
    height: 300px;
    padding: 2em;
    margin-top: 3em;
    margin-bottom: 3em;


    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }

  .small-wrapper {
    width: 900px;
    padding: 1em;
    margin-top: 2em;
    margin-bottom: 2em;

    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }


}
</style>
