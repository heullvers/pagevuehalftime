<template>
<v-app>
  <v-main>
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
  </v-main>
</v-app>
</template>

<script>

import Partida from './components/Partida'

import Partidas from './services/partidas'

export default {
  name: 'App',

  components: {
    Partida

  },

  data: () => ({
    partidas:[

    ],
    dialog: false,
    dialogImpossible: false,
    linkEstatistica: '',
    load: false,
    textLoad: ''
    
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

    fecharDialog:function(){
      this.dialog = false
    },

    abrirDialog:function(situacao){
      this.linkEstatistica = situacao[1]
      if(situacao[0] != 'Intervalo'){
        this.dialogImpossible = true
      }
      else{
        this.dialog = true
      }
      
    },

    entendi:function(){
      this.dialogImpossible = false
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
          console.log(res.data)
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
        console.log(res.data)
        if(res.data == '1'){
          this.predizer()

        }
        else{
          console.log('NÃO SERÁ POSSIVEL PREDIZER')
        }
    })
        
      } catch (error) {
        console.log(error)
 
      }
    },

  }
};
</script>

<style scoped>
.center{
  margin-left: auto;
  margin-right: auto;
}

table{
  border-spacing: 0 5px;
}

</style>