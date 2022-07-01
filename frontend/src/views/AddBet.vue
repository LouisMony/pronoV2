<template>
  <div>
  <form @submit.prevent="submitBet">
        <div class="form">
            <h1>Ajouter un pronostic</h1>
            <select v-model="match_id">
                <option v-for="match in matchs" :key="match" :value="match">{{match}}</option>
            </select>
            <input type="number" v-model="score_A" placeholder="Score Equipe A" />
            <input type="number" v-model="score_B" placeholder="Score Equipe B" />
            <button>Ajouter</button>
        </div>
    </form>
  </div>
</template>

<script>

import {http} from "../assets/js/http-common.js"

export default {
    name: 'AddbetView',

    data(){
        return{
            match_id: "",
            score_A: 0,
            score_B: 0,
            result: "",
            matchs: []
        }
    },
 
    async mounted(){
        await this.GenerateMatchList();
        console.log(this.matchs)
    },

    methods:{
        async GenerateMatchList(){
            var remainingMatch = []
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
                    userMatch.push(item_match_id)
                })
            })

            await http.get('matches', {
                headers: {
                    Authorization:
                    'Bearer '+localStorage.getItem('token')+'',
                },
            })
            .then(function (res) {
                res.data.data.forEach( item => {
                    var item_match_id = item.attributes.match_id;
                    if (!userMatch.includes(item_match_id)){
                        remainingMatch.push(item_match_id)
                    }
                })
            })

            this.matchs = remainingMatch
        },

        submitBet(){
            if(this.score_A > this.score_B){this.result = "A"}
            if(this.score_A === this.score_B){this.result = "N"}
            if(this.score_A < this.score_B){this.result = "B"}

            http.post('pronos', 
            {
                "data":{
                    name: localStorage.getItem('username'),
                    match_id: this.match_id,
                    score_a: this.score_A,
                    score_b: this.score_B,
                    prediction: this.result,
                }
            },
            {
                headers: {
                    Authorization:
                    'Bearer '+localStorage.getItem('token')+'',
                },
            }).then(res => {
                console.log(res.data)
                location.reload()
            })
        }
    }
}
</script>

<style lang="scss" scopped>
.form{
    width: fit-content;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    background: #1B1D23;
    padding: 50px 25px;
    border-radius: 15px;

    h1{
        margin: 0;
    }

    input, select{
        border: solid 1px rgba(255, 255, 255, 0.305);
        width: 300px;
        padding: 10px;
        font-family: 'Poppins';
        background: transparent;
        border-radius: 5px;
        color: white;

        &:focus{
            outline: none;
        }
    }

    select{
        color: white;
        &:focus{
            color: black;
        }
    }

    button{
        font-family: 'Poppins';
        font-weight: bold;
        background: #154EFF;
        border-radius: 5px;
        width: 320px;
        padding: 10px;
        color: white;
        border: none;
        transition: all 200ms linear;
        cursor: pointer;

        &:hover{
            background: #052fae;
        }
    }
}
</style>