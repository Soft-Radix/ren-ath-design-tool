import React, { useState } from "react";
import DashboardLayout from "../../../components/Layouts/DashboardLayout";
import PageHeading from "../../../components/common/theme/PageHeading";
import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { SelectField } from "../../../components/common/Select/Select";
import styles from "./Designs.module.scss";
import ThemeButton from "../../../components/common/ThemeButton";

const Designs = () => {
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
                {[...Array(10)].map((item, index) => {
                  return (
                    <TableRow>
                      <TableCell>T-shirt Design</TableCell>
                      <TableCell>Elizabeth Doe</TableCell>
                      <TableCell>bbryan@nrgvbc.com</TableCell>
                      <TableCell>Amanda</TableCell>
                      <TableCell>
                        {index === 2 ? (
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
