import React, { useState } from "react";
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

const Users = () => {
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
        <PageHeading title="Users Listing" />
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
                {[...Array(10)].map(() => {
                  return (
                    <TableRow>
                      <TableCell>Bernad Does</TableCell>
                      <TableCell>bbryan@nrgvbc.com</TableCell>
                      <TableCell>+914343232321</TableCell>
                      <TableCell>Player</TableCell>
                      <TableCell>Amanda</TableCell>
                      <TableCell>Football</TableCell>
                    </TableRow>
                  );
                })}
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

export default Users;
