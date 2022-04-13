import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import stackOverFlowService from "../services/stack-overflow-service"


const results = createAsyncThunk('stackOverFlow/query', async (query) => {
    return stackOverFlowService.findStackOverflowPosts(query);
});


export const stackOverFlowThunks = {results}

const stackOverFlowSlice = createSlice({
                                  name: 'stackOverFlow',
                                  initialState: {stackOverflowPosts: {items: []}},
                                  status: 'idle',
                                  error: {},
                                  reducers: {
                                      // standard reducer logic, with auto-generated action types
                                      // per reducer
                                      stackOverFlowComplete(state, action) {
                                          state.stackOverflowPosts.items = [];
                                      }
                                  },

                                  extraReducers: {
                                      // Add reducers for additional action types here, and handle
                                      // loading state as needed
                                      [results.fulfilled]: (state, action) => {
                                          // Add user to the state array
                                          state.stackOverflowPosts = action.payload
                                          
                                      },
                                      
                                      [results.rejected]: (state, action) => {
                                          state.status = 'failed'
                                          
                                      },
                                      
                                  }
                              })

export const stackOverFlowActions = stackOverFlowSlice.actions;

export default stackOverFlowSlice;

