<template>
<v-container>
    <h1>Predicao</h1>
    <v-row>
        <img src="https://www.flashscore.com.br/res/image/data/jgyuT5Xg-CSY9KmVG.png" alt="" width="125" height="125">
        <img src="https://www.flashscore.com.br/res/image/data/4UV6u6YA-zJDr97a6.png" alt="" width="125" height="125">
    </v-row>
</v-container>
    
</template>

<script>
export default {

    data:() => ({
        parametros: ''
    }),

    created(){
       this.fetchData()
    },

    methods:{
        fetchData:function(){
            this.parametros = this.$route.params
        }
    }

}
</script>

<style>

</style>