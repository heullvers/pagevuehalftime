import {http } from './config'

export default{
    listar:( ) => {
        return http.get('jogos')
    },
    verificarLink(link) {
        return http.post('verificarlink/', null, {params: {link: link}})
    },
    predizer(link) {
        return http.post('predizer/', null, {params: {link: link}})
    },

}