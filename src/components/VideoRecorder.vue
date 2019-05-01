<template>
  <div id="app">
    <div>
      <video 
        id="video" 
        ref="video" 
        width="640" 
        height="480" 
        autoplay
      />
    </div>
    <div>
      <button
        @click="getStream('video')"
      >
        Record Video
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VideoRecorder',
  props: {
  },
  data() {
    return {
      constraints: {
        "video": {
          width: {
            max: 320
          }
        },
        "audio" : true
      }
    }
  },
  methods: {
    getUserMedia(options, successCallback, failureCallback) {
      const api = navigator.getUserMedia || navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia || navigator.msGetUserMedia;

      if (api) {
        return api.bind(navigator)(options, successCallback, failureCallback);
      }
    },
    getStream (type) {
      if (!navigator.getUserMedia && !navigator.webkitGetUserMedia &&
        !navigator.mozGetUserMedia && !navigator.msGetUserMedia) {
        alert('User Media API not supported.');
        return;
      }

      this.constraints[type] = true;
      this.getUserMedia(this.constraints, (stream) => {
        let mediaControl = document.querySelector(type);

        if ('srcObject' in mediaControl) {
          mediaControl.srcObject = stream;
          mediaControl.src = (window.URL || window.webkitURL).createObjectURL(stream);
        } else if (navigator.mozGetUserMedia) {
          mediaControl.mozSrcObject = stream;
        }
      }, (err) => {
        console.log('Error: ' + err);
      });
    }
  },
}
</script>

<style lang="scss" scoped>
  #video {
    background-color: #000;
  }
</style>
