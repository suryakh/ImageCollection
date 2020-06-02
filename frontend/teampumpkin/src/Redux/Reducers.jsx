
import { LOGIN, LOGOUT, GET_UPLOADED_DATA, REQUESTSENT, DOWNLOAD_INC, GET_CONTRIBUTOR } from './Action_types'

let initialState = {
    loginStatus: false,
    user: "",
    token: "",
    userType: ""
}

let datastate = {
    requestStatus: false,
    userData: [],
    contributorData: [],
    btnList: [],
    imgBtnList: []

}

const userReducers = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN: {
            return {
                ...state,
                loginStatus: true,
                user: action.payload.username,
                token: action.payload.token,
                userType: action.payload.userType
            }
        }
        case LOGOUT: {
            return {
                ...state,
                loginStatus: false,
                user: "",
                token: "",
                userType: ""
            }
        }
        default: {
            return state
        }
    }
}

const dataReducers = (state = datastate, action) => {
    switch (action.type) {
        case REQUESTSENT: {
            return {
                ...state,
                requestStatus: false,
                dataUploaded: true
            }
        }
        case GET_UPLOADED_DATA: {
            let templist = []
            for (let i = 1; i <= action.payload.totalpages; i++) {
                templist.push(i)
            }
            return {
                ...state,
                userData: action.payload.imageList,
                requestStatus: true,
                imgBtnList: templist,
                dataUploaded: false
            }
        }
        case DOWNLOAD_INC: {
            let temp = state.userData.map((ele) => {
                if (ele.id == action.payload) {
                    ele.downloads = ele.downloads + 1
                    return ele
                }
                else {
                    return ele
                }
            })
            return {
                ...state,
                userData: temp
            }
        }
        case GET_CONTRIBUTOR: {
            let templist = []
            for (let i = 1; i <= action.payload.totalpages; i++) {
                templist.push(i)
            }
            return {
                ...state,
                contributorData: action.payload.contributorData,
                requestStatus: true,
                dataUploaded: false,
                btnList: templist
            }

        }
        default:
            return state
    }
}

export { userReducers, dataReducers }