<template>
<v-app>
  <v-content>
    <v-container>
      <v-row>
        <v-col>
          <table class="center">
            <partida v-for="partida of partidas" :key="partida.timeMandante" :partida="partida" v-on:dialog="updateDialog($event)">
            </partida>
          </table>
        </v-col>
      </v-row>
      
    </v-container>
    
  </v-content>
 
  

</v-app>
</template>

<script>

import Partida from './components/Partida'

import Partidas from './services/partidas'

export default {
  name: 'App',

  components: {
    Partida,

  },

  data: () => ({
    partidas:[

    ],
    showDialog:false,
    urlTimeMandante: 'https://www.flashscore.com.br/res/image/data/Ac7zDx96-2syimTdH.png'
  }),

  mounted(){
    this.trazer()

  },

  methods:{
    trazer:function(){
      Partidas.listar().then(res => {
      this.partidas = res.data
    })
    },

    updateDialog(variable){
      this.showDialog = variable;
    },
    
  }
};
</script>

<style scoped>
.center{
  margin-left: auto;
  margin-right: auto;
}

.tempo{
  font-size: 12px;
}

table{
  max-width: 500px;
  border-collapse: separate;
  border-spacing: 0 15px;
}




</style>