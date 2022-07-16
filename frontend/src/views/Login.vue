<template>
  <div>
  <form @submit.prevent="submitForm">
        <div class="form">
            <h1>Me connecter</h1>
            <input type="text" v-model="username" placeholder="Email" />
            <input type="password" v-model="password" placeholder="Mot de passe"/>
            <button>Suivant</button>
            <router-link class="redirect" to="/signup">Je n'ai pas encore de compte</router-link>
        </div>
    </form>
  </div>
</template>

<script>

import {http} from "../assets/js/http-common.js"

export default {
  name: 'LoginView',

  data(){
      return{
          username: "",
          password:"",
      }
  },
 
    mounted(){
        if(localStorage.getItem('username') !== null){
            this.$router.replace('/homevue')
        }
    },
    methods:{
        submitForm(){
            http.post('auth/local', {
                identifier: this.username,
                password: this.password
            }).then(res => {
                console.log(res.data)
                localStorage.setItem('token', res.data.jwt)
                localStorage.setItem('id', res.data.user.id)
                localStorage.setItem('username', res.data.user.username)
                if(localStorage.getItem('username') !== null){
                    this.$router.replace('/homevue')
                }
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