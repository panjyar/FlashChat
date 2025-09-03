import { useAppStore } from "@/store";
import { useEffect } from "react";
import {  toast} from "sonner";
import { useNavigate  } from "react-router-dom";


const Chat = () => {
  const {userInfo}  = useAppStore();
  const navigate = useNavigate;
  useEffect(() => {
    if(!userInfo.profileSetup){
      toast("please setup profile to cintinue");
      navigate("/profile");
    }
  }, [userInfo , navigate]);

  return (
    <div>
      chat page
    </div>
  )
}

export default Chat;
