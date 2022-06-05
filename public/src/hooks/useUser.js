import { localUser } from "../Utils/constrains"

const useUser = () => {
  const user = localStorage.getItem(localUser);
  return JSON.parse(user);
}

export default useUser;