<template>
  <MdContent
    class="box-wrapper"
  >
    <MdCard>
      <MdCardHeader>
        <MdCardHeaderText>
          <slot />
        </MdCardHeaderText>
      </MdCardHeader>
      <MdCardActions>
        <MdButton>
          <router-link :to="{ name: 'create', params: { tag } }">
            Explore
          </router-link>
        </MdButton>
      </MdCardActions>
    </MdCard>
  </MdContent>
</template>

<script>
export default {
  name: 'Box',
  props: {
    tag: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss">
.box-wrapper {
    width: 300px;
    padding: 1.5em;

    @media screen and (max-width: 768px) {
      width: 80%;
    }
}
</style>
