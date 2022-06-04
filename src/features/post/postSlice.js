import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {

};

export const getPosts = createAsyncThunk (
    'posts/getPosts',
    async (_, {rejectWithValue, dispatch}) => {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
        dispatch(setPosts(response.data))
    }
);

export const deletePostsById = createAsyncThunk (
    'posts/deletePostsById',
    async (id, {rejectWithValue, dispatch}) => {
        await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
        dispatch(deletePost(id))
    }
);

export const postSlice = createSlice ({
    name: 'posts',
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload;
        },
        deletePost: (state, action) => {
            state.posts = state.posts.filter((post) => post.id !== action.payload)
        }
    },
    extraReducers: {
        [getPosts.pending]: () => console.log('getPosts.pending'),
        [getPosts.fulfilled]: () => console.log('getPosts.fulfilled'),
        [getPosts.rejected]: () => console.log('getPosts.rejected'),

        [deletePostsById.pending]: () => console.log('deletePostsById.pending'),
        [deletePostsById.fulfilled]: () => console.log('deletePostsById.fulfilled'),
        [deletePostsById.rejected]: () => console.log('deletePostsById.rejected')
    }
});

export const {setPosts, deletePost} = postSlice.actions;
export default postSlice.reducer;