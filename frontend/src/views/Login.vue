<template>
  <div>
  <form @submit.prevent="submitForm">
        <div class="form">
            <h1>Login</h1>
            <input type="text" v-model="username" placeholder="Email" />
            <input type="password" v-model="password" placeholder="mot de passe"/>
            <button>Submit</button>
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
            this.$router.replace('/home')
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
                localStorage.setItem('username', res.data.user.username)
                if(localStorage.getItem('username') !== null){
                    this.$router.replace('/home')
                }
                })
        }
    }
}
</script>