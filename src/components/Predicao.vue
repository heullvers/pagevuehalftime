<template>
    <v-container>
        <v-row class="distanciaEmbaixo">
            <v-col class="d-flex justify-center">
                <img :src="urlFotoTimeMandante" alt="" >
                <img :src="versus" alt="" >
                <img :src="urlFotoTimeVisitante" alt="" >
            </v-col>
        </v-row>

        <v-row justify="center">
            <p class="headline">Resultado</p>
        </v-row>

        <v-row justify="center">
            <p v-if="resultado!='E'" class="title">O vencedor será</p>
            <p v-else class="title">O jogo terminará empatado</p>
        </v-row>

        <v-row justify="center" class="distanciaEmbaixo">
            <img v-if="resultado=='V'" :src="urlFotoTimeMandante" alt="" >
            <img v-else-if="resultado=='D'" :src="urlFotoTimeVisitante" alt="" >
        </v-row>
        
        <!-- VITÓRIA -->
        <v-row justify="center">
            <p class="subtitle-1">Chances de vitória do {{timeMandante}} (%)</p>
        </v-row>
            
        <v-row justify="center" class="distanciaEmbaixo">
            <v-progress-circular
            :rotate="360"
            :size="100"
            :width="15"
            :value="(porcentagemVitoria * 100).toFixed(1)"
            color="green"
            >
            {{ (porcentagemVitoria * 100).toFixed(1)}}
            </v-progress-circular>
        </v-row>

         <!-- EMPATE -->
        <v-row justify="center">
            <p class="subtitle-1">Chances de empate (%)</p>
        </v-row>
            
        <v-row justify="center" class="distanciaEmbaixo">
            <v-progress-circular
            :rotate="360"
            :size="100"
            :width="15"
            :value="(porcentagemEmpate * 100).toFixed(1)"
            color="orange"
            >
            {{ (porcentagemEmpate * 100).toFixed(1) }}
            </v-progress-circular>
        </v-row>

        <!-- DERROTA -->
        <v-row justify="center">
            <p
             class="subtitle-1">Chances de vitória do {{timeVisitante}} (%)</p>
             
            
        </v-row>
            
        <v-row justify="center" class="distanciaEmbaixo">
            <v-progress-circular
            :rotate="360"
            :size="100"
            :width="15"
            :value="(porcentagemDerrota * 100).toFixed(1)"
            color="red"
            >
            {{ (porcentagemDerrota * 100).toFixed(1) }}
            </v-progress-circular>
        </v-row>

        <v-row justify="center">
            <v-btn @click="voltar" color="blue white--text">Voltar</v-btn>
        </v-row>
        
        
        
    </v-container>
    
</template>

<script>
export default {

    data:() => ({
        parametros: '',
        timeMandante: '',
        timeVisitante: '',
        porcentagemMandante: 0,
        porcentagemEmpate: 0,
        porcentagemVisitante: 0,
        resultado: '',
        urlFotoTimeMandante: '',
        versus: 'https://cdn141.picsart.com/272465983022211.png?type=webp&to=min&r=640',
        urlFotoTimeVisitante: ''
    }),

    created(){
       this.fetchData()
    },

    methods:{
        fetchData:function(){
            this.parametros = this.$route.params

            this.resultado = this.parametros.array[0]

            this.porcentagemDerrota = this.parametros.array[1]
            this.porcentagemEmpate = this.parametros.array[2]
            this.porcentagemVitoria = this.parametros.array[3]

            this.urlFotoTimeMandante = this.parametros.array[4]
            this.urlFotoTimeVisitante = this.parametros.array[5]

            this.timeMandante = this.parametros.timeM
            this.timeVisitante = this.parametros.timeV

        },

        voltar:function(){
            this.$router.go(-1)
        }
    }

}
</script>

<style>

.distanciaMargem{
    margin-top: 20px;
}

.distanciaEmbaixo{
    margin-bottom: 40px;
}

img{
    max-width: 100px;
    max-height: 100px;
}

p{
    text-align: center;
}

</style>