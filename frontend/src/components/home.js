import Feed from "./feed/feed";
import {useSelector} from "react-redux";
import {BrowserRouter, Route} from "react-router-dom";
import {MuiThemeProvider} from "@material-ui/core";
import {theme} from "./theme";
import SignIn from "./login/login";
import SignUp from "./login/sign-up";
import ProfilePage from "./settings/profile-page";
import AssembleAppBar from "./nav/app-bar";
import CourseManager from "./settings/course-manager";
import Container from "@material-ui/core/Container";
import LandingPage from './landing/landing-page';
import EnrollmentManager from "./settings/enrollment-manager";

const Home = () => {
    const session = useSelector(state => state.session)

    return (
        <>
            {session.checked &&
             <BrowserRouter>
                 <MuiThemeProvider theme={theme}>
                     {session.authenticated &&
                      <>
                          <Route path='*' exact><AssembleAppBar/></Route>

                          <Route path='/feed/:feedId' exact><Feed/></Route>
                          <Route path="/profile" exact><ProfilePage/></Route>
                          <Route path="/courses/manager" exact>
                              <Container><CourseManager/></Container>
                          </Route>
                      </>
                     }

                     {
                         !session.authenticated &&
                         <>
                             <Route path={"/"} exact>
                                 <LandingPage/>
                             </Route>
                             <Route path={"/login"} exact>
                                 <SignIn/>
                             </Route>
                             <Route path="/sign-up" exact={true}>
                                 <SignUp/>
                             </Route>
                         </>
                     }

                 </MuiThemeProvider>
             </BrowserRouter>
            }
        </>
    );
}

export default Home;
