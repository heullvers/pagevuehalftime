<template>
<v-main>
<v-app>
  <nav>
    <label class="logo white--text"> HalfTime</label>
  </nav>
  <router-view/>
  <Footer class="margemEmCima"/>
</v-app>
</v-main>
</template>

<script>
import Footer from './components/Footer.vue'



export default {
  components: { 
    Footer
  },
 
    data:()=>({
    drawer: false
  })
}
</script>

<style scoped>

nav{
  background: black;
  height: 80px;
  width: 100%;
}

.logo{
  font-size: 35px;
  font-weight: bold;
  line-height: 80px;
  padding: 0 100px;
}

.margemEmCima{
  margin-top: 20px;
}

</style>