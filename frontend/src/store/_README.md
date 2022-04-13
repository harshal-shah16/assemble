# Slice implementation conventions

## General rules

* Keep declarations in alphabetical order

### 1. Entity Adapter

* declared as [ entity ]Adapter
* Must specify selectId
* Must specify sortComparer for maintaining sorted list
* Export post selectors directly after declaration

### 2. Thunks

* Use the following naming conventions
    * create[ Entity ]For[ Parent ] ( [ parent ]Id, [ entity ] )
    * delete[ Entity ]From[ Parent ] ( [ entity ]Id )
    * findAll[ Entity ]sFor[ Parent ]
    * find[ Entity ]By[ Entity ]Id ( [ entity ]Id )
* Export thunks directly after declarations

### 3. Slice

* name should be [ entity ]s
* Set initial state by using
  [entity]Adapter.getInitialState({status: 'idle',error: null,})
* Only declare any synchronous reducers in reducers object (likely not many)
    * **NOTE** the exported selectors from the adapter are going to offer all selectors, so we do
      not need getter reducers
* In extraReducers Declare each action condition alphabetically
* Use the statuses from state-types.js file to update the state's status appropriately
    * Prefix each thunk action handler section with:

           // |==============================|
           // | [ Thunk Purpose ] [ Entity ] |
           // |==============================|
* Use the adapter for updating the entity, and the error property if errors occur
* Export the slice as the **default** after
