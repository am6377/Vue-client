<script>
  import { BACKEND_API } from '@constants'
  import {
    capitalize
  } from 'lodash'

  export default {
    name: 'ConnectButton',
    props: {
      social: {
        type: String,
        default: ''
      }
    },
    methods: {
      authenticate() {
        window.location.href = `${BACKEND_API}/auth/${this.social}`;
      },
      getTitle() {
        return capitalize(this.social)
      },
      getIcon() {
        return `${this.social}-icon`
      }
    }
  }
</script>

<template>
  <div>
    <MdButton
      v-if="social"
      :class="getIcon()"
      class="md-button md-raised md-accent"
      @click="authenticate"
    >
      <FontAwesomeIcon
        :icon="['fab', social]" 
        size="lg" 
      />
      <span
        class="icon-padding"
      >
        Connect via {{ getTitle() }}
      </span>
    </MdButton>
  </div>
</template>

<style lang="scss" scoped>
  .md-button {
    width: 250px !important;
  }
  .icon-padding {
    padding-left: 1em;
  }
  .reddit-icon {
    background-color: #ff5700 !important;
  }
  .google-icon {
    background-color: #d62d20 !important;
  }
  .facebook-icon {
    background-color: #3b5998 !important;
  }
  .linkedin-icon {
    background-color: #0077B5 !important;
  }
</style>
