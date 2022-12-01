import React, { useState, useEffect } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useParams, useNavigate } from "react-router-dom";
import { userCreatedPinQuery, userQuery, userSavedPin } from "../utiles/data";
import { googleLogout } from "@react-oauth/google";

import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
import { client } from "./../client";
const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [pins, setPins] = useState(null);
  const [text, settext] = useState(null);
  const [activeBtn, setActivebtn] = useState("created");
  const navigate = useNavigate();
  const { userId } = useParams();
  const randomImg = "https://source.unsplash.com/1600x900/?nature,photo";
  useEffect(() => {
    const query = userQuery(userId);

    client.fetch(query).then((data) => setUser(data[0]));
  }, [userId]);

  if (!user) {
    return <Spinner message="Loading Profile" />;
  }
  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center ">
            <img
              src={randomImg}
              className="w-full h-370 2xl:h-510 shadow-lg object-cover"
              alt="banner-pic"
            />
            <img
              src={user.image}
              className="rounded-full w-20 h-20 -mt-10 shadow-lg object-cover"
              alt="user-pic"
            />
            <h1 className="font-bold text-3xl text-center mt-3">
              {user.userName}
            </h1>
          </div>
          <div className="absolute top-0 z-1 right-0 p-2">
            {userId === user._id}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
