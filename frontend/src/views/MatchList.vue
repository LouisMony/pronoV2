<template>
  <div>
    <div class="matchs">
        <h1>Touts les matchs</h1>

        <table>
            <thead>
                <tr>
                    <th>Match</th>
                    <th>Score A</th>
                    <th>Score B</th>
                    <th>Bonus</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="match in all_matchs" :key="match">
                    <td>{{match.match_id}}</td>
                    <td>{{match.score_a}}</td>
                    <td>{{match.score_b}}</td>
                    <td> 
                        <span v-if="match.bonus === true"> OUI </span>
                        <span v-else> NON</span>
                    </td>
                    <td>{{match.date}}</td>
                </tr>
            </tbody>
        </table>
    </div>
  </div>
</template>

<script>

import {http} from "../assets/js/http-common.js"

export default {
  name: 'MatchView',

    data(){
        return{
            all_matchs: []
        }
    },
    
    mounted(){
        this.getAllMatchs()
    },
    methods:{
        async getAllMatchs(){
            var matchArr = []
            await http.get('matches', {
                headers: {
                    Authorization:
                    'Bearer '+localStorage.getItem('token')+'',
                },
            })
            .then(function (res) {
                const today = new Date();

                res.data.data.forEach( item => {
                    var item_match_id = item.attributes.match_id;
                    var item_score_a = item.attributes.score_a;
                    var item_score_b = item.attributes.score_b;
                    var item_bonus = item.attributes.match_bonus;
                    var item_date = item.attributes.match_date;
                

                    if (new Date(item_date) <= new Date()){item_date = "Terminé"}
                    

                    matchArr.push(
                        {
                            match_id: item_match_id, 
                            score_a: item_score_a, 
                            score_b: item_score_b, 
                            bonus: item_bonus,
                            date: item_date,
                        }
                    )
                })
            })
            console.log(matchArr);
            this.all_matchs = matchArr;
        },
    }
}
</script>

<style lang="scss" scopped>
.matchs{
    width: 80%;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    background: #1B1D23;
    padding: 50px 25px;
    border-radius: 15px;

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
}
</style>