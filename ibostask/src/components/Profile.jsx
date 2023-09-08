/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import ibos from "../images/ibos.png";
import remon from "../images/Profile.png";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../features/auth/authSlice";
import { BsPlusCircle } from "react-icons/bs";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import Avatar from "react-avatar-edit";
import Task from "./Task";
import Team from "./Team";
import TeamCard from "./TeamCard";
import { useAllTeamQuery } from "../features/team/teamApi";
import TaskCard from "./TaskCard";
import { useAllTaskQuery } from "../features/task/taskApi";
import { useUserPhotoUpdateMutation } from "../features/auth/authApi";

function Profile() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(userLogout());
    localStorage.removeItem("auth");
  };

  const [size, setSize] = useState(null);
  const handleOpen = (value) => setSize(value);
  const [imgCrop, setImgCrop] = useState(false);
  const [item, setItem] = useState(false);
  const [allTeam, setAllTeam] = useState([]);
  const [allTask, setAllTask] = useState([]);
  const [avatarPreview, setAvatarPreview] = useState();

  const { user } = useSelector((state) => state.auth);
  console.log(user);
  const onCrop = (view) => {
    setImgCrop(view);
  };
  const onClose = () => {
    setImgCrop(null);
  };
  const [userPhotoUpdate, { data: photoData, isLoading: photoLoading }] =
    useUserPhotoUpdateMutation();
  const saveImage = () => {
    userPhotoUpdate({ id: user._id, avatar: [{ imgCrop }][0].imgCrop });
    handleOpen(null);
  };
  const { data, isLoading } = useAllTeamQuery();
  const { data: taskData, isLoading: taskLoading } = useAllTaskQuery();

  useEffect(() => {
    if (data?.team) {
      setAllTeam(data?.team);
    }
    if (taskData?.task) {
      setAllTask(taskData?.task);
    }
    const handleResize = () => {
      if (window.innerWidth < 1060) {
        // small screen
        setItem(false);
      } else {
        // large screen
        setItem(true);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [data, taskData]);

  return (
    <div className="w-full bg-[#ddd] min-h-screen ">
      <div>
        <img className="h-[15rem] w-full" src={ibos} alt="ibos" />
      </div>
      <div className="w-4/5 m-auto">
        <div className="flex gap-8">
          <div className="space-y-6">
            <div className="h-52 w-52 mt-[-3rem] relative bg-black rounded-full">
              <img
                className="h-52 w-52  rounded-full cursor-pointer"
                src={photoLoading ? remon : user ? user.avatar.url : ""}
                alt="Remon"
              />
              <div
                onClick={() => handleOpen(!item ? "xl" : "sm")}
                className="absolute h-52 w-52 bg-transparent cursor-pointer top-0 rounded-full hover:bg-[#1212129c]"
              ></div>
              <Dialog
                open={
                  size === "xs" ||
                  size === "sm" ||
                  size === "md" ||
                  size === "lg" ||
                  size === "xl" ||
                  size === "xxl"
                }
                size={size || "md"}
                handler={handleOpen}
              >
                <DialogBody>
                  <Avatar
                    width={!item ? "100%" : "100%"}
                    height={300}
                    onCrop={onCrop}
                    onClose={onClose}
                  />
                </DialogBody>
                <DialogFooter>
                  <Button
                    variant="text"
                    color="red"
                    onClick={() => handleOpen(null)}
                    className="mr-1"
                  >
                    <span>Cancel</span>
                  </Button>
                  <Button variant="gradient" color="green" onClick={saveImage}>
                    <span>Confirm</span>
                  </Button>
                </DialogFooter>
              </Dialog>
            </div>
            <div className="">
              <h1>{user.name}</h1>
              <h1>{user.designation}</h1>
            </div>
            <div className="">
              <p>{user.bio}</p>
            </div>

            <div className="w-full">
              <button onClick={handleLogout} className="bg-orange-400 w-full">
                Logout
              </button>
            </div>
          </div>
          <div className="bg-white flex-1 p-2 drop-shadow-md">
            <div className="border-b-2 flex justify-around ">
              <Task />
              <Team />
            </div>
            <div className="flex">
              <div className="flex-1 w-64">
                <h1 className="text-center">Total Task</h1>
                <div className="p-3 flex gap-2 flex-col">
                  {/* <TaskCard /> */}
                  {taskLoading ? (
                    <>
                      <h1>Loading</h1>
                    </>
                  ) : (
                    allTask?.map((item) => (
                      <TaskCard key={item._id} item={item} />
                    ))
                  )}
                </div>
              </div>
              <div className="max-h-screen border-r-4 border-indigo-500"></div>
              <div className="flex-1 w-32">
                <h1 className="text-center">Total Team</h1>
                <div className="p-3 flex gap-2 flex-wrap justify-center">
                  {isLoading ? (
                    <>
                      <h1>Loading</h1>
                    </>
                  ) : (
                    allTeam?.map((item) => (
                      <TeamCard key={item._id} item={item} />
                    ))
                  )}
                  {/* <TeamCard />
                  <TeamCard /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
