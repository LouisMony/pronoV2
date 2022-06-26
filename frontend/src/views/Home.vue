<template>
  <div class="home">
        <section class="home_left">
            <span>Match en cours</span>
            <span>Equipe A - Equipe B</span>
            <div class="match">
                <div class="drapeau"></div>
                <span>1 - 0</span>
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
            </div>
        </section>
        <section class="home_right"></section>
  </div>
</template>

<script>

export default {
  name: 'HomeVue',
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
                height: 37%;
            }
        }
    }
</style>
