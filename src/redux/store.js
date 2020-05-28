import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./RootReducer"

const logger = (store) => {
    return (next) => {
        return (action) => {
            console.log("[Middleware] Dispatching", action)
            const result = next(action)
            console.log("[Middleware] next state", store.getState())
            return result
        }
    }
}

const store = createStore(
    reducer,
    compose(
        applyMiddleware(logger),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
)

export default store