<template>
  <div class="advice">
    <VideoRecorder
      v-if="isVideoRecorder"
    />
    <!-- eslint-disable-next-line vue/component-name-in-template-casing -->
    <audio-recorder
      v-if="isRecorder"
      upload-url="YOUR_API_URL"
      :after-recording="callback"
      :time="2"
    />
    <!-- eslint-disable-next-line vue/component-name-in-template-casing -->
    <image-uploader
      v-else-if="isImageUpload"
      :debug="1"
      :max-width="512"
      :quality="0.7"
      :auto-rotate="true"
      output-format="verbose"
      :preview="false"
      :class-name="['fileinput', { 'fileinput--loaded' : hasImage }]"
      capture="environment"
      accept="video/*,image/*"
      do-not-resize="['gif', 'svg']"
      @input="setImage"
      @onUpload="startImageResize"
      @onComplete="endImageResize"
    >
      <label
        slot="upload-label"
        for="fileInput"
      >
        <figure>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
          >
            <path
              class="path1"
              d="M9.5 19c0 3.59 2.91 6.5 6.5 6.5s6.5-2.91 6.5-6.5-2.91-6.5-6.5-6.5-6.5 2.91-6.5 6.5zM30 8h-7c-0.5-2-1-4-3-4h-8c-2 0-2.5 2-3 4h-7c-1.1 0-2 0.9-2 2v18c0 1.1 0.9 2 2 2h28c1.1 0 2-0.9 2-2v-18c0-1.1-0.9-2-2-2zM16 27.875c-4.902 0-8.875-3.973-8.875-8.875s3.973-8.875 8.875-8.875c4.902 0 8.875 3.973 8.875 8.875s-3.973 8.875-8.875 8.875zM30 14h-4v-2h4v2z"
            />
          </svg>
        </figure>
        <span
          class="upload-caption"
        >
          {{ hasImage ? 'Replace' : 'Upload' }}
        </span>
      </label>
    </image-uploader>
    <MdField
      v-else
    >
      <label>Advice</label>
      <MdTextarea
        v-model="textAnswer"
      />
    </MdField>
    <div class="advice-actions">
      <div class="advice-actions-answer">
        <MdButton
          class="md-icon-button md-raised md-primary"
          @click="displayRecorder"
        >
          <MdIcon>mic</MdIcon>
        </MdButton>
        <MdButton
          class="md-icon-button md-raised md-primary"
          @click="displayImageUpload"
        >
          <MdIcon>image</MdIcon>
        </MdButton>
        <MdButton
          class="md-icon-button md-raised md-primary"
          @click="displayVideoRecorder"
        >
          <MdIcon>videocam</MdIcon>
        </MdButton>
      </div>
      <div class="advice-actions-submit">
        <MdButton
          v-if="!isRecorder"
          class="md-raised md-primary"
          @click="reply"
        >
          Submit
        </MdButton>
      </div>
    </div>
  </div>
</template>

<script>
import { replyToPost } from '@services/posts'
import { authComputed } from '@state/helpers'
import VideoRecorder from '@components/VideoRecorder'

export default {
  name: 'Advice',
  components: {
    VideoRecorder
  },
  props: {
    post: {
      type: Object,
      default: () => ({}),
    },
    tag: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      textAnswer: null,
      isRecorder: false,
      isImageUpload: false,
      isVideoRecorder: false,
    }
  },
  computed: {
    ...authComputed,
  },
  methods: {
    async reply() {
      await replyToPost(this.post._id, {
        author: this.currentUser._id,
        content: this.textAnswer,
        tags: this.tag,
      })
    },
    displayRecorder() {
      this.isImageUpload = false;
      this.isVideoRecorder = false;
      this.isRecorder = !this.isRecorder;
    },
    displayImageUpload() {
      this.isRecorder = false;
      this.isVideoRecorder = false;
      this.isImageUpload = !this.isImageUpload;
    },
    displayVideoRecorder() {
      this.isRecorder = false;
      this.isImageUpload = false;
      this.isVideoRecorder = !this.isVideoRecorder;
    }
  },
}
</script>

<style lang="scss" scoped>
.advice {
  padding: 2em;

  .advice-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 2em;
  }
}
</style>
