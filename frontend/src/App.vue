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

  async mounted(){
    await this.CalculCote()
    await this.CalculScore()
  }, 

  methods: {
      async CalculCote(){
          console.log('start')
            await http.get('matches', {
                headers: {
                    Authorization:
                    'Bearer '+localStorage.getItem('token')+'',
                },
            })
            .then(function (res) {
                res.data.data.forEach(item => {   
                    if (new Date(item.attributes.match_date) >= new Date()){
                      var cote_A = 0 
                      var cote_B = 0
                      var cote_N = 0 

                      var prediction_A = 0
                      var prediction_B = 0
                      var prediction_N = 0

                      var currentMatch = item.attributes.match_id
                      var currentID = item.id
                      http.get('pronos?filters[match_id][$eq]='+currentMatch+'', {
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
                          })
                      }) 

                      .then(function(){
                          var prono_lenght = prediction_A + prediction_B + prediction_N
                          cote_A = 1 + (1 - (prediction_A / prono_lenght))
                          cote_B = 1 + (1 - (prediction_B / prono_lenght))
                          cote_N = 1 + (1 - (prediction_N / prono_lenght))
                      })
                      .then(function(){
                          http.put('matches/'+currentID+'', 
                          {
                            "data": {
                              "cote_a": cote_A,
                              "cote_b": cote_B,
                              "cote_nul": cote_N,
                            }
                          },
                          {
                          headers: {
                              Authorization:
                              'Bearer '+localStorage.getItem('token')+'',
                          },  

                          })
                      })
                    }
                })  
            })
        },

        async CalculScore(){
            await http.get('matches', {
                headers: {
                    Authorization:
                    'Bearer '+localStorage.getItem('token')+'',
                },
            }).then(function(res){
                res.data.data.forEach(item => {
                  //IF PAS TERMINE
                   var match_id = item.attributes.match_id
                   var score_a = item.attributes.score_a
                   var score_b = item.attributes.score_b
                   var cote_a = item.attributes.cote_a
                   var cote_nul = item.attributes.cote_b
                   var cote_b = item.attributes.cote_nul
                   var bonus = item.attributes.match_bonus

                   http.get('pronos?filters[match_id][$eq]='+match_id+'',{
                      headers: {
                          Authorization:
                          'Bearer '+localStorage.getItem('token')+'',
                      },
                   }).then(function(res){
                        res.data.data.forEach(item => {
                          //IF PAS ENCORE COMPTABILIS2
                          var name = item.attributes.name
                          var prono_a = item.attributes.score_a
                          var prono_b = item.attributes.score_b
                          var prediction = item.attributes.prediction 

                          var current_cote = 1
                          var points = 0
                          if (prono_a === score_a && prono_b === score_b){
                              points = 10
                          }
                          else if((prediction === "A" && score_a > score_b) || (prediction === "B" && score_a < score_b) || (prediction === "N" && score_a === score_b)){
                              points = 3
                          }else{
                            points = 0
                          }

                          if(prediction === "A"){current_cote = cote_a}
                          else if(prediction === "B"){current_cote = cote_b}
                          else if(prediction === "N"){current_cote = cote_nul}
                          
                          points = points * current_cote
                          if (bonus === true){points = points * 2}

                          console.log(name, 'a parié', prono_a, ' - ', prono_b, 'et marque', points, "points pour le macth", match_id, 'car il y a eu', score_a, score_b);
                        })

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
