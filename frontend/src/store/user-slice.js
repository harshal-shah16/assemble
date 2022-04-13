import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import loginService from "../services/user-service"
import {statuses} from "./state-types";


const login = createAsyncThunk('users/login', async (credentials) => {
    return loginService.login(credentials.email, credentials.password);
});

const signup = createAsyncThunk('users/signup', async (user) => {
    return loginService.signup(user);
});

export const userThunks = {login, signup}

const userSlice = createSlice({
                                  name: 'users',
                                  initialState: {user: {}, loading: 'idle'},
                                  status: 'idle',
                                  error: {},
                                  reducers: {
                                      // standard reducer logic, with auto-generated action types
                                      // per reducer
                                  },

                                  extraReducers: {
                                      // Add reducers for additional action types here, and handle
                                      // loading state as needed
                                      [login.fulfilled]: (state, action) => {
                                          // Add user to the state array
                                          state.user = action.payload
                                          //sessionService.saveUser(state.user)
                                          //sessionService.saveSession(state.user)
                                      },
                                      [login.rejected]: (state, action) => {
                                          state.status = 'failed'
                                          state.error = action.error
                                      },
                                      [signup.fulfilled]: (state, action) => {
                                          state.status = statuses.SUCCESS
                                          // Add user to the state array
                                          state.user = action.payload
                                          //sessionService.saveUser(state.user)
                                          //sessionService.saveSession(state.user)

                                      },
                                      [signup.rejected]: (state, action) => {
                                          state.status = 'failed'
                                          state.error = action.error
                                      }
                                  }
                              })

export default userSlice;

