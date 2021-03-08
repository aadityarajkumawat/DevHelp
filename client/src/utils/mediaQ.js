import { useMediaQuery } from "@chakra-ui/react";

const useM = () => {
  return useMediaQuery("(min-width: 500px)")[0];
};
export default useM;
