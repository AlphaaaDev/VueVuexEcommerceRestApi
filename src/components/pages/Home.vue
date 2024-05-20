<template>
    <div class="container-fluid">
        <app-carousel :items="this.getCategories"></app-carousel>
        <div style="margin: 100px 0px">
            <div class="d-flex flex-row flex-wrap justify-content-center" style="gap: 30px;">
                <template v-if="this.getCategories.length > 0">
                    <div v-for="(item, index) in this.getCategories"
                        :key="index"
                        :id="item.id">
                        <router-link :to="`/categories/${item.slug}`">
                            <div class="card" style="width: 250px;">
                                <img class="card-img-top d-block" style="height: 250px; object-fit: contain;"
                                    :src="[item.image_urls && item.image_urls.length > 0 ? `http://localhost:8080${item.image_urls[0]}` : 'https://vuejs.org/images/logo.png']"
                                    alt=""/>
                                <div class="card-body">
                                    <h4 class="card-title">{{item.name}}</h4>
                                </div>
                            </div>
                        </router-link>
                    </div>
                </template>
                <template v-else>
                    Homepage empty, no categories were found.
                </template>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import { CategoryAction } from "@/store/types.actions";
    import AppCarousel from "@/components/shared/AppCarousel";

    export default {
        name: "Home",
        components: {
            AppCarousel
        },
        props: ['categories'],
        computed: {
            ...mapGetters("categories", ['getCategories'])
        },
        methods: {
            ...mapActions('categories', { fetchCategories: CategoryAction.remote.FETCH_ALL })
        },
        mounted() {
            this.fetchCategories();
        }
    }
</script>