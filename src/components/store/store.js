import {createStore} from 'redux';

const LogInReducer = (state = {login:''}, action) => {
if (action.type === "MAJ") {
        state = {
                login:action.login
        };
        }

return state;
}

export const LogInStore = createStore(LogInReducer);