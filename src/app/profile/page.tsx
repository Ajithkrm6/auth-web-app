import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Profile = () => {
  const router = useRouter();
  const logout = async () => {
    await axios.get("/api/users/logout");
    router.push("/login");
  };
  return (
    <div className="flex flex-col text-center justify-center">
      <h1>Profile page</h1>
      <button onClick={logout}>logout</button>
    </div>
  );
};

export default Profile;
