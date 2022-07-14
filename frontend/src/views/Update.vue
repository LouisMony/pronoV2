<template>
  <div>
  <form @submit.prevent="submitForm">
        <div class="form">
            <h1>{{$route.params.id}}</h1>
            <input type="number" v-model="score_a" placeholder="Score Equipe A" />
            <input type="number" v-model="score_b" placeholder="Score Equipe B"/>
            <button>Valider</button>
        </div>
    </form>
  </div>
</template>

<script>

import {http} from "../assets/js/http-common.js"

export default {
  name: 'UpdateView',

  data(){
      return{
          score_a: "",
          score_b:"",
          result: "",
      }
  },
 
    mounted(){
    },
    methods:{
        submitForm(){
            if(this.score_a > this.score_b){this.result = "A"}
            if(this.score_a === this.score_b){this.result = "N"}
            if(this.score_a < this.score_b){this.result = "B"}
            var this_ = this

            http.get('pronos?filters[match_id][$eq]='+this.$route.params.id+'&filters[name][$eq]='+localStorage.getItem('username')+'',{
                headers: {
                    Authorization:
                    'Bearer '+localStorage.getItem('token')+'',
                },
            }).then(function(res){
                http.put('pronos/'+res.data.data[0].id+'',
                {
                    "data":{
                        score_a: this_.score_a,
                        score_b: this_.score_b,
                        prediction: this_.result,
                    }
                },
                {
                    headers: {
                        Authorization:
                        'Bearer '+localStorage.getItem('token')+'',
                    },
                }).then(res => {
                    console.log(res.data)
                    this_.$router.push({ path: '/myprofil'})
                })
            }).then(
               
            )
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

    input{
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

    .redirect{
        color: rgb(151, 151, 151);
        font-size: 12px;
    }
}
</style>