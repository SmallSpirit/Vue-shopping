// 作为入口文件
//导入Vue框架
import Vue from "vue";
import VueRouter from "vue-router";
import Routers from "./router";
import Vuex from "vuex";
//导入app.vue组件
import App from "./app.vue";
import "./style.css";
Vue.use(VueRouter);
Vue.use(Vuex);
//导入数据
import product_data from "./product.js";
//路由配置
const RouterConfig = {
    //使用html5的History路由模式
    mode:"history",
    routes:Routers
};
const router = new VueRouter(RouterConfig);
router.beforeEach((to,from,next) => {
    window.document.title = to.meta.title;
    next();
});
router.afterEach((to,from,next)=>{
    window.scrollTo(0,0);
})
//按照品牌颜色筛选
//数组排重
function getFilterArray(array) {
    const res = [];
    const json = {};
    for (let i = 0; i < array.length; i++) {
        const _self = array[i];
        if(!json[_self]){
            res.push(_self)
            json[_self] = 1;
        }
    }
    return res;
}
const store = new Vuex.Store({
    state:{
    //    商品列表数据
        productList:[],
    //    购物车数据
        cartList:[]
    },
    //计算属性
    getters:{
        brands(state){
            const brands = state.productList.map(item => item.brand);
            return getFilterArray(brands);
        },
        colors(state){
            const colors = state.productList.map(item => item.color);
            return getFilterArray(colors);
        }
    },
    mutations:{
    //    添加商品列表
        setProductList:(state,data)=>{
            state.productList = data;
        },
        addCart(state,id){
            //判断购物车是否已有，如果有，数量+1
            const isAdded = state.cartList.find(item => item.id === id);
            if(isAdded){
                isAdded.count ++;
            }else{
                state.cartList.push({
                    id:id,
                    count:1
                })
            };
        },
        editCartCount(state,payload){
            //修改商品数量
            const product = state.cartList.find(item => item.id === payload.id);
            product.count += payload.count;
        },
        //删除商品
        deleteCart(state,id){
            const index = state.cartList.findIndex(item => item.id === id);
            state.cartList.splice(index,1)
        },
    //    清空购物车
        emptyCart(state){
            state.cartList = [];
        }
    },
    //异步中转
    actions:{
    //    请求商品列表
        getProductList(context){
            setTimeout(()=>{
                context.commit("setProductList",product_data)
            },500)
        },
        buy(context){
            return new Promise(resolve =>{
                setTimeout(()=>{
                    context.commit("emptyCart");
                    resolve();
                },500)
            })
        }
    }
})
//创建Vue根实例
new Vue({
    el:"#app",
    router:router,
    store:store,
    render:(createElement) =>  {
        return createElement(App)
    },

    mounted(){

    }
})
/*document.getElementById("app").innerHTML = "我是中国人";
import "./style.css"*/
