import {useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter as ReacRouterDom, Routes, Route , Navigate} from 'react-router-dom'
import Auth from '@/pages/auth'
import Chat from '@/pages/chat'
import Profile from '@/pages/profile'
import { useAppStore } from "./store";

const PrivateRoute = ({ Children }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? Children : <Navigate to="/auth" />

};


const AuthRoute = ({ Children }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? <Navigate to="/chat" /> : Children;
};

function App() {

  const {userInfo,setUserInfo} = useAppStore();
  const {loading , setLoading} = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await apiClient.get(GET_USER_INFO, {
          withCredentials:true,
        });
      } catch (error) {
        console.log({error});
      }
      if(!userInfo) {
        getUserData();
      } else {
        setLoading(false);
      }
    }
  },[userInfo , setUserInfo]);
  if(loading){
    return <div>Loading......</div>
  }



  return (
    <>
      <ReacRouterDom>
        <Routes>
          <Route path="/auth" element={<AuthRoute> <Auth /> </AuthRoute>} />
          <Route path="/chat" element={<PrivateRoute> <Chat /> </PrivateRoute>} />
          <Route path="/profile" element={ <PrivateRoute> <Profile /> </PrivateRoute>} />
          <Route path="*" element={<Auth />} />
        </Routes>
      </ReacRouterDom>
    </>
  )
}

export default App;
