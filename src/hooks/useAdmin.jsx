import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAdmin = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: admins = [],
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: ["admin"],
    queryFn: async () => {
      const res = await axiosPublic.get("/admin");
      return res.data;
    },
  });

  return {admins, loading, refetch};
};

export default useAdmin;