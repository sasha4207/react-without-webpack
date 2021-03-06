import { REQUEST_CATEGORIES, RECEIVE_CATEGORIES } from './actionTypes'
import { shouldFetchCategories } from './selectors'
import Drive from 'lib/drive'

export function fetchCategoriesIfNeeded() {
    return (dispatch, getState) => {
        let state = getState()

        if (shouldFetchCategories(state)) {
            return fetchCategories(dispatch)
        }
    }
}

export function fetchCategories(dispatch) {
    dispatch(requestCategories())
    return Drive.getCategories()
        .then(categories => {
            return dispatch(receiveCategories(categories))
        })
        .catch(function(error) {
            console.log('code:', error.code, ' message:', error.message)
        })
}

export function requestCategories() {
    return {
        type: REQUEST_CATEGORIES
    }
}

export function receiveCategories(categories) {
    return {
        type: RECEIVE_CATEGORIES,
        categories
    }
}
