<template>
  <div class="home">
        <section class="home_left">
            <span>Match en cours :</span>
            <span>{{match}}</span>
            <div class="match">
                <div class="drapeau" v-bind:style="{ backgroundImage: 'url(' + drapeau_A + ')' }"> </div>
                <span>{{score}}</span>
                <div class="drapeau" v-bind:style="{ backgroundImage: 'url(' + drapeau_B + ')' }"> </div>
            </div>
            <img src="../assets/img/terrain.png" alt="terrain">

            <span>Cote du match</span>

            <div class="cote">
                <div class="cote_A">{{cote_A}}</div>
                <div class="cote_N">{{cote_Nul}}</div>
                <div class="cote_B">{{cote_B}}</div>
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
        <section class="home_right">
                <span> 🏆 Podium </span>
                <div class="podium">
                    <ul v-for="rang in classement" :key="rang">
                        <li><span>{{rang.username}}</span> {{rang.total_score}}</li>
                    </ul>
                </div>
                <span> 🏆 Podium Seum (par points)</span>
                <div class="podium">
                    <ul v-for="rang in classement" :key="rang">
                        <li><span>{{rang.username}}</span> {{rang.total_seum}}</li>
                    </ul>
                </div>
                <span> 🏆 Podium Seum (par coef)</span>
                <div class="podium">
                    <ul v-for="rang in classement" :key="rang">
                        <li><span>{{rang.username}}</span> {{rang.coef_seum}}</li>
                    </ul>
                </div>

               <router-link to='/classement'>
                    <span class="button">Voir les classements</span>
               </router-link>
        </section>
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
            cote_A: 0,
            cote_B: 0,
            cote_Nul: 0,
            drapeau_A: "",
            drapeau_B: "",

            classement:[],
        }
    },

    async mounted(){
        await this.getActualMatch()
        await this.getCurrentPronos()
        await this.getCurrentClassement()
    },

    methods:{
        async getActualMatch(){
            
            var score_final = ""
            var current_match = ""
            var cote_a = 0
            var cote_b = 0
            var cote_nul = 0
            var drap_A = ""
            var drap_B = ""

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
            cote_a = last_match.attributes.cote_a
            cote_b = last_match.attributes.cote_b
            cote_nul = last_match.attributes.cote_nul
            drap_A = "http://localhost:1337"+last_match.attributes.drapeau_equipe_a.data.attributes.formats.thumbnail.url
            drap_B = "http://localhost:1337"+last_match.attributes.drapeau_equipe_b.data.attributes.formats.thumbnail.url

            })   

            this.cote_A = Math.round(cote_a * 10) / 10
            this.cote_B = Math.round(cote_b * 10) / 10
            this.cote_Nul = Math.round(cote_nul * 10) / 10
            this.drapeau_A = drap_A
            this.drapeau_B = drap_B
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

        async getCurrentClassement(){
            var UsersArr = []
            await http.get('users', {
                headers: {
                    Authorization:
                    'Bearer '+localStorage.getItem('token')+'',
                },
            })
            .then((res) => {
                console.log(res.data);
                res.data.forEach(item => {
                    UsersArr.push({
                        username: item.username, 
                        total_score: item.total_score, 
                        total_seum: item.total_seum, 
                        coef_seum: item.coef_seum
                    })
                });

                UsersArr.sort(function compare(a, b) {
                    if (a.total_score < b.total_score)
                        return 1;
                    if (a.total_score > b.total_score )
                        return -1;
                    return 0;
                });

                this.classement = UsersArr;
            })
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
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: cover;
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
        .home_right{
            span{
                font-weight: bold;
            }
            .podium{
                padding: 20px 0;
                margin: 20px 0 40px;
                border-bottom: 1px solid rgb(73, 73, 73);;
                ul{
                    margin: 0;
                    padding: 0;
                    list-style-type: none;
                    display: flex;
                    gap: 20px;
                    font-size: 20px;
                    color: rgb(217, 217, 217);

                    li{
                        span{
                            font-weight: bold;
                        }
                    }
                }
            }
            .button{
                color: white;
                background-color: #154EFF;
                padding: 10px;
                border-radius: 3px;
                cursor: pointer;
                font-weight: normal;
                font-size: 14px;
                text-decoration: none;
                transition: all 200ms linear;

                &:hover{
                    background: #052fae;
                }
            }
        }
    }
</style>
