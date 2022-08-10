import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";


export default function PrivateRoute({ component: Component, ...rest }) {
    const { user } = useSelector(state => state.account);
    return (
        <Route
            {...rest}
            render={props =>
                user ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
}