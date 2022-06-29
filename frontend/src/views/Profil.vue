<template>
  <div>
    <div class="profil">
        <h1>Bienvenu {{name}}</h1>  
        <div class="my_pronos">
            <h2>Tes pronos</h2> 
            <table>
                <thead>
                    <tr>
                        <th>Match</th>
                        <th>Score A</th>
                        <th>Score B</th>
                    </tr>
                </thead>
                <tbody>
                    <!--<tr v-for="match in matchs" :key="match" :value="match">{{match}}</tr>-->
                    <tr>
                        <td>The table body</td>
                        <td>The table body</td>
                        <td>with two columns</td>
                    </tr>
                </tbody>
            </table>
            <router-link to="/addBet"><button class="button_addbet">Ajouter un prono</button> </router-link>
        </div> 
        <button v-on:click="disconnect" class="button_disconnect">Me deconnecter</button>  
    </div>
  </div>
</template>

<script>

import {http} from "../assets/js/http-common.js"

export default {
  name: 'ProfilView',

    data(){
        return{
            name: localStorage.getItem('username'),
            prono_list: []
        }
    },
 
    mounted(){
        this.getProno()
    },
    methods:{
        disconnect() {
            localStorage.clear();
            this.$router.replace('/login')
        },

        async getProno(){
            var userMatch = []
            await http.get('pronos?filters[name][$eq]='+localStorage.getItem('username')+'', {
                headers: {
                    Authorization:
                    'Bearer '+localStorage.getItem('token')+'',
                },
            })
            .then(function (res) {
                res.data.data.forEach( item => {
                    var item_match_id = item.attributes.match_id;
                    var item_score_a = item.attributes.score_a;
                    var item_score_b = item.attributes.score_b;

                    userMatch.push({match_id: item_match_id, score_a : item_score_a, score_b: item_score_b})
                })
            })
            console.log(userMatch);
        }


    }
}
</script>

<style lang="scss" scopped>

.profil{
    margin-left: 10%;

    .my_pronos{
        background: #1B1D23;
        border-radius: 20px;
        padding: 1px 20px 20px;
        margin-bottom: 20px;

        .button_addbet{
            background: #154EFF;
            border: none;
            color: White;
            font-family: 'Poppins';
            padding: 10px;
            border-radius: 3px;
            transition: all 200ms linear;
            cursor: pointer;

            &:hover{
                background: #0830a8 ;
            }
        }
    }

    .button_disconnect{
        background: transparent;
        border: 1px solid rgb(255, 48, 48);
        color: rgb(255, 48, 48);
        font-family: 'Poppins';
        padding: 10px;
        border-radius: 3px;
        transition: all 200ms linear;
        cursor: pointer;

        &:hover{
            background: rgb(255, 48, 48); 
            color: white;
        }
    }
    
}
</style>