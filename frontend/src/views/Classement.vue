<template>
  <div>
    <div class="classement">
        <h1>Classement</h1>

        <table>
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Point</th>
                    <th>Point Seum</th>
                    <th>Taux de Seum</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    </div>
  </div>
</template>

<script>

import {http} from "../assets/js/http-common.js"

export default {
  name: 'ClassementView',

    data(){
        return{
            classement:[]
        }
    },
    
    mounted(){
        this.getUsers()
    },
    methods:{
        async getUsers(){
            var UsersArr = []
            await http.get('users', {
                headers: {
                    Authorization:
                    'Bearer '+localStorage.getItem('token')+'',
                },
            })
            .then(function (res) {
                console.log(res.data.data);
            })
            this.classement = UsersArr;
        }

    }
        
}
</script>

<style lang="scss" scopped>
.classement{
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