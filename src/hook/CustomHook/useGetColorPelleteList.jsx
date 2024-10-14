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

  const [loadColorListQuery, { response, loading, error }] = useFetch(
    "/color-palette/detail",
    {
      method: "get",
    }
  );
  //load api
  useEffect(() => {
    if (userToken) {
      loadColorListQuery();
    }
  }, [userToken]);

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
