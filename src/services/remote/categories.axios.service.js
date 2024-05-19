import { AxiosService } from "./base/axios.service";

export const CategoriesAxiosService = {
    fetchAll() {
        return AxiosService.get('/categories');
    },

    create(category) {
        const formData = new FormData();
        formData.append('name', category.name);
        formData.append('description', category.description);
        const images = category.images;

        for (let i = 0; images != null && i < images.length; i++) {
            formData.append('images[]', images[i], images[i].name);
        }
        return AxiosService.post(`/categories`, formData);
    },

    delete(id) {
        return AxiosService.delete(`/categories/${id}`);
    },

    patch(category) {
        const formData = new FormData();
        formData.append('id', category.id)
        if (category.name) formData.append('name', category.name);
        if (category.description) formData.append('description', category.description);
        const images = category.images;

        for (let i = 0; images != null && i < images.length; i++) {
            formData.append('images[]', images[i], images[i].name);
        }
        return AxiosService.patch(`/categories`, formData);
    }
};