<template>
  <div class="navbar">
    <div class="profil_icon">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--material-symbols" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="#ffffff" d="M12 12q-1.65 0-2.825-1.175Q8 9.65 8 8q0-1.65 1.175-2.825Q10.35 4 12 4q1.65 0 2.825 1.175Q16 6.35 16 8q0 1.65-1.175 2.825Q13.65 12 12 12Zm-8 8v-2.8q0-.85.438-1.563q.437-.712 1.162-1.087q1.55-.775 3.15-1.163Q10.35 13 12 13t3.25.387q1.6.388 3.15 1.163q.725.375 1.162 1.087Q20 16.35 20 17.2V20Z"></path></svg>
    </div>
    <nav>
      <ul>
        <li>
          <router-link to="/homevue">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ph" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 256"><path fill="#ffffff" d="M224 115.5V208a16 16 0 0 1-16 16H48a16 16 0 0 1-16-16v-92.5a16 16 0 0 1 5.2-11.8l80-72.7a16 16 0 0 1 21.6 0l80 72.7a16 16 0 0 1 5.2 11.8Z"></path></svg>
          </router-link>
        </li>
        <li>
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--material-symbols" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="#ffffff" d="M5 21q-.825 0-1.413-.587Q3 19.825 3 19V5q0-.825.587-1.413Q4.175 3 5 3h14q.825 0 1.413.587Q21 4.175 21 5v14q0 .825-.587 1.413Q19.825 21 19 21Zm3-4q.425 0 .713-.288Q9 16.425 9 16t-.287-.713Q8.425 15 8 15t-.713.287Q7 15.575 7 16t.287.712Q7.575 17 8 17Zm0-4q.425 0 .713-.288Q9 12.425 9 12t-.287-.713Q8.425 11 8 11t-.713.287Q7 11.575 7 12t.287.712Q7.575 13 8 13Zm0-4q.425 0 .713-.288Q9 8.425 9 8t-.287-.713Q8.425 7 8 7t-.713.287Q7 7.575 7 8t.287.712Q7.575 9 8 9Zm3 8h6v-2h-6Zm0-4h6v-2h-6Zm0-4h6V7h-6Z"></path></svg>
        </li>
        <li>
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ion" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 512 512"><path fill="#ffffff" d="M320 32H192a32 32 0 0 0-32 32v412a4 4 0 0 0 4 4h184a4 4 0 0 0 4-4V64a32 32 0 0 0-32-32Zm144 160h-72a8 8 0 0 0-8 8v272a8 8 0 0 0 8 8h80a24 24 0 0 0 24-24V224a32 32 0 0 0-32-32ZM48 128a32 32 0 0 0-32 32v296a24 24 0 0 0 24 24h80a8 8 0 0 0 8-8V136a8 8 0 0 0-8-8Z"></path></svg>
        </li>
        <li>
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--material-symbols" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="#ffffff" d="M11 17h2v-4h4v-2h-4V7h-2v4H7v2h4Zm-6 4q-.825 0-1.413-.587Q3 19.825 3 19V5q0-.825.587-1.413Q4.175 3 5 3h14q.825 0 1.413.587Q21 4.175 21 5v14q0 .825-.587 1.413Q19.825 21 19 21Z"></path></svg>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
}
</script>
<style lang="scss" scopped>

.navbar{
    position: absolute;
    width: 7%;
    height: 100vh;
    left: 0px;
    top: 0px;
    background: #1B1D23;
    display: flex;
    align-items: center;
    justify-content: center;

    .profil_icon{
      background: #154EFF;
      border-radius: 400px;
      padding: 5px;
      position: absolute;
      top: 30px;
    }
    nav{
      ul{
        list-style-type: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 50px;

        li{
          cursor: pointer;
          position: relative;

          &::before{
              z-index: 10;
              pointer-events: none;
              content: '';
              border: 1px solid #154EFF;
              width: 60px;
              aspect-ratio: 1/1;
              transform: translate(-50%, -54%) scale(0);
              opacity: 0;
              position: absolute;
              top: 50%;
              left: 50%;
              border-radius: 50%;
              transition: all 200ms ease-out;
          }

          &:hover::before{
            transform: translate(-50%, -54%) scale(1);
            opacity: 1;
          }
          
          svg{
            
            transition: all 200ms linear;
            
            
            path{
              fill:#878787;
              transition: all 200ms linear;
            } 

            &:hover{
              transform: scale(1.1);
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

