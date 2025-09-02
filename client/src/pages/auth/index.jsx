import Background from "@/assets/login1.png";
import Victory from "@/assets/victory.svg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { apiClient} from "@/lib/api-client";
import { SIGNUP_ROUTE} from "@/utils/constants.js";
const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const validateSignup = () => {
    if(!email.length){
      toast.error("Email is required");
      return false;
    }
    if(!password.length){
      toast.error("Password is required");
      return false;
    }
    if(password !== ConfirmPassword){
      toast.error("Passwords do not match");
      return false;
    }
    return true;
  }

  const handleLogin = async () => {
    // login logic
  };

  const handleSignup = async () => {
    if(validateSignup()) {
      // signup logic
      const response = await apiClient.post(SIGNUP_ROUTE, {
        email,
        password
      });
      console.log(response);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white border border-gray-200 shadow-2xl w-full max-w-6xl rounded-3xl grid lg:grid-cols-2 overflow-hidden">
        {/* Left Content */}
        <div className="flex flex-col gap-8 items-center justify-center px-6 sm:px-12 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                Welcome to the Chat
              </h1>
              <img src={Victory} alt="Victory" className="h-12 sm:h-16 lg:h-20" />
            </div>
            <p className="text-gray-600 text-sm sm:text-base">
              Fill in the details to get started with the chat app!
            </p>
          </div>

          <Tabs className="w-full max-w-md">
            <TabsList className="bg-transparent flex border-b">
              <TabsTrigger
                value="login"
                className="flex-1 text-center text-gray-600 border-b-2 border-transparent data-[state=active]:border-purple-500 data-[state=active]:text-black py-2 transition-all"
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="flex-1 text-center text-gray-600 border-b-2 border-transparent data-[state=active]:border-purple-500 data-[state=active]:text-black py-2 transition-all"
              >
                Sign Up
              </TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login" className="flex flex-col gap-4 mt-8">
              <Input
                placeholder="Email"
                value={email}
                type="email"
                className="rounded-full p-6"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="Password"
                type="password"
                value={password}
                className="rounded-full p-6"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button className="rounded-full py-6" onClick={handleLogin}>
                Login
              </Button>
            </TabsContent>

            {/* Signup Tab */}
            <TabsContent value="signup" className="flex flex-col gap-4 mt-8">
              <Input
                placeholder="Email"
                value={email}
                type="email"
                className="rounded-full p-6"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="Password"
                type="password"
                value={password}
                className="rounded-full p-6"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Input
                placeholder="Confirm Password"
                type="password"
                value={ConfirmPassword}
                className="rounded-full p-6"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button className="rounded-full py-6" onClick={handleSignup}>
                Sign Up
              </Button>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Side Image */}
        <div className="hidden lg:flex justify-center items-center bg-gray-100">
          <img
            src={Background}
            alt="Background login"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;
