<template>
    <div class="container-fluid">
        <app-carousel :items="this.categories"></app-carousel>
        <div style="margin: 100px 0px">
            <div class="d-flex flex-row flex-wrap justify-content-center" style="gap: 30px;">
                <template v-if="this.categories.length > 0">
                    <div v-for="(item, index) in this.categories"
                        :key="index"
                        :id="item.id">
                        <router-link :to="`/categories/${item.slug}`">
                            <div class="card" style="width: 250px;">
                                <img class="card-img-top d-block" style="height: 250px; object-fit: contain;"
                                    :src="[item.image ? `http://localhost:8080${item.image}` : 'https://vuejs.org/images/logo.png']"
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
    import { PagesAction } from "@/store/types.actions";
    import AppCarousel from "@/components/shared/AppCarousel";

    export default {
        name: "Home",
        data() {
            return {
                "categories": []
            };
        },
        components: {
            AppCarousel,
        },
        computed: {
            ...mapGetters("pages", ['getCategories']),
        },

        props: ['products'],

        mounted() {
            this.fetchHome().then(result => {
                const items = this.getCategories;
                items.forEach((item, index) => {
                    this.categories.push({
                        id: item.id,
                        name: item.name,
                        slug: item.slug,
                        description: item.description,
                        image: item.image_urls[0]
                    });
                });
            }).catch(err => {
                throw err;
            });
        },
        methods: {
            ...mapActions('pages', { fetchHome: PagesAction.remote.FETCH_HOME })
        }
    }
</script>