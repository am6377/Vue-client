<script>
import SearchBox from '@components/SearchBox'

export default {
  components: { SearchBox },
}
</script>

<template>
  <div>
    <link
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"
    >
    <SearchBox />
    <div :class="$style.container">
      <!-- Compiled and minified CSS -->
      <slot />
    </div>
  </div>
</template>

<style lang="scss" module>
@import '@design';

.container {
  min-width: $size-content-width-min;
  max-width: $size-content-width-max;
  margin: 0 auto;
}
</style>
