/* eslint-disable react/prop-types */
import { Select, Option } from "@material-tailwind/react";
import { useState } from "react";
import { useTaskUpdateMutation } from "../features/task/taskApi";
import { useEffect } from "react";

// eslint-disable-next-line react/prop-types
function TaskCard({ item }) {
  // eslint-disable-next-line no-unused-vars
  const [taskUpdate, { isLoading }] = useTaskUpdateMutation();
  // eslint-disable-next-line no-unused-vars
  const [level, setLevel] = useState("");
  //   console.log("levelOption", level);
  //   const handleClick = () => {
  //     //     taskUpdate({ option: level });
  //     console.log("levelOption", level);
  //   };
  useEffect(() => {
    taskUpdate({ id: item._id, option: level });
    console.log(level);
  }, [item._id, level, taskUpdate]);
  return (
    <div className="bg-[#ddd] p-3 ">
      <div className="flex items-center justify-between">
        <div className="">
          <h1>{item.title}</h1>
        </div>
        <div className="">
          <Select
            variant="standard"
            value={item.option}
            label="Task position"
            onChange={(value) => setLevel(value)}
          >
            <Option value="Complete">Complete </Option>
            <Option value="Progress"> Progress</Option>
          </Select>
        </div>
      </div>
      <div className="mt-4">
        <div className="">{item.description}</div>
        <div className="">Team:{item.team}</div>
        <div className="">Level: {item.level}</div>
        <div className="">Date: {item.date.slice(0, 10)}</div>
      </div>
    </div>
  );
}

export default TaskCard;
