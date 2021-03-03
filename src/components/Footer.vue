<template>
    <v-footer
        dark
        padless
    >
        <v-card
        width="100%"
        flat
        tile
        class="black lighten-1 white--text text-center"
        >
        <v-card-text>
            <v-btn
            v-for="icon in icons"
            :key="icon"
            @click="abrirLink(icon)"
            class="mx-4 white--text"
            icon
            >
            <v-icon size="24px">
                {{ icon }}
            </v-icon>
            </v-btn>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
            {{ new Date().getFullYear() }} — <strong>HalfTime</strong>
        </v-card-text>
        </v-card>
    </v-footer>
  
</template>

<script>
export default {

    data: () =>({
        icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-instagram',
      ],
    }),

    methods:{
        abrirLink:function(icon){
            if(icon == 'mdi-facebook'){
                window.open("https://facebook.com", "_blank");
            }
            else if(icon == 'mdi-twitter'){
                window.open("https://twitter.com", "_blank");
            }
            else{
                window.open("https://instagram.com", "_blank");
            }
            
        }
    }

}
</script>

<style>

</style>