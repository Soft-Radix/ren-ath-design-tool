import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../components/Layouts/DashboardLayout";
import PageHeading from "../../../components/common/theme/PageHeading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { SelectField } from "../../../components/common/Select/Select";
import styles from "./Users.module.scss";
import useFetchAdmin from "../../../hook/CustomHook/useFetchAdmin";
import ThemeButton from "../../../components/common/ThemeButton";
import LoadingBars from "../../../components/common/loader/LoadingBars";
import { SearchBar } from "../../../components/common/Searchbar/SearchBar";
import { TableLoader } from "../Designs";

//*Limit of records per page
export const pageLimitOptions = [
  { title: "Show 25", value: 25 },
  { title: "Show 50", value: 50 },
  { title: "Show 100", value: 100 },
];

const Users = () => {
  //*Starting page limit
  const [start, setStart] = useState(0);
  //* Default limit 25
  const [limit, setLimit] = useState(25);
  //* Page number starting from 1
  const [pageNumber, setPageNumber] = useState(1);
  //* Search query
  const [search, setSearch] = useState("");
  //*Total Records count
  const [totalCount, setTotalCount] = useState(0);
  //*List of number of pages we can display
  const [pageList, setPageList] = useState([]);
  //*Counting of total pages
  const totalPages = Math.ceil(totalCount / limit);

  //* Fetching the user list
  const [loadQuery, { response, loading, error }] = useFetchAdmin(
    `/users/list?start=${start}&limit=${limit}&search=${search}`,
    {
      method: "get",
    }
  );

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

  //* Trigger fetch whenever start, limit, or searchQuery changes
  useEffect(() => {
    const fetchData = async () => {
      const response = await loadQuery();
      if (response && response.data) {
        setTotalCount(response.data.data.total_records);
      }
    };

    fetchData();
  }, [start, limit, search]);

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
    setStart(selectedPage - 1);
  };
  const handleSearchChange = (e) => {
    setSearch(e.target.value); //* Update search input value
    setPageNumber(1); //* Reset to page 1 for new search
    setStart(0);
  };

  return (
    <DashboardLayout>
      <div>
        <PageHeading title="Users Listing" />

        <div>
          <SearchBar
            value={search}
            name="search"
            placeholder="Search users..."
            handleChange={handleSearchChange}
          />
        </div>
        <div>
          <div className={`theme_table ${styles.tableWrap}`}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User Name</TableCell>
                  <TableCell>Email Address</TableCell>
                  <TableCell>Phone number</TableCell>
                  <TableCell>Organization</TableCell>
                  <TableCell>Club</TableCell>
                  <TableCell>Team</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableLoader />
                ) : (
                  <>
                    {response?.data?.list?.map((list, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell>
                            {list?.first_name} {list?.last_name}
                          </TableCell>
                          <TableCell>{list?.email ?? "--"}</TableCell>
                          <TableCell>{list?.phone_number ?? "--"}</TableCell>
                          <TableCell>{list?.organization ?? "--"}</TableCell>
                          <TableCell>{list?.club ?? "--"}</TableCell>
                          <TableCell>{list?.team_name ?? "--"}</TableCell>
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

export default Users;
