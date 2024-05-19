<template>

    <carousel :loop="true" :autoplay="true" class="w-50 mx-auto">
        <slide v-for="(item,index) in items" :key="index">
            <!--<img class="d-block w-100" :src="item.image" alt="Cool image"/>-->
            <img class="d-block w-100" style=" height:500px; object-fit: contain;" :src="item.image ? `http://localhost:8080${item.image}` : 'https://vuejs.org/images/logo.png'" alt="Cool image"/>
        </slide>
    </carousel>

</template>

<script>
    export default {
        name: "AppCarousel",
        props: ['items']
    }
</script>

<style scoped>
    /*div {
        background-color: white;
    }*/
</style>
