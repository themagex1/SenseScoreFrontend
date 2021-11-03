<template>
  <div class="Tablet">
    <img src="@/assets/tablet.png">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tablet'
}
</script>

<style scoped>
.Tablet {
  display: inline-block;
  width: 300px;
  position: relative;
}

::before {
  content: "";
  display: block;
  padding-top: 127.9569892473118%;
}

.content {
  position: absolute;
  top: 9.2%;
  left: 10.4%;
  right: 10.8%;
  bottom: 8.1%;
  overflow: hidden;

  color: black;
}

img {
  left: 0;
  top: 0;
  width: 100%;
}

</style>
