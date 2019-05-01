<template>
  <div>
    <MdDialog :md-active.sync="showDialog">
      <MdDialogTitle>Get started now!</MdDialogTitle>
      <ConnectButton
        social="google" 
      />
      <ConnectButton
        social="reddit" 
      />
      <ConnectButton
        social="linkedin" 
      />
      <ConnectButton
        social="facebook" 
      />
    </MdDialog>
  </div>
</template>

<script>
  import ConnectButton from '@components/ConnectButton'

  export default {
    name: 'Connect',
    components: {
      ConnectButton
    },
    props: {
      open: {
        type: Boolean
      }
    },
    computed: {
      showDialog: {
        get() {
          return this.open;
        },
        set(value) {
          this.$emit('update:open', value)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .md-dialog {
    max-width: 768px;
    justify-content: center;
    text-align: center;
    padding-bottom: 2em;
  }
</style>
