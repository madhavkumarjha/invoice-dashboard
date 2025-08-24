import { useAuth } from "../contexts/authContext/index";
import IncomeGraph from "../components/GraphInvoice";


function Home() {
  const { currentUser } = useAuth();
  console.log("currentUser", currentUser);
  



  return (
    <>
      <div className="text-2xl font-bold pt-14">
        Hello{" "}
        {currentUser.displayName ? currentUser.displayName : currentUser.email},
        you are now logged in.
      </div>
      <IncomeGraph />
    </>
  );
}

export default Home;
