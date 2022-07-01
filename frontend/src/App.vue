<template>
  <div id="app">
    <div>
      <NavBar/>
    </div>
    
    <router-view/>
  </div>
</template>

<script>

import {http} from "./assets/js/http-common.js"
import NavBar from '@/components/NavBar.vue'

export default {
  name: 'App',
  components: {
    NavBar
  },

  mounted(){
    console.log('strat')
    this.CalculCote()
  }, 

  methods: {
      async CalculCote(){
            await http.get('matches', {
                headers: {
                    Authorization:
                    'Bearer '+localStorage.getItem('token')+'',
                },
            })
            .then(function (res) {
                res.data.data.forEach(item => {   
                    var prediction_A = 0
                    var prediction_B = 0
                    var prediction_N = 0

                    http.get('pronos?filters[match_id][$eq]='+item.attributes.match_id+'', {
                        headers: {
                            Authorization:
                            'Bearer '+localStorage.getItem('token')+'',
                        },
                    })
                    .then(function (res) {
                        res.data.data.forEach( item => {
                            var item_prediction = item.attributes.prediction;
                            if (item_prediction === "A"){prediction_A++}
                            if (item_prediction === "B"){prediction_B++}
                            if (item_prediction === "N"){prediction_N++}
                            console.log(item_prediction);
                        })
                    })
                    .then(function(){
                      console.log(prediction_A, prediction_B, prediction_N);
                    })
                })
                
                
            })
        },

    }
}
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;900&display=swap');

body {
  font-family: 'Poppins', sans-serif;
  margin-top:60px;
  background: #0F0F0F;
  color: white;

}
</style>
