<template>
  <div class="home">
        <section class="home_left">
            <span>Match en cours</span>
            <span>Equipe A - Equipe B</span>
            <div class="match">
                <div class="drapeau"></div>
                <span> {{score}}</span>
                <div class="drapeau"></div>
            </div>
            <img src="../assets/img/terrain.png" alt="terrain">

            <span>Cote du match</span>

            <div class="cote">
                <div class="cote_A">1.5</div>
                <div class="cote_N">1.5</div>
                <div class="cote_B">1.5</div>
            </div>

            <div class="prono">
                <ul>
                    <li v-for="item in current_pronos" :key="item.name">
                        <span>{{ item.name }}</span>
                        <span>{{ item.prono }}</span>
                    </li>
                </ul>
            </div>
        </section>
        <section class="home_right"></section>
  </div>
</template>

<script>

import {http} from "../assets/js/http-common.js"

export default {
    
    name: 'HomeVue',

    data(){
        return{ 
          score:'score',
          current_pronos: [] , 
          match: '',
        }
    },

    async mounted(){
        await this.getActualMatch()
        await this.getCurrentPronos()
        await this.getCurrentCote()
    },

    methods:{
        async getActualMatch(){
            
            var score_final = ""
            var current_match = ""

            await http.get('matches?populate=*', {
                headers: {
                    Authorization:
                    'Bearer '+localStorage.getItem('token')+'',
                },
            })
            .then(function (res) {
                var done = false
                var last_match 
                res.data.data.forEach(item => {
                    if (item.attributes.match_finis === false && done === false){
                        last_match = item
                        current_match = item.attributes.match_id
                        done = true
                    }
                })
            var score_A = last_match.attributes.score_a
            var score_B = last_match.attributes.score_b
            score_final = ""+score_A+" - "+score_B+"" 
            })   

            this.match = current_match
            this.score = score_final          
        },

        async getCurrentPronos(){
            var pronoArr = []
            await http.get('pronos?filters[match_id][$eq]='+this.match+'', {
                headers: {
                    Authorization:
                    'Bearer '+localStorage.getItem('token')+'',
                },
            })
            .then(function (res) {
                res.data.data.forEach( item => {
                    var item_name = item.attributes.name;
                    var item_score_a = item.attributes.score_a;
                    var item_score_b = item.attributes.score_b;
                    var item_prediction = item.attributes.prediction
                    var score = ""+item_score_a+" - "+item_score_b+""

                    if (item_prediction === "A"){
                        const obj = {name: item_name, prono: score, prediction: 'A'};
                        pronoArr.push(obj);
                    }
                    else if (item_prediction === "B"){
                        const obj = {name: item_name, prono: score, prediction: 'B'};
                        pronoArr.push(obj);
                    }
                    else if (item_prediction === "N"){
                        const obj = {name: item_name, prono: score, prediction: 'N'};
                        pronoArr.push(obj);
                    }
                    


                })
            })
            this.current_pronos = pronoArr
        },

        getCurrentCote(){
            var prono_lenght = 0
            var prediction_A = 0
            var prediction_B = 0
            var prediction_N = 0
            this.current_pronos.forEach(item => {
                prono_lenght ++ 
                if (item.prediction === "A") {prediction_A++}
                if (item.prediction === "B") {prediction_B++}
                if (item.prediction === "N") {prediction_N++}
            })
            
            var cote_A = 1 + (1 - ((prono_lenght - prediction_A)/prono_lenght))
            var cote_B = 1 + (1 - ((prono_lenght - prediction_B)/prono_lenght))
            var cote_N = 1 + (1 - ((prono_lenght - prediction_N)/prono_lenght))
            
        }
    }
}
</script> 

<style lang="scss" scopped>
    .home{
        position: absolute;
        right: 4%;
        width: 85%;
        height: 88vh;
        background: #1B1D23;
        border-radius: 20px;
        display: flex;
        overflow: hidden;

        .home_left, .home_right{
            width: 50%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 25px;
        }

        .home_left{
            position: relative;
            &:after{
                content:'';
                position: absolute;
                width: 1px;
                height: 80%;
                background: rgba(255, 255, 255, 0.329);
                right: 0;
                top: 6%;
            }
            span{
                &:nth-child(1){
                    color: #878787 ;
                }
                &:nth-child(2){
                    font-weight: bold;
                }
            }

            .match{
                z-index: 10;
                margin-top: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 50px;
                
                span{
                    font-size: 40px;
                }
                .drapeau{
                    height: 134px;
                    background: rgba(31, 31, 31, 0.736);
                    aspect-ratio: 1/1;
                    border-radius: 50%;
                    border: solid 3px white;
                }
            }

            img{
                margin-top: -60px;
                width: 84%;
            }

            .cote{
                margin-top: 10px;
                display: flex;
                justify-content: space-between;
                background: #154EFF;
                height: 40px;
                width: 50%;
                border-radius: 5px;

                div{
                    width: 33%;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    &:nth-child(2){
                        background: #5c84ff;
                    }
                }
            }

            .prono{
                margin-top: 30px;
                width: 84%;
                border-radius: 10px;
                background:  rgba(11, 11, 11, 0.21);
                height: 33%;
                padding: 10px 20px 20px 20px;
                overflow-y: scroll;
                &::-webkit-scrollbar {display: none;}

                ul{
                    margin: 0;
                    padding: 0;
                    list-style-type: none;
                    width: 100%;

                    li{
                        display: flex;
                        justify-content: space-between;
                        align-content: center;
                        padding: 10px 0;
                        border-bottom: 1px solid rgba(255, 255, 255, 0.339);
                    }
                }
            }
        }
    }
</style>
