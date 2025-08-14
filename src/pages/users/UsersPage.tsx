import { ModuleRegistry } from "ag-grid-community";
import { ClientSideRowModelModule } from "ag-grid-community";
ModuleRegistry.registerModules([ClientSideRowModelModule]);

import { useEffect, useMemo } from "react";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "../../entities/user/gql";
import { useUserStore } from "../../entities/user/model/userStore";
import type { User } from "../../entities/user/types";
import { STATUS_TAG_COLOR } from "../../shared/config/constants";
import { formatDDMMYYYY_HHmm } from "../../shared/lib/date";
import { ActionCell } from "../../shared/ui/ActionCell";
import { RoleCell } from "../../shared/ui/RoleCell";
import { AgGridReact } from "ag-grid-react";
import type { ColDef } from "ag-grid-community";
import { Button, Tag, Tooltip, Flex, Typography, Switch } from "antd";
import { useDeleteUser } from "../../features/user-delete/useDeleteUser";
import { useThemeStore } from "../../app/providers/themeStore";
import { UserFormModal } from "../../features/user-form/UserFormModal";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

export function UsersPage() {
  const { data } = useQuery(GET_USERS);
  const setUsers = useUserStore((s) => s.setUsers);
  const users = useUserStore((s) => s.users);
  const openForCreate = useUserStore((s) => s.openForCreate);
  const del = useDeleteUser();
  const mode = useThemeStore((s) => s.mode);
  const toggle = useThemeStore((s) => s.toggle);

  useEffect(() => {
    if (data?.users) setUsers(data.users);
  }, [data, setUsers]);

  const columnDefs = useMemo<ColDef<User>[]>(
    () => [
      { headerName: "ID", field: "id", width: 90 },
      {
        headerName: "Name",
        field: "name",
        sortable: true,
        filter: "agTextColumnFilter",
        flex: 1.2,
      },
      {
        headerName: "Email",
        field: "email",
        filter: "agTextColumnFilter",
        flex: 1.4,
      },
      {
        headerName: "Role",
        field: "role",
        sortable: true,
        filter: "agTextColumnFilter",
        width: 160,
        cellRenderer: (p: any) => <RoleCell data={p.data} />,
      },
      {
        headerName: "Status",
        field: "status",
        filter: "agTextColumnFilter",
        width: 140,
        cellRenderer: (p: any) => (
          <Tag
            color={STATUS_TAG_COLOR[p.value as keyof typeof STATUS_TAG_COLOR]}
          >
            {p.value}
          </Tag>
        ),
      },
      {
        headerName: "Registration Date",
        field: "createdAt",
        sortable: true,
        flex: 1,
        cellRenderer: (p: any) => (
          <Tooltip title={p.value}>{formatDDMMYYYY_HHmm(p.value)}</Tooltip>
        ),
      },
      {
        headerName: "Actions",
        width: 170,
        cellRenderer: (p: any) => <ActionCell data={p.data} onDelete={del} />,
      },
    ],
    [del]
  );

  return (
    // Full-viewport canvas, no scroll
    <section
      style={{
        position: "fixed",
        inset: 0,
        display: "grid",
        gridTemplateRows: "auto 1fr",
        padding: "clamp(16px, 2vw, 24px)",
        gap: "clamp(12px, 1.6vw, 20px)",
        background: mode === "dark" ? "#0f1114" : "#ffffff",
        boxSizing: "border-box",
        fontFamily:
          "'Inter', system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
      }}
    >
      {/* Perfectly centered heading with balanced sides */}
      <header
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
        }}
      >
        <div aria-hidden="true" />
        <Typography.Title
          level={2}
          style={{
            margin: 0,
            justifySelf: "center",
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          User Management Panel
        </Typography.Title>

        <Flex align="center" gap={12} style={{ justifySelf: "end" }}>
          <span>Dark</span>
          <Switch checked={mode === "dark"} onChange={toggle} />
          <Button type="primary" onClick={() => openForCreate()}>
            Add User
          </Button>
        </Flex>
      </header>

      {/* Grid fills remaining viewport height & full width */}
      <div style={{ minHeight: 0 }}>
        <div
          className="ag-theme-quartz" /* ensure correct class name */
          style={{
            height: "100%",
            width: "100%",
            borderRadius: 12,
            overflow: "hidden",
            boxShadow:
              mode === "dark"
                ? "0 6px 28px rgba(0,0,0,0.45)"
                : "0 8px 30px rgba(0,0,0,0.06)",
            transition: "box-shadow 240ms ease, transform 240ms ease",
          }}
        >
          <AgGridReact<User>
            theme="legacy"
            rowData={users}
            columnDefs={columnDefs}
            animateRows
            pagination
            paginationPageSize={10}
            paginationPageSizeSelector={[10, 20, 50, 100]}
          />
        </div>
      </div>

      <UserFormModal />
    </section>
  );
}
