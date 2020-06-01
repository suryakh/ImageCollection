import { LOGIN, LOGOUT } from './Action_types'

let initialState = {
    loginStatus: false,
    user: "",
    token: "",
    userType:""
}

const userReducers = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN: {
            return {
                ...state,
                loginStatus: true,
                user: action.payload.username,
                token: action.payload.token,
                userType:action.payload.userType
            }
        }
        case LOGOUT: {
            return {
                ...state,
                loginStatus: false,
                user: "",
                token: "",
                userType:""
            }
        }
        default: {
            return state
        }
    }
}

export { userReducers }