import http from '../http-common';

export default class RestauranDataService{
    getAll(page=0){
        return http.get(`?page=${page}`);
    }

    get(id){
        return http.post(`/id/${id}`);
    }

    find(query,by="name",page=0){
        return http.get(`?${by}=${query}&page=${page}`);
    }

    createReview(data){
        return http.post("/review",data);
    }

    updateReview(data){
        return http.put("/review",data);
    }

    deletReview(id){
        return http.delete(`/review?id=${id}`);
    }

    getCuisines(){
        return http.get(`/cuisines`);
    }
}