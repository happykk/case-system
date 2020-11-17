<template>
  <div>
    <main class="content-container" ref="container" :class="headFixed == true ? 'marginTop' : ''">
      <nuxt/>
    </main>
  </div>
</template>

<style>
  .marginTop{
    margin-top: 170px;
  }
</style>

<script>
  export default {
    components: {
     
    },
    data (){
      return {
        headFixed:false
      }
    },
    mounted (){
    },
    methods: {
    }
  }
</script>
