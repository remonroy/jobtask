/* eslint-disable react/prop-types */
import UserCheck from "./UserCheck";
// eslint-disable-next-line react/prop-types
function TeamCard({ item }) {
  return (
    <div className="bg-[#a2a1a1] w-[11rem] rounded-lg p-3 space-y-2">
      <div className="flex justify-between item-center">
        <div className="bg-white inline-block p-1 px-3 font-bold rounded-full text-sm">
          {item.title}
        </div>
        <UserCheck id={item._id} />
      </div>
      <div className="">
        <div className="text-sm">{item.description}</div>
        <div className="text-sm">Date:{item.createdAt.slice(0, 10)}</div>
      </div>
    </div>
  );
}

export default TeamCard;
