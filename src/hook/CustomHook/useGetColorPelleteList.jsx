import { useEffect, useState } from "react";
import { colorList } from "../../components/data/colors";
import { useProductStore } from "../../store";
import { getUserLocalData } from "../../utils/common";
import useFetch from "./usefetch";

const useGetColorPelleteList = () => {
  const userToken = getUserLocalData();
  const [finalColorPelleteList, setFinalColorPelleteList] = useState([]);

  const { colorPelleteCollection } = useProductStore((store) => store);
  const defaultColorPelleteList = [...colorList];

  useEffect(() => {
    if (colorPelleteCollection?.length > 0) {
      setFinalColorPelleteList([...colorPelleteCollection]);
    } else {
      setFinalColorPelleteList([...defaultColorPelleteList]);
    }
  }, [colorPelleteCollection]);

  const returnFinainaliseColorList = finalColorPelleteList;
  return returnFinainaliseColorList;
};

export default useGetColorPelleteList;
