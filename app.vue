<template>
    <div>
        <div class="header">
            <router-link to="/list" class="header-title">电商网站示例</router-link>
            <div class="header-menu">
                <router-link to="/cart" class="header-menu-cart">
                    购物车
                    <span v-if="cartList.length">{{ cartList.length }}</span>
                </router-link>
            </div>
        </div>
        <!--挂载组件路由-->
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        computed: {
            cartList () {
                return this.$store.state.cartList;
            }
        },
        mounted(){

        }
    }
</script>
