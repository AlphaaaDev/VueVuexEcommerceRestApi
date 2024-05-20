<template>
    <form v-on:submit.prevent class="modal fade" :id="setting.id" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5">Edit last name</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <input type="text" class="form-control" required name="last_name" v-model="user.last_name"/>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary" v-on:click="editLastName()">Save changes</button>
                </div>
            </div>
        </div>
    </form>
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
