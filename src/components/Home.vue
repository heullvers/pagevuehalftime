<template>
    <v-container>
      <v-row>
        <v-col>
          <table class="center">
            <partida v-for="partida of partidas" :key="partida.timeMandante" :partida="partida" @abrirDialog="abrirDialog($event)">
            </partida>
          </table>
        </v-col>
      </v-row>

      <!-- DIALOG PREVISÃO-->
      <v-row justify="center">
        <v-dialog
          v-model="dialog"
          max-width="400"
        >
          <v-card>
            <v-card-title class="headline">
              Deseja prever a partida?
            </v-card-title>

            <v-card-text>
              Ao clicar em sim será vista a possibilidade de predizer essa partida e em seguida sua previsão.
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                color="green darken-1"
                text
                @click="fecharDialog"
              >
                Não
              </v-btn>

              <v-btn
                color="green darken-1"
                text
                v-on:click="verificarPossibilidade"
              >
                Sim
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>

    <!-- DIALOG IMPOSSÍVEL -->
      <div class="text-center">
    <v-dialog
      v-model="dialogImpossible"
      width="500"
    >

      <v-card>
            <v-card-title class="headline">
              Atenção
            </v-card-title>

            <v-card-text>
              Para que a previsão possa ser realizada o jogo precisa estar no intervalo.
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                color="green darken-1"
                text
                v-on:click="entendi"
              >
                Entendi
              </v-btn>
            </v-card-actions>
          </v-card>
    </v-dialog>
  </div>

  <!-- DIALOG IMPOSSÍVEL -->
      <div class="text-center">
    <v-dialog
      v-model="dialogImpEstatisticas"
      width="500"
    >

      <v-card>
            <v-card-title class="headline">
              Atenção
            </v-card-title>

            <v-card-text>
              Não será possível predizer pois as estatísticas desse jogo não estão disponíveis.
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                color="green darken-1"
                text
                v-on:click="entendi"
              >
                Entendi
              </v-btn>
            </v-card-actions>
          </v-card>
    </v-dialog>
  </div>

  <!-- LOAD -->
  <div class="text-center">
    <v-dialog
      v-model="load"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        color="primary"
        dark
      >
        <v-card-text>
          {{textLoad}}
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>

  
    </v-container>
</template>

<script>

import Partidas from '../services/partidas';

import Partida from './Partida'

export default {

name: 'Home',

  components: {
    Partida

  },

  data: () => ({
    partidas:[

    ],
    dialog: false,
    dialogImpossible: false,
    dialogImpEstatisticas: false,
    linkEstatistica: '',
    load: false,
    textLoad: '',
    timeMandante: '',
    timeVisitante: ''
    
  }),

  mounted(){

    this.trazer()
    
    window.setInterval(() => {
      this.trazer()
    }, 30000)
    

  },

  methods:{
    trazer:function(){
      Partidas.listar().then(res => {
      this.partidas = res.data
    })
    },

    fecharDialog:function(){
      this.dialog = false
    },

    abrirDialog:function(situacao){
      this.linkEstatistica = situacao[1]
      this.timeMandante = situacao[2]
      this.timeVisitante = situacao[3]
      if(situacao[0] != 'Intervalo'){
        this.dialogImpossible = true
      }
      else{
        this.dialog = true
      }
      
    },

    entendi:function(){
      this.dialogImpossible = false
      this.dialogImpEstatisticas = false
    },

    verificarPossibilidade(){
      this.dialog = false
      this.enviarLink(this.linkEstatistica)
      
    },

    async predizer(){
      this.load = true
      this.textLoad = 'Predizendo...'
      try {
        await
        Partidas.predizer(this.linkEstatistica).then(res =>{
          this.$router.push({
          name: 'Predicao', 
          params: { array: res.data,
                    timeM: this.timeMandante,
                    timeV: this.timeVisitante}
          });
        })
      } catch (error) {
          console.log(error)
      }
      finally{
        this.load = false
      }

    },

    async enviarLink(){

      this.load = true
      this.textLoad = 'Verificando possibilidade...'
      try {
        await
        Partidas.verificarLink(this.linkEstatistica).then(res => {
        if(res.data == '1'){
          this.predizer()
        }
        else{

          this.load = false
          console.log('NÃO SERÁ POSSIVEL PREDIZER')
          this.dialogImpEstatisticas = true
        }
    })
        
      } catch (error) {
        console.log(error)
 
      }
    },

    proximapagina(){
      
    }

  }
};

</script>

<style>

.center{
  margin-left: auto;
  margin-right: auto;
}

table{
  border-spacing: 0 5px;
}


</style>