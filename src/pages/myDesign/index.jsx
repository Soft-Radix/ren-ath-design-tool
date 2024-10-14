import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import bgImage from "../../assets/images/home/bgImage.png";
import Loader from "../../components/common/loader";
import SectionHeading from "../../components/common/sectionHeading";
import MainLayout from "../../components/Layouts/MainLayout";
import MyDesignList from "../../components/myDesigns/MyDesignList";
import useFetch from "../../hook/CustomHook/usefetch";
import { toast } from "react-toastify";
import LoadingBars from "../../components/common/loader/LoadingBars";

const Mydesign = () => {
  const { globalLoader } = useProductStore((store) => store);
  const [designList, setDesignList] = useState([]);

  const [loadMyDesignListQuery, { response, loading, error }] = useFetch(
    "/design/list",
    {
      method: "post",
    }
  );


  //load api
  useEffect(() => {
    loadMyDesignListQuery();
  }, []);

  // handle api response
  useEffect(() => {
    toast.dismiss();
    if (response?.data) {
      setDesignList(response.data);
      // toast.success(response.message);
    }

    if (error) {
      const toastId = toast.error(error.message);
      return () => {
        toast.dismiss(toastId);
      };
    }
  }, [response, error]);

  return (
    <MainLayout>
      <div className={styles.mainWrap}>
        <img src={bgImage} alt="" />
        <SectionHeading
          heading="My Designs"
          subHeading="Here is your fully customized design, tailored just for you."
        />
      </div>
      {loading ? (
        <LoadingBars />
      ) : (
        <MyDesignList
          designList={designList}
          loadMyDesignListQuery={loadMyDesignListQuery}
        />
      )}
    </MainLayout>
  );
};

export default Mydesign;
