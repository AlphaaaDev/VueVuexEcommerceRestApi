<template>
    <div class="container-fluid d-flex flex-row flex-wrap justify-content-center" style="gap: 30px;">
        <template>
            <div class="card" style="width: 250px; height: 250px;">
                <button type="button" class="btn btn-link w-100 h-100" data-bs-toggle="modal" data-bs-target="#createCategory"><span class="bi bi-plus fs-1"></span></button>
            </div>
            <div v-for="(category, index) in this.getCategories"
                :key="index"
                :id="category.id">
                <div class="card" style="width: 250px;">
                    <img class="card-img-top d-block" style="height: 250px; object-fit: contain;"
                        :src="category.image_urls && category.image_urls.length > 0 ? `http://localhost:8080${category.image_urls[0]}` : 'https://vuejs.org/images/logo.png'"
                        alt=""/>
                    <div class="card-body">
                        <h4 class="card-title">{{ category.name }}</h4>
                    </div>
                    <div class="card-footer">
                        <button type="button" class="btn btn-danger me-2" data-bs-toggle="modal" data-bs-target="#deleteCategory" @click="saveCategoryId(category.id)">Delete</button>
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editCategory" @click="loadEditCategory(category.id)">Edit</button>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="deleteCategory" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5">Are you sure you want to delete this category?</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-danger" @click="onDeleteCategory()">Delete</button>
                        </div>
                    </div>
                </div>
            </div>

            <form v-on:submit.prevent>
                <div class="modal fade" id="createCategory" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5">Create new category</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                    <div class="form-group">
                                        <label for="title">Name</label>
                                        <input type="text" class="form-control" id="title" required name="title" v-model="category.name"/>
                                    </div>

                                    <div class="form-group">
                                        <label>Description <button type="button" class="btn badge text-bg-info" @click="generateDescription()">Generate</button></label>
                                        <ckeditor :editor="editor" v-model="category.description" :config="editorConfig"></ckeditor>
                                    </div>

                                    <div class="form-group">
                                        <label for="stock">Images</label>
                                        <input class="form-control" id="create_files" ref="createFile" name="create_files" type="file" multiple/>
                                    </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" class="btn btn-primary" v-on:click="onCreateCategory()">Create</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            <div class="modal fade" id="editCategory" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5">Edit category</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="dismissEditCategory()"></button>
                        </div>
                        <div class="modal-body">
                            <form v-on:submit.prevent>
                                <div class="form-group">
                                    <label for="title">Name</label>
                                    <input type="text" class="form-control" id="title" required name="title" v-model="category.name"/>
                                </div>

                                <div class="form-group">
                                    <label>Description <button type="button" class="btn badge text-bg-info" @click="generateDescription()">Generate</button></label>
                                    <ckeditor :editor="editor" v-model="category.description" :config="editorConfig"></ckeditor>
                                </div>

                                <div class="form-group">
                                    <label for="stock">Images</label>
                                    <input class="form-control" id="p_files" ref="inputFile" name="p_files" type="file" multiple/>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="dismissEditCategory()">Close</button>
                            <button type="submit" class="btn btn-primary" @click="onEditCategory()">Edit</button>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from "vuex";
    import { CategoryAction } from "@/store/types.actions";
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
    import { AIProvider } from '@/services/aiprovider';

    export default {
        name: 'EditCategories',
        computed: {
            ...mapGetters("categories", ['getCategories']),
        },
        props: ['categories'],
        mounted() {
            this.fetchCategories();
        },
        methods: {
            ...mapActions('categories', {
                fetchCategories: CategoryAction.remote.FETCH_ALL,
                deleteCategory: CategoryAction.remote.DELETE,
                createCategory: CategoryAction.remote.CREATE,
                patchCategory: CategoryAction.remote.PATCH
            }),

            saveCategoryId(id) {
                this.category.id = id;
            },

            loadEditCategory(id) {
                this.saveCategoryId(id);

                var category = this.getCategories.filter(function(entry) {
                    return entry.id === id;
                })[0];

                this.category.name = category.name;
                this.category.description = category.description;
            },

            onDeleteCategory() {
                this.deleteCategory(this.category.id).then(res => {
                    this.$router.go();
                }).catch(err => {
                    console.error(err);
                });
            },

            onCreateCategory() {
                this.category.images = this.$refs.createFile.files;
                this.createCategory(this.category).then(res => {
                    this.$router.go();
                }).catch(err => {
                    console.error(err);
                });
            },

            onEditCategory() {
                const id = this.category.id;
                var oldCategory = this.getCategories.filter(function(entry) {
                    return entry.id === id;
                })[0];

                var category = { id: id };
                if (oldCategory.name !== this.category.name) category.name = this.category.name;
                if (oldCategory.description !== this.category.description) category.description = this.category.description;
                if (this.$refs.inputFile.files.length > 0) category.images = this.$refs.inputFile.files;

                this.patchCategory(category).then(res => {
                    this.$router.go();
                }).catch(err => {
                    console.error(err);
                });
            },

            dismissEditCategory() {
                this.category.id = 0;
                this.category.name = '';
                this.category.description = '';
            },

            generateDescription() {
                AIProvider.generateCategoryDescription(this.category.name).then(response => {
                    this.category.description = response;
                });
            }
        },
        data() {
            return {
                category: { 
                    id: 0, name: '', description: ''
                },
                editor: ClassicEditor,
                editorConfig: {
                    // The configuration of the editor.
                    removePlugins: ['ImageToolbar', 'ImageUpload', 'MediaEmbed']
                },
            }
        }
    };
</script>
