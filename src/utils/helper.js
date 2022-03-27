import { Redirect } from "react-router-dom"
import { Route } from "react-router-dom"

export const UserRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props =>
                localStorage.getItem("token") ? (<Component {...props} />) : (<Redirect to={{ pathname: "/login" }} />)
            }
        />)
}

export const getUniqueItems = (data, type) => {
    let unique = data.map((item) => item[type])
    if (type === 'colors') {
        unique = unique.flat()
    }

    return ['all', ...new Set(unique)]
}