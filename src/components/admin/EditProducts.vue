<template>
    <div class="container-fluid d-flex flex-row flex-wrap justify-content-center" style="gap: 30px;">
        <template>
            <div class="card" style="width: 250px; height: 250px;">
                <button type="button" class="btn btn-link w-100 h-100" data-bs-toggle="modal" data-bs-target="#createProduct"><span class="bi bi-plus fs-1"></span></button>
            </div>
            <div v-for="(product, index) in this.getProducts"
                :key="index"
                :id="product.id">
                <div class="card" style="width: 250px;">
                    <img class="card-img-top d-block" style="height: 250px; object-fit: contain;"
                        :src="product.image_urls && product.image_urls.length > 0 ? `http://localhost:8080${product.image_urls[0]}` : 'https://vuejs.org/images/logo.png'"
                        alt=""/>
                    <div class="card-body">
                        <h4 class="card-title">{{ product.name }}</h4>
                    </div>
                    <div class="card-footer">
                        <p>Price: <b>{{ product.price }} $</b></p>
                        <p>Stock: <b>{{ product.stock }}</b></p>
                    </div>
                    <div class="card-footer">
                        <button type="button" class="btn btn-danger me-2" data-bs-toggle="modal" data-bs-target="#deleteProduct" @click="saveProductId(product.id)">Delete</button>
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editProduct" @click="loadEditProduct(product.id)">Edit</button>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="deleteProduct" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5">Are you sure you want to delete this product?</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-danger" @click="onDeleteProduct()">Delete</button>
                        </div>
                    </div>
                </div>
            </div>

            <form v-on:submit.prevent>
                <div class="modal fade" id="createProduct" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5">Create new product</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="form-group">
                                    <label for="title">Name</label>
                                    <input type="text" class="form-control" id="title" required name="title" v-model="product.name"/>
                                </div>

                                <div class="form-group">
                                    <label>Description <button type="button" class="btn badge text-bg-info" @click="generateDescription()">Generate</button></label>
                                    <ckeditor :editor="editor" v-model="product.description" :config="editorConfig"></ckeditor>
                                </div>

                                <div class="form-group w-25">
                                    <label for="price">Price</label>
                                    <input type="number" class="form-control" id="price"
                                        placeholder="0" step="any"
                                        v-model="product.price"/>
                                </div>

                                <div class="form-group w-25">
                                    <label for="stock">Stock</label>
                                    <input type="number" class="form-control"
                                        id="stock" placeholder="1" step="1"
                                        v-model="product.stock"/>
                                </div>

                                <div class="form-group">
                                    <label for="stock">Images</label>
                                    <input class="form-control" id="create_files" ref="createFile" name="create_files" type="file" multiple/>
                                </div>

                                <div class="form-group">
                                    <label for="category">Category</label>
                                    <select class="form-select" name="category" id="category" v-model="product.category">
                                        <option value="0"></option>

                                        <option :value="category.id" v-for="(category,index) in this.getCategories">{{ category.name }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" class="btn btn-primary" v-on:click="onCreateProduct()">Create</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            <div class="modal fade" id="editProduct" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5">Edit product</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="dismissEditProduct()"></button>
                        </div>
                        <div class="modal-body">
                            <form v-on:submit.prevent>
                                <div class="form-group">
                                    <label for="title">Name</label>
                                    <input type="text" class="form-control" id="title" required name="title" v-model="product.name"/>
                                </div>

                                <div class="form-group">
                                    <label>Description <button type="button" class="btn badge text-bg-info" @click="generateDescription()">Generate</button></label>
                                    <ckeditor :editor="editor" v-model="product.description" :config="editorConfig"></ckeditor>
                                </div>

                                <div class="form-group w-25">
                                    <label for="price">Price</label>
                                    <input type="number" class="form-control" id="price"
                                        placeholder="0" step="any"
                                        v-model="product.price"/>
                                </div>

                                <div class="form-group w-25">
                                    <label for="stock">Stock</label>
                                    <input type="number" class="form-control"
                                        id="stock" placeholder="1" step="1"
                                        v-model="product.stock"/>
                                </div>

                                <div class="form-group">
                                    <label for="stock">Images</label>
                                    <input class="form-control" id="p_files" ref="inputFile" name="p_files" type="file" multiple/>
                                </div>

                                <div class="form-group">
                                    <label for="category">Category</label>
                                    <select class="form-select" name="category" id="category" v-model="product.category">
                                        <option value="0"></option>

                                        <option :value="category.id" v-for="(category,index) in this.getCategories">{{ category.name }}</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="dismissEditProduct()">Close</button>
                            <button type="submit" class="btn btn-primary" @click="onEditProduct()">Edit</button>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from "vuex";
    import { ProductAction, CategoryAction } from "@/store/types.actions";
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
    import { AIProvider } from '@/services/aiprovider';

    export default {
        name: 'EditProducts',
        computed: {
            ...mapGetters("products", ['getProducts']),
            ...mapGetters('categories', ['getCategories'])
        },
        props: ['products', 'categories'],
        mounted() {
            this.fetchProducts();
            this.fetchCategories();
        },
        methods: {
            ...mapActions('products', {
                fetchProducts: ProductAction.remote.FETCH_ALL,
                deleteProduct: ProductAction.remote.DELETE,
                createProduct: ProductAction.remote.CREATE,
                patchProduct: ProductAction.remote.PATCH
            }),
            ...mapActions('categories', {
                fetchCategories: CategoryAction.remote.FETCH_ALL
            }),

            saveProductId(id) {
                this.product.id = id;
            },

            loadEditProduct(id) {
                this.saveProductId(id);

                var product = this.getProducts.filter(function(entry) {
                    return entry.id === id;
                })[0];

                this.product.name = product.name;
                this.product.description = product.description;
                this.product.price = product.price;
                this.product.stock = product.stock;
                if (product.category) this.product.category = product.category.id;
            },

            onDeleteProduct() {
                this.deleteProduct(this.product.id).then(res => {
                    this.$router.go();
                }).catch(err => {
                    console.error(err);
                });
            },

            onCreateProduct() {
                this.product.images = this.$refs.createFile.files;
                this.createProduct(this.product).then(res => {
                    this.$router.go();
                }).catch(err => {
                    console.error(err);
                });
            },

            onEditProduct() {
                const id = this.product.id;
                var oldProduct = this.getProducts.filter(function(entry) {
                    return entry.id === id;
                })[0];
                if (!oldProduct.category) oldProduct.category = { id: 0 }; 

                var product = { id: id };
                if (oldProduct.name !== this.product.name) product.name = this.product.name;
                if (oldProduct.description !== this.product.description) product.description = this.product.description;
                if (oldProduct.price !== this.product.price) product.price = this.product.price;
                if (oldProduct.stock !== this.product.stock) product.stock = this.product.stock;
                if (oldProduct.category.id !== this.product.category) product.category = this.product.category;
                if (this.$refs.inputFile.files.length > 0) product.images = this.$refs.inputFile.files;

                this.patchProduct(product).then(res => {
                    this.$router.go();
                }).catch(err => {
                    console.error(err);
                });
            },

            dismissEditProduct() {
                this.product.id = 0;
                this.product.name = '';
                this.product.description = '';
                this.product.price = 1;
                this.product.stock = 1;
                this.product.category = 0
            },

            generateDescription() {
                AIProvider.generateProductDescription(this.product.name).then(response => {
                    this.product.description = response;
                });
            }
        },
        data() {
            return {
                product: { 
                    id: 0, name: '', description: '', price: 1, stock: 1, category: 0
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
