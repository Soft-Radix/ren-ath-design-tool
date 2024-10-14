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
import useDataFetch from "../../../hook/CustomHook/useDataFetch";
import { getAdminLocalData } from "../../../utils/common";

export const TableLoader = () => (
  <>
    {[...Array(10)].map(() => {
      return (
        <TableRow>
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
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const token = getAdminLocalData();

  const { data, loading, error } = useDataFetch(
    `${baseURL}/design-all/list`,
    token
  );

  const [pagination, setPagination] = useState({
    pageNumber: 1,
    totalPage: 1,
    startPage: 0,
    pageLimit: 30,
  });
  const pageLimitOptions = [
    { title: "Show 30", value: 30 },
    { title: "Show 50", value: 50 },
    { title: "Show 100", value: 100 },
  ];

  return (
    <DashboardLayout>
      <div>
        <PageHeading title="Designs Listing" />
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
                    {data &&
                      data?.data?.list?.map((item, index) => {
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
          </div>
          <div className={styles.pagination}>
            <SelectField
              name="type"
              className={styles.pagination_type_mobile}
              value={pagination?.pageLimit?.toString()}
              options={pageLimitOptions}
              onChange={(e) =>
                setPagination({
                  ...pagination,
                  pageLimit: e.target.value,
                })
              }
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Designs;
