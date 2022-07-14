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
                    <tr v-for="prono in prono_list" :key="prono">
                        <td>{{prono.match_id}}</td>
                        <td>{{prono.score_a}}</td>
                        <td>{{prono.score_b}}</td>
                        <td v-if="new Date(prono.date) >= new Date()" class="update">
                            <router-link :to="{name: 'UpdateView', params: {id: prono.match_id} }">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ic" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="#ffffff" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 5.63l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75l1.83-1.83a.996.996 0 0 0 0-1.41z"></path></svg>
                            </router-link>
                        </td>
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
 
    async mounted(){
        await this.getProno()
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
            
                    http.get('matches?filters[match_id][$eq]='+item_match_id+'', {
                        headers: {
                            Authorization:
                            'Bearer '+localStorage.getItem('token')+'',
                        },
                    })
                    .then(function (res) {               
                        var item_date = res.data.data[0].attributes.match_date;
                        userMatch.push({match_id: item_match_id, score_a : item_score_a, score_b: item_score_b, date: item_date}) 
                    })
                    //if (new Date(item_date) <= new Date()){item_date = "Terminé"}

                })
            })
            this.prono_list = userMatch
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

        table{
            border-spacing : 0;
            border-collapse : collapse;
            margin-bottom: 20px;
            text-align: left;
            width: 100%;
            tr{
                height: 50px;
                border-bottom: 1px solid rgb(92, 92, 92);
            }

            tbody{
                color: rgb(188, 188, 188);

                .update{
                    text-align: right;
                    
                    svg{                        
                        cursor: pointer;
                        height: 20px;

                        path{
                            fill: rgb(188, 188, 188);
                            transition: all 200ms linear;
                        }
                        

                        &:hover{
                            path{
                                fill:#154EFF;
                            }
                        }
                    }
                }
            }
        }

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