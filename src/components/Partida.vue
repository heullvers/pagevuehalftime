<template>
  <tr @click="abrirDialog(partida.situacao, partida.linkEstatistica, partida.timeMandante, partida.timeVisitante)">
      <td class="time">
        <v-col class="mt-8 tamanhoInternoColuna">
          <p class="margemMandante" align="right">{{partida.timeMandante}}</p>
        </v-col>
      </td>

      <td>
        <img class="mt-6" :src="partida.linkImagemMandante" alt="" width="30" height="30">
      </td>

      <td>
        <v-col class="tamanhoInternoColuna">
          <p id="tempo" align="center">{{partida.situacao}}</p>
          <v-row justify="center">
              <p>{{partida.GolsMandante}}</p>
              <p>-</p>
              <p>{{partida.GolsVisitante}}</p>
          </v-row>

        </v-col>
      </td>

        <td>
          <img class="mt-6" :src="partida.linkImagemVisitante" alt="" width="30" height="30">
        </td>

        <td class="time">
          <v-row>
            <v-col class="mt-8 tamanhoInternoColuna">
              <p class="margemVisitante">{{partida.timeVisitante}}</p>
            </v-col>
          </v-row> 
        </td>

  
      <!--
      <td v-if="partida.situacao == 'Intervalo'">
        <button v-on:click="enviarLink(partida.linkEstatistica)">
          <v-icon color="blue">cloud</v-icon>
        </button>
      </td>
      -->

  </tr>
        
</template>

<script>


export default {

  props:{
    partida : Object
  },
  methods:{

    abrirDialog(situacao, linkEstatistica, timeMandante, timeVisitante){
      this.$emit('abrirDialog', [situacao, linkEstatistica, timeMandante, timeVisitante])
      //this.popup = true
    },

  },
  data: () => ({

  }),
}
</script>


<style scoped>

#tempo{
  font-size: 12px;
  color: red;
}

.coricone{
  background-color: green;
}

td{
  padding-left: 10px;
  padding-right: 10px;
}

tr{
  /*box-shadow: 0px 1px 3px 0px rgba(0,0,50);*/
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
}

tr:hover{
  cursor: pointer;
  background-color: greenyellow;
}


.tamanhoInternoColuna{
  padding: 0px;
}

.margemMandante{
  margin-left: 10px;
}

.margemVisitante{
  margin-right: 10px;
}

p{
  font-size: 14px;
}

.time{
  max-width: 160px;
}

</style>