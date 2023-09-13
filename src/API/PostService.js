import axios from "axios";

export default class Post {
    static async getAll(limit = 10, page = 1) {
        const result = {};
        const totalCount = await axios.get('https://jsonplaceholder.typicode.com/posts');
        result.totalCount = totalCount.data.length;
        const data = await axios.get('https://jsonplaceholder.typicode.com/posts', {
            params: {
                _limit: limit,
                _page: page
            }
        });
        result.data = data;
        return result;
    }

    static async getPostById(id) {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/' + id);
        return response;
    }

    
    static async getCommentsByPostId(id) {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
        return response;
    }
}