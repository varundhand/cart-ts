import { configureStore } from '@reduxjs/toolkit'
import productsReducer from '../features/products/productsSlice'
// ...

export const store = configureStore({
  reducer: { // instil our slices 
    products: productsReducer,
    // posts: postsReducer,
    // comments: commentsReducer,
    // users: usersReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch