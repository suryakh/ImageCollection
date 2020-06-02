import { LOGIN, LOGOUT, GET_UPLOADED_DATA, REQUESTSENT, DOWNLOAD_INC, GET_CONTRIBUTOR } from './Action_types'
import axios from 'axios'

const login = (data) => {
    return {
        type: LOGIN,
        payload: data
    }
}
const logout = () => {
    return {
        type: LOGOUT
    }
}
const gettingdata = (Data) => {
    return {
        type: GET_UPLOADED_DATA,
        payload: Data
    }
}
const requestSent = () => {
    return {
        type: REQUESTSENT
    }
}
const contributors = (data) => {
    return {
        type: GET_CONTRIBUTOR,
        payload: data
    }
}

const increamentCount = (id) => {
    return {
        type: DOWNLOAD_INC,
        payload: id
    }
}

//  Request for UserLogin

const loginUser = (data) => {
    return dispatch => {
        axios({
            method: 'POST',
            url: 'http://localhost:5000/auth/login',
            data: data
        })
            .then(res => {
                if (res.data.token) {
                    dispatch(login(res.data))
                }
            }
            )
            .catch(err => alert("invalid username"))
    };
}

// Request for user signup

const signupUser = (data) => {
    return dispatch => {
        axios({
            method: "POST",
            url: "http://localhost:5000/auth/signup",
            data: data,
        })
            .then((res) => {
                alert("user suceessfully registered")
            })
            .catch((res) => {
                console.log("error")
            })
    }
}

//Request for upload images 

const uploadData = (data, token) => {
    console.log(data)
    return dispatch => {
        dispatch(requestSent())
        axios({
            method: "POST",
            url: 'http://localhost:5000/upload/data',
            headers: {
                'Authorization': token
            },
            data: data
        })
            .then((res) => {
                alert("successfully updated")
            }
            )
    }
}

// Request for get imagesdata 

const getImagesData = (count, offset, category, token) => {
    return dispatch => {
        dispatch(requestSent())
        axios({
            method: "GET",
            url: 'http://localhost:5000/data/imageslist',
            params: {
                count: count,
                offset: offset,
                category: category
            },
            headers: {
                'Authorization': token
            }
        })
            .then((res) => dispatch(gettingdata(res.data)))
    }
}

const downloadImage = (id, token) => {
    console.log(id, token)
    return dispatch => {
        axios({
            method: "GET",
            url: `http://localhost:5000/data/download/${id}`,
            headers: {
                'Authorization': token
            }
        })
            .then((res) => dispatch(increamentCount(id)))
    }
}

const getContrubutorData = (count, offset, token) => {
    return dispatch => {
        dispatch(requestSent())
        axios({
            method: "GET",
            url: 'http://localhost:5000/data/contributor',
            params: {
                count: count,
                offset: offset,
            },
            headers: {
                'Authorization': token
            }
        })
            .then((res) => dispatch(contributors(res.data)))
    }
}

export { loginUser, signupUser, logout, uploadData, getImagesData, downloadImage, getContrubutorData }