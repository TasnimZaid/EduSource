import { useState } from 'react'
import { Link } from 'react-router-dom';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from '../pages/signUpandIn/SignUp';
import SignIn from '../pages/signUpandIn/Signin';
import MainHomePage from '../pages/HomePage/MainHomePage';
import MainResourcespage from '../pages/resources/MainResourcespage';
import DetailsResources1 from '../pages/resources/DetailspageofAllResource/DetailsResources1';

function TeacherRoutes() {

  return (
    <>
       <Routes>
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path='/MainHomePage' element={<MainHomePage />} />
        <Route path='/MainResourcespage' element={<MainResourcespage />} />
        <Route path='/DetailsResources1' element={<DetailsResources1 />} />



        
      </Routes>


    </>
  )
}

export default TeacherRoutes;
