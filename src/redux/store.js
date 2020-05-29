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

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(logger))
)


export default store