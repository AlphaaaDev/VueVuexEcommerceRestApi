import { AxiosService } from "./base/axios.service";

export const ProductsAxiosService = {
    fetchAll() {
        return AxiosService.get('/products');
    },

    fetchBySlug(slug) {
        if (typeof slug !== "string") {
            throw new Error(
                "Slug must be a string"
            );
        }
        return AxiosService.get(`/products/${slug}`);
    },

    fetchAllByCategory(category) {
        if (typeof category !== "string") {
            throw new Error(
                "Slug must be a string"
            );
        }
        return AxiosService.get(`/categories/${category}`);
    },

    create(product) {
        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('description', product.description);
        formData.append('stock', product.stock);
        formData.append('price', product.price);
        formData.append('category', product.category);
        const images = product.images;

        for (let i = 0; images != null && i < images.length; i++) {
            formData.append('images[]', images[i], images[i].name);
        }
        return AxiosService.post(`/products`, formData);
    },

    delete(id) {
        return AxiosService.delete(`/products/${id}`);
    },

    patch(product) {
        const formData = new FormData();
        formData.append('id', product.id)
        if (product.name) formData.append('name', product.name);
        if (product.description) formData.append('description', product.description);
        if (product.stock) formData.append('stock', product.stock);
        if (product.price) formData.append('price', product.price);
        if (product.category) formData.append('category', product.category);
        const images = product.images;

        for (let i = 0; images != null && i < images.length; i++) {
            formData.append('images[]', images[i], images[i].name);
        }
        return AxiosService.patch(`/products`, formData);
    }
};