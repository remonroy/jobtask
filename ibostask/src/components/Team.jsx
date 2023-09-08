import { Fragment, useState } from "react";
import { Input } from "@material-tailwind/react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Textarea,
} from "@material-tailwind/react";

import { BsPlusCircle } from "react-icons/bs";
import { useCreateTeamMutation } from "../features/team/teamApi";
// eslint-disable-next-line react/prop-types
function Team() {
  const [size, setSize] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");
  //   const [date, setDate] = useState("");

  const handleOpen = (value) => setSize(value);

  // eslint-disable-next-line no-unused-vars
  const [createTeam, { data }] = useCreateTeamMutation();
  const handleUpdate = () => {
    createTeam({ title, description, color });
    //     console.log({ team, description, color });
    handleOpen(null);
  };

  // useEffect(() => {
  //   setName(user?.name);
  //   setDesignation(user?.designation);
  //   setBio(user?.bio);
  // }, [user]);

  return (
    <Fragment>
      <div className="flex gap-3">
        {/* <button className="bg-green-600 w-full">Edit Bio</button> */}
        <div className="w-full mb-5">
          <Button
            onClick={() => handleOpen("lg")}
            variant="gradient"
            className=" mb-3 drop-shadow-md flex gap-1 items-center w-[7rem] m-auto bg-red-400  text-center flex-1 p-2"
          >
            Create Team <BsPlusCircle />
          </Button>
        </div>
      </div>
      <Dialog open={size === "lg"} size={size || "md"} handler={handleOpen}>
        <DialogHeader>Create Team</DialogHeader>
        <DialogBody divider>
          <div className="flex flex-col gap-y-3">
            <Input
              variant="standard"
              label="title"
              value={title}
              name="title"
              onChange={(e) => setTitle(e.target.value)}
            />
            {/* <Input
              variant="standard"
              label="Description"
              value={description}
              name="description"
              onChange={(e) => setDescription(e.target.value)}
            /> */}
            <Textarea
              type="description"
              variant="standard"
              value={description}
              name="description"
              onChange={(e) => setDescription(e.target.value)}
              label="Enter description"
            />
            <Input
              variant="standard"
              label="color example red blue #ddd #333"
              value={color}
              name="color"
              onChange={(e) => setColor(e.target.value)}
            />
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

export default Team;
