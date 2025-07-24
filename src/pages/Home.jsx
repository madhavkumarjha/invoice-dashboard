import React from "react";
import { useAuth } from "../contexts/authContext/index";
// import TodoList from "../todoList";
import Card from "../components/card/Card";
import InVoice from "./invoice";


function Home() {
  const { currentUser } = useAuth();
  const cardType = ["Invoice", "Customer"];
  const color = ["red", "blue"];



  return (
    <>
      <div className="text-2xl font-bold pt-14">
        Hello{" "}
        {currentUser.displayName ? currentUser.displayName : currentUser.email},
        you are now logged in.
      </div>

      {/* <button onClick={uploadJsonData}>Upload</button> */}
<InVoice/>
      <div className="flex flex-row items-center justify-between">
        {cardType.map((type, index) => (
          <Card type={type} key={index} color={color[index]} />
        ))}
      </div>
    </>
  );
}

export default Home;
