import { redirect } from "common";
import { RouteComponentProps, withRouter } from "react-router-dom";
 function RootPage(props: RouteComponentProps){
    redirect(props, "/about", 0)
    return <div>Home Page</div>
}
export default withRouter(RootPage);