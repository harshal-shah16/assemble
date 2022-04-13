import './App.css';
import Home from "./components/home";
import {Provider} from "react-redux";
import postSlice from './store/post-slice';
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userSlice from './store/user-slice';
import courseSlice from "./store/course-slice";
import {sessionReducer, sessionService} from "redux-react-session";
import feedSlice from "./store/feed-slice";
import stackOverFlowSlice from "./store/stackoverflow-slice";

const combinedReducer = combineReducers({
  session: sessionReducer,
  // feeds: feedSlice.reducer,
  courses: courseSlice.reducer,
  posts: postSlice.reducer,
  user: userSlice.reducer,
  stackOverflowPosts: stackOverFlowSlice.reducer
})

const rootReducer = (state, action) => {
  if (action.type === 'RESET') {
    state = undefined
  }
  return combinedReducer(state, action)
}

const store = configureStore({reducer: rootReducer,});
sessionService.initSessionService(store);

const App = () => {
  return (
      <Provider store={store}>
        {/*<PostsWithReduxExample/>*/}
        <Home/>
      </Provider>
  );
}

export default App;
