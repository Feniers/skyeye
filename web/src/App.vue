<template>
  <!-- eslint-disable-next-line vue/multi-word-component-names -->
  <div id="app">

    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    // 在页面加载时读取sessionStorage
    // debugger
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
    }
    // 在页面刷新时将store保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    })

    const user = this.$store.state.user
    console.log("user " + user)
  }
}
</script>

<style lang="scss"></style>
