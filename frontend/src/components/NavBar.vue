<template>
  <div class="navbar">
    <span>PRONO APP</span>
    <button>Log in</button>
    <button>Sign up</button>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
}
</script>
<style lang="scss">

.navbar{
    position: absolute;
    width: 100%;
    height: 50px;
    top: 0;
    left: 0;
    background: rgb(40, 40, 40);
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 0 0 0 20px;

    span{
        color: white
    }
}

</style>

