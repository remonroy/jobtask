// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import profile from "../images/Profile.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  // eslint-disable-next-line no-unused-vars
  Button,
  Typography,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Textarea,
} from "@material-tailwind/react";
import {
  //   useForgotPasswordMutation,
  useLoginMutation,
  useRegisterMutation,
} from "../features/auth/authApi";
import { RotatingLines } from "react-loader-spinner";
// eslint-disable-next-line no-unused-vars
function formatCardNumber(value) {
  const val = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
  const matches = val.match(/\d{4,16}/g);
  const match = (matches && matches[0]) || "";
  const parts = [];

  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }

  if (parts.length) {
    return parts.join(" ");
  } else {
    return value;
  }
}

// eslint-disable-next-line no-unused-vars
function formatExpires(value) {
  return value
    .replace(/[^0-9]/g, "")
    .replace(/^([2-9])$/g, "0$1")
    .replace(/^(1{1})([3-9]{1})$/g, "0$1/$2")
    .replace(/^0{1,}/g, "0")
    .replace(/^([0-1]{1}[0-9]{1})([0-9]{1,2}).*/g, "$1/$2");
}

function Register() {
  const [type, setType] = React.useState("paypal");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    designation: "",
    bio: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const { name, email, designation, bio, password, confirmPassword } = user;

  //   register mutation
  const [register, { data, isLoading, isSuccess, error, isError, reset }] =
    useRegisterMutation();
  console.log();
  //login mutation
  const [
    login,
    {
      data: loginData,
      // eslint-disable-next-line no-unused-vars
      isSuccess: loginIsSuccess,
      isLoading: loginLoading,
      isError: loginIsError,
      error: loginError,
      reset: loginRest,
    },
  ] = useLoginMutation();

  const registerDataChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  //Register Submit here
  const registerSubmit = (e) => {
    e.preventDefault();
    //     console.log({ name, email, designation, bio, password, confirmPassword });
    loginRest();
    register({ name, email, designation, bio, password, confirmPassword });
  };

  //Login Submit here
  const loginSubmit = (e) => {
    e.preventDefault();
    reset();

    login({ email: loginEmail, password: loginPassword });
  };

  useEffect(() => {
    if (data?.user) {
      navigate("/profile");
    }
    if (isError) {
      toast.info(error?.data?.message, {
        position: "bottom-left",
      });
    }
    if (loginIsError) {
      toast.info(loginError?.data?.message, {
        position: "bottom-left",
      });
    }
    if (loginData?.user) {
      navigate("/profile");
    }
  }, [isSuccess, isError, error, loginError, loginIsError, loginData]);
  return (
    <div className="bg-[#ddd] min-h-screen">
      <Card className="w-1/2 m-auto px-4 md:px-0 md:max-w-[24rem] ">
        <CardHeader
          color="blue"
          floated={false}
          shadow={false}
          className="m-0 grid place-items-center rounded-b-none py-8 px-4 text-center"
        >
          <div className="mb-4 rounded-full border border-white/10 bg-white/10 p-6 text-white">
            <img src={profile} className="h-10 w-10" />
          </div>
          <Typography variant="h4" color="white">
            User Information
          </Typography>
        </CardHeader>
        <CardBody>
          <Tabs value={type} className="overflow-visible">
            <TabsHeader className="relative z-0 ">
              <Tab value="card" onClick={() => setType("card")}>
                Register
              </Tab>
              <Tab value="paypal" onClick={() => setType("paypal")}>
                Login
              </Tab>
            </TabsHeader>
            <TabsBody
              className="!overflow-x-hidden !overflow-y-visible"
              animate={{
                initial: {
                  x: type === "card" ? 400 : -400,
                },
                mount: {
                  x: 0,
                },
                unmount: {
                  x: type === "card" ? 400 : -400,
                },
              }}
            >
              <TabPanel value="card" className="p-0">
                <form
                  onSubmit={registerSubmit}
                  className="mt-5 flex flex-col gap-0"
                >
                  <div>
                    <Input
                      type="name"
                      value={name}
                      name="name"
                      label="Name"
                      onChange={registerDataChange}
                    />
                  </div>

                  <div className="my-4">
                    <div>
                      {" "}
                      <Input
                        type="email"
                        value={email}
                        name="email"
                        label="Email Address"
                        onChange={registerDataChange}
                      />
                    </div>
                    <div className="mt-4">
                      {" "}
                      <Input
                        type="designation"
                        value={designation}
                        name="designation"
                        label="Enter designation"
                        onChange={registerDataChange}
                      />
                    </div>
                    <div className="mt-4">
                      <Textarea
                        type="bio"
                        value={bio}
                        name="bio"
                        onChange={registerDataChange}
                        label="Enter you Bio"
                      />
                    </div>
                    <div className="my-3 flex items-center gap-4">
                      <Input
                        type="password"
                        name="password"
                        label="Password"
                        value={password}
                        onChange={registerDataChange}
                      />
                    </div>
                    <Input
                      type="password"
                      name="confirmPassword"
                      label="Confirm Password"
                      value={confirmPassword}
                      onChange={registerDataChange}
                    />
                  </div>
                  <div className="w-full relative">
                    <input
                      type="submit"
                      //   disabled={isLoading && true}
                      className="bg-[#2196F3] p-3 rounded-md text-black font-bold cursor-pointer drop-shadow-md w-[100%]"
                      value="Register"
                    />
                    {isLoading && (
                      <div className="absolute top-2 left-[47%]">
                        <RotatingLines
                          strokeColor="black"
                          strokeWidth="5"
                          animationDuration="0.75"
                          width="40"
                          visible={true}
                        />
                      </div>
                    )}
                  </div>

                  <Typography
                    variant="small"
                    color="gray"
                    className="mt-2 flex items-center justify-center gap-2 font-normal opacity-60"
                  ></Typography>
                </form>
              </TabPanel>
              <TabPanel value="paypal" className="p-0">
                <form className="mt-5 flex flex-col " onSubmit={loginSubmit}>
                  <div>
                    <Input
                      label="Email Address"
                      value={loginEmail}
                      type="email"
                      onChange={(e) => setLoginEmail(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <Input
                      label="Password"
                      containerProps={{ className: "mt-4" }}
                      value={loginPassword}
                      type="password"
                      onChange={(e) => setLoginPassword(e.target.value)}
                    />
                  </div>

                  <div className="w-full relative">
                    <input
                      type="submit"
                      disabled={loginLoading && true}
                      className="bg-[#FFCA2C] p-3 rounded-md text-black font-bold cursor-pointer drop-shadow-md w-[100%]"
                      value={"Login"}
                    />
                    {loginLoading && (
                      <div className="absolute top-2 left-[45%]">
                        <RotatingLines
                          strokeColor="black"
                          strokeWidth="5"
                          animationDuration="0.75"
                          width="35"
                          visible={true}
                        />
                      </div>
                    )}
                  </div>
                </form>
              </TabPanel>
            </TabsBody>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}

export default Register;
