export const ACTIONS = {
    INITIALPOSTS:"initialposts",
}

export function MediaReducer(state, action){
    switch(action.type){
        case ACTIONS.INITIALPOSTS:{
            return{...state, PostsData:[...action.payload]}
        }

        default: {
            throw new Error("Unknown action " + action.type);
          }

    }
}