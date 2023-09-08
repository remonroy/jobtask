/* eslint-disable no-unused-vars */
import { BiDotsVerticalRounded } from "react-icons/bi";
import { Fragment, useState } from "react";
import { Input } from "@material-tailwind/react";
import { toast } from "react-toastify";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { validateEmail } from "../hooks/isEmailValid";
import { useSingleUserMutation } from "../features/auth/authApi";
import { useEffect } from "react";

// eslint-disable-next-line react/prop-types
function UserCheck({ id }) {
  const [size, setSize] = useState(null);
  const [to, setTo] = useState("");

  const [, setRequest] = useState(false);
  const handleOpen = (value) => setSize(value);

  const [singleUser, { data, isLoading, isError, isSuccess, error }] =
    useSingleUserMutation();

  console.log("data", data);
  console.log("error", error);
  console.log("isError", isError);

  const handleUpdate = () => {
    singleUser({ id, email: to });
    handleOpen(null);
  };

  const debounceHandler = (fun, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fun(...args);
      }, delay);
    };
  };

  const doSearch = (value) => {
    if (validateEmail(value)) {
      setRequest(true);
      setTo(value);
    }
  };
  const handleSearch = debounceHandler(doSearch, 500);
  useEffect(() => {
    if (isError) {
      toast.info(error?.data?.message, {
        position: "bottom-left",
      });
    }
    if (isSuccess) {
      toast.info("User invite successfully", {
        position: "bottom-left",
      });
    }
  }, [isError, error, isSuccess]);
  return (
    <Fragment>
      <div className="flex gap-3">
        {/* <button className="bg-green-600 w-full">Edit Bio</button> */}
        <div className="w-full mb-5">
          <BiDotsVerticalRounded
            className="cursor-pointer"
            onClick={() => handleOpen("lg")}
          />
        </div>
      </div>
      <Dialog open={size === "lg"} size={size || "md"} handler={handleOpen}>
        <DialogHeader>User Check</DialogHeader>
        <DialogBody divider>
          <div className="flex flex-col gap-y-3">
            <Input
              label="user"
              type="email"
              name="to"
              onChange={(e) => handleSearch(e.target.value)}
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

export default UserCheck;
