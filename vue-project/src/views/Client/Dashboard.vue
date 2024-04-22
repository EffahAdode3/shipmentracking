<template>
    <div>
        <component :is="Nav"></component>
        <component :is="Sidebar"></component>
       <component :is="Content"></component>
    </div>
</template>
<script>
import Nav from '../../components/Client/Nav.vue'
import Sidebar from '../../components/Client/Sidebar.vue'
import Content from '../../components/Client/Content.vue'
export default{
    components:{
        Nav,
        Content,
        Sidebar,
    },
    data(){
        return{
           Nav,
           Content,
           Sidebar
        }
    }
}
</script>
<style lang="css" scoped>
</style>