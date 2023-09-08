import { Fragment, useState } from "react";
import { Input } from "@material-tailwind/react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Select,
  Option,
} from "@material-tailwind/react";
// import { useUserUpdateMutation } from "../../features/auth/authApi";
import { BsPlusCircle } from "react-icons/bs";
import { useAllTeamQuery } from "../features/team/teamApi";
import { useEffect } from "react";
import { useCreateTaskMutation } from "../features/task/taskApi";
// eslint-disable-next-line react/prop-types

function Task() {
  const [size, setSize] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState("");
  const [date, setDate] = useState("");
  const [team, setTeam] = useState("");

  const handleOpen = (value) => setSize(value);
  const [allTeam, setAllTeam] = useState([]);
  const [createTask, { error }] = useCreateTaskMutation();
  // console.log("taskData", taskData);
  console.log("error", error);
  const handleUpdate = () => {
    createTask({ title, description, level, team, date });
    // console.log({ title, description, level, team, date });
    handleOpen(null);
  };

  const { data } = useAllTeamQuery();
  useEffect(() => {
    if (data?.team) {
      setAllTeam(data?.team);
    }
  }, [data]);
  return (
    <Fragment>
      <div className="flex gap-3">
        {/* <button className="bg-green-600 w-full">Edit Bio</button> */}
        <div className="w-full mb-5">
          <Button
            onClick={() => handleOpen("lg")}
            variant="gradient"
            className=" mb-3 drop-shadow-md flex gap-1 items-center w-[6.8rem] m-auto bg-red-400  text-center flex-1 p-2"
          >
            Create Task <BsPlusCircle />
          </Button>
        </div>
      </div>
      <Dialog open={size === "lg"} size={size || "md"} handler={handleOpen}>
        <DialogHeader>Create Task</DialogHeader>
        <DialogBody divider>
          <div className="flex flex-col gap-y-3">
            <Input
              variant="standard"
              label="Title"
              value={title}
              name="title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input
              variant="standard"
              label="Description"
              value={description}
              name="description"
              onChange={(e) => setDescription(e.target.value)}
            />
            <Select
              variant="standard"
              label="priority leve"
              onChange={(value) => setLevel(value)}
            >
              <Option value="High">High </Option>
              <Option value="Medium"> Medium</Option>
              <Option value="Low"> Low</Option>
            </Select>
            <Select
              variant="standard"
              label="Select Team"
              onChange={(value) => setTeam(value)}
            >
              {allTeam?.map((item) => (
                <Option key={item._id} value={item.title}>
                  {item.title}{" "}
                </Option>
              ))}
            </Select>
            <div>
              <input
                type="date"
                className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                placeholder="Select a date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <div className="flex">
            <Button
              variant="text"
              color="red"
              onClick={() => handleOpen(null)}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button variant="gradient" color="green" onClick={handleUpdate}>
              <span>Confirm</span>
            </Button>
          </div>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
}

export default Task;
