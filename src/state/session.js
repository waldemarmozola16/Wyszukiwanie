const FETCH__BEGIN = 'session/LOGIN__BEGIN'
const FETCH__SUCCESS = 'session/LOGIN__SUCCESS'
const FETCH__FAIL = 'session/LOGIN__FAILED'
//const LOGOUT = 'login/LOGOUT'
//TODO: add logout action

export const logIn = (username, password) => dispatch => {
  dispatch({ type: FETCH__BEGIN })
  return fetch(
    'https://tranquil-ocean-17204.herokuapp.com/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password,
      })
    }
  ).then(
    response => {
      if (response.ok) {
        return response.json().then(
          data => {
            dispatch({
              type: FETCH__SUCCESS,
              data
            })
            //dispatch(fetchUser(data.id, data.userId))
          }
        ).catch(
          error => dispatch({
            type: FETCH__FAIL,
            error: 'Zniekształcony JSON w odpowiedzi z serwera'
          })
        )
      }
      throw new Error('Błąd połączenia z serwerem.')
    }
  ).catch(
    error => dispatch({
      type: FETCH__FAIL,
      error: error.message
    })
  )
}

const initialState = {
  data: null,
  fetching: false,
  error: null
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH__BEGIN:
      return {
        ...state,
        fetching: true,
        error: null
      }
    case FETCH__SUCCESS:
      return {
        ...state,
        data: action.data,
        fetching: false
      }
    case FETCH__FAIL:
      return {
        ...state,
        fetching: false,
        error: action.error
      }
  // case LOGOUT:
  //   return {
  //     ...state,
  //   }
    default:
      return state
  }
}