import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../components/Layouts/DashboardLayout";
import PageHeading from "../../../components/common/theme/PageHeading";
import {
  Chip,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { SelectField } from "../../../components/common/Select/Select";
import styles from "./Designs.module.scss";
import ThemeButton from "../../../components/common/ThemeButton";
import useFetchAdmin from "../../../hook/CustomHook/useFetchAdmin";
import { pageLimitOptions } from "../Users";
import LoadingBars from "../../../components/common/loader/LoadingBars";

export const TableLoader = () => (
  <>
    {[...Array(10)].map((_, index) => {
      return (
        <TableRow key={index}>
          <TableCell>
            {" "}
            <Skeleton variant="text" sx={{ fontSize: "1rem", width: "100%" }} />
          </TableCell>
          <TableCell>
            {" "}
            <Skeleton variant="text" sx={{ fontSize: "1rem", width: "100%" }} />
          </TableCell>
          <TableCell>
            {" "}
            <Skeleton variant="text" sx={{ fontSize: "1rem", width: "100%" }} />
          </TableCell>
          <TableCell>
            {" "}
            <Skeleton variant="text" sx={{ fontSize: "1rem", width: "100%" }} />
          </TableCell>
          <TableCell>
            {" "}
            <Skeleton variant="text" sx={{ fontSize: "1rem", width: "100%" }} />
          </TableCell>
          <TableCell>
            {" "}
            <Skeleton variant="text" sx={{ fontSize: "1rem", width: "100%" }} />
          </TableCell>
        </TableRow>
      );
    })}
  </>
);

const Designs = () => {
  //*Displaying the designs data by saving into local state
  const [designData, setDesignData] = useState([]);
  const [status, setStatus] = useState(null);
  //*Starting page limit
  const [start, setStart] = useState(0);
  //* Default limit 25
  const [limit, setLimit] = useState(25);
  //* Page number starting from 1
  const [pageNumber, setPageNumber] = useState(1);

  //*Total Records count
  const [totalCount, setTotalCount] = useState(0);
  //*List of number of pages we can display
  const [pageList, setPageList] = useState([]);
  //*Counting of total pages
  const totalPages = Math.ceil(totalCount / limit);

  const [loadQuery, { response, loading, error }] = useFetchAdmin(
    `/design-all/list`,
    {
      method: "post",
    }
  );

  //* Trigger fetch whenever start, limit, or searchQuery changes
  useEffect(() => {
    const fetchData = async () => {
      const response = await loadQuery({ start, limit, is_complete: status });
      if (response && response.data) {
        setDesignData(response?.data?.data?.list);
        setTotalCount(response.data.data.total_records);
      }
    };

    fetchData();
  }, [start, limit, status]);

  const handleStatusChange = (e) => {
    setStatus(Number(e.target.value));
    setPageNumber(1); //* Reset to page 1 when status changes
    setStart(0);
  };

  //*Setting the pagination options
  useEffect(() => {
    if (totalPages) {
      const optionList = [];
      for (var i = 0; i < totalPages; i++) {
        optionList.push({
          title: i + 1,
          value: i + 1,
        });
      }
      optionList.length && setPageList([...optionList]);
    }
  }, [totalPages]);

  const handleOnNextClick = () => {
    setStart((prev) => prev + 1);
    setPageNumber((prev) => {
      const newPage = prev + 1;
      // setStart((newPage - 1) * limit); //* Set start for the next page
      return newPage;
    });
  };

  const handleOnPrevClick = () => {
    setStart((prev) => prev - 1);
    setPageNumber((prev) => {
      const newPage = prev - 1;
      // setStart((newPage - 1) * limit); //* Set start for the previous page
      return newPage;
    });
  };

  const handleLimitSetFunc = (e) => {
    setLimit(Number(e.target.value));
    setPageNumber(1); //* Reset to page 1 when limit changes
    setStart(0);
  };

  const handleOnChange = (e) => {
    const selectedPage = Number(e.target.value);
    
    //* Set the page number
    setPageNumber(selectedPage);
    
    //* Calculate the start value based on the selected page
    setStart((selectedPage - 1) );
  };
  
  return (
    <DashboardLayout>
      <div>
        <div className="design_filter_cont">
          <PageHeading title="Designs Listing" />
          <div className="design_filter">
            <SelectField
              className="closeDate "
              value={status}
              label="Status"
              name="status"
              placeholder="Filter by Status"
              onChange={handleStatusChange}
              options={[
                {
                  title: "None",
                  value: "none",
                },
                {
                  title: "Pending",
                  value: 0,
                },
                {
                  title: "Completed",
                  value: 1,
                },
              ]}
            />
          </div>
        </div>

        <div>
          <div className={`theme_table ${styles.tableWrap}`}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Email Address</TableCell>
                  <TableCell>Team</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <>
                    <TableLoader />
                  </>
                ) : (
                  <>
                    {designData &&
                      designData.map((item, index) => {
                        return (
                          <TableRow key={item.code}>
                            <TableCell>{item.design_name}</TableCell>
                            <TableCell>
                              {item.user_detail.first_name}{" "}
                              {item.user_detail.last_name}
                            </TableCell>
                            <TableCell>{item.user_detail.email}</TableCell>
                            <TableCell>{item.user_detail.team_name}</TableCell>
                            <TableCell>
                              {item.is_finalized === 0 ? (
                                <Chip
                                  label="Pending"
                                  className={styles.chipCustomPending}
                                />
                              ) : (
                                <Chip
                                  label="Completed"
                                  className={styles.chipCustomSuccess}
                                />
                              )}
                            </TableCell>
                            <TableCell>
                              <ThemeButton className={styles.exportBtn}>
                                Export
                              </ThemeButton>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </>
                )}
              </TableBody>
            </Table>
            <div className={styles.pagination}>
              <div className={styles.inner_wrapper}>
                <div className={styles.pagination_left}>
                  <ThemeButton
                    variant="outlined"
                    size="small"
                    disabled={pageNumber === 1 || loading}
                    onClick={handleOnPrevClick}
                    style={{ width: "100px" }}
                  >
                    {loading ? <LoadingBars /> : "Previous"}
                  </ThemeButton>
                </div>

                <div className={styles.pagination_middle}>
                  <span className={styles.custom_text}>Page&nbsp;</span>
                  <SelectField
                    name="page"
                    value={pageNumber}
                    className="custom_page_dropdown"
                    options={pageList}
                    onChange={handleOnChange}
                  />
                  <span className={styles.custom_text}>
                    &nbsp;of {totalPages}
                  </span>
                </div>

                <div className={styles.pagination_right}>
                  <SelectField
                    className={styles.pagination_type_web}
                    name="limit"
                    value={limit}
                    options={pageLimitOptions}
                    onChange={handleLimitSetFunc}
                  />
                  <ThemeButton
                    variant="outlined"
                    size="small"
                    disabled={pageNumber === totalPages || loading}
                    onClick={handleOnNextClick}
                    style={{ width: "100px" }}
                  >
                    {loading ? <LoadingBars /> : "Next"}
                  </ThemeButton>
                </div>
              </div>

              <SelectField
                className={styles.pagination_type_mobile}
                name="limit"
                value={limit}
                options={pageLimitOptions.map((opt) => ({
                  label: `${opt.value} items per page`,
                  value: opt.value,
                }))}
                onChange={handleLimitSetFunc}
              />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Designs;
