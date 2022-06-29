import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import FlexContainer from "../layouts/flex-container";
import _ from "lodash";
import CheckBox from "../atoms/checkbox";
import Icon, { Sizes } from "../atoms/icon";
import { v4 as uuid } from "uuid";
import { useContextMenu } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
import ContextMenu, { ContextMenuItems } from "../atoms/context-menu";

const HeaderHeight = 40;

interface ColumnShema<T> {
  key: string;
  label: string;
  width: number;
  minWidth?: number;
  getValue?: (row: T) => string | JSX.Element;
}

type PropsType<T> = {
  columns: Array<ColumnShema<T>>;
  height: string;
  rows: Array<T>;
  allowRowSelection?: boolean;
  disableRowSelection?: (row: T) => boolean;
  hiddenColumns?: Array<number>;
  className?: string;
  onRowClicked?: (row: T) => void;
  disableRowClick?: boolean;
  onSelectionChanged?: (row: Array<T>) => void;
  editableRow?: (row: T) => boolean;
  deletableRow?: (row: T) => boolean;
  menuItem?: Array<ContextMenuItems>;
};

const Container = styled(FlexContainer)<{ width: string; height: string }>`
  width: ${(props) => props.width};
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  height: ${(props) => props.height};
  border: 1px solid ${(props) => props.theme.colors.border};

  & {
    .table-row-edit-icon,
    .table-row-delete-icon {
      color: ${(props) => props.theme.colors.font_secondary};
    }
  }
`;

const TableHeadRow = styled(FlexContainer)`
  height: ${HeaderHeight}px;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  color: ${(props) => props.theme.components.table_header_color};
  background: ${(props) => props.theme.components.table_header_bg};
  padding: 0 30px 0 30px;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`;

const Column = styled(FlexContainer)<{
  minWidth?: number;
  width: number;
  hide?: boolean;
}>`
  width: ${(props) => props.width}%;
  display: ${(props) => (props.hide ? "none" : "")};
  min-width: ${(props) => props.minWidth}px;
`;

const HeaderColumn = styled(Column)`
  justify-content: flex-start;
  font-weight: 700;
  font-size: 14px;
  text-transform: capitalize;
`;

const TableRow = styled(FlexContainer)<{
  active?: boolean;
  clickable: boolean;
}>`
  width: 100%;
  justify-content: flex-start;
  padding: 0 30px 0 30px;
  color: ${(props) => props.theme.colors.font_primary};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  cursor: ${(props) => (props.clickable ? "pointer" : "")};
  background: ${(props) =>
    props.active ? props.theme.components.table_row_hover : ""};

  &:hover {
    background: ${(props) => props.theme.components.table_row_hover};
  }
`;

const TableColumn = styled(HeaderColumn)`
  height: 40px;
  font-weight: 600;
  font-size: 13px;
  text-transform: none;
`;

const TableBody = styled(FlexContainer)<{ height: string }>`
  height: ${(props) => props.height};
  width: 100%;
  justify-content: flex-start;
  overflow: auto;
  flex-direction: column;
`;

export default function SummaryTable<T>(props: PropsType<T>) {
  const {
    columns,
    rows = [],
    height,
    allowRowSelection = false,
    disableRowSelection,
    hiddenColumns = [],
    className,
    onRowClicked: onRowClickedCallback,
    disableRowClick = false,
    menuItem = [],
  } = props;
  const [activeRowIndex, setActiveRowIndex] = useState(-1);
  const [menuId] = useState(uuid());
  const { show: showMenu } = useContextMenu({
    id: menuId,
  });
  const [selectedRows, setSelectedRows] = useState([] as Array<number>);
  const [notSelectableRows, setNotSelectableRows] = useState(
    [] as Array<number>,
  );

  const shouldHideColumn = useCallback(
    (index) => {
      return hiddenColumns.includes(index);
    },
    [rows, hiddenColumns],
  );

  useEffect(() => {
    if (disableRowSelection) {
      const disabledRows: Array<number> = [];
      rows.forEach((row: T, index: number) => {
        if (_.isFunction(disableRowSelection) && disableRowSelection(row)) {
          disabledRows.push(index);
        }
      });
      setNotSelectableRows(disabledRows);
    }
  }, [rows]);

  useEffect(() => {
    if (props.onSelectionChanged && _.isFunction(props.onSelectionChanged)) {
      props.onSelectionChanged(
        rows.filter((r, index) => selectedRows.includes(index)),
      );
    }
  }, [selectedRows]);

  const onRowClicked = useCallback((row: T, rowIndex: number) => {
    if (activeRowIndex != rowIndex) {
      setActiveRowIndex(rowIndex);
      _.isFunction(onRowClickedCallback) && onRowClickedCallback(row);
    }
  }, []);

  const onRowSelected = (checked: boolean, rowIndex: number) => {
    if (checked) {
      setSelectedRows([...selectedRows, rowIndex]);
    } else {
      setSelectedRows(_.without(selectedRows, rowIndex));
    }
  };

  const onAllRowsSelected = (checked: boolean) => {
    if (checked) {
      setSelectedRows(
        rows.map((r, i) => i).filter((i) => !notSelectableRows.includes(i)),
      );
    } else {
      setSelectedRows([]);
    }
  };

  const renderContextMenu = (row: T) => {
    return (
      <Icon
        name="more"
        size={Sizes.XXL}
        onClick={(e) => {
          showMenu(e, {
            props: row,
            position: {
              x:
                e.pageX + 200 > document.documentElement.clientWidth
                  ? document.documentElement.clientWidth - 200
                  : e.pageX + 20,
              y: e.pageY + 10,
            },
          });
        }}
      />
    );
  };

  return (
    <Container
      height={height}
      width={hiddenColumns.length ? "auto" : "100%"}
      className={className}
    >
      <TableHeadRow>
        {allowRowSelection && (
          <HeaderColumn
            key={"table-header-col-checkbox"}
            minWidth={30}
            width={2}
            className="table-header-col-checkbox"
          >
            <CheckBox
              onChange={onAllRowsSelected}
              checked={
                rows.length > 0 &&
                selectedRows.length + notSelectableRows.length == rows.length
              }
              disabled={rows.length <= 0}
            />
          </HeaderColumn>
        )}
        {columns.map((c, cindex) => (
          <HeaderColumn
            minWidth={c.minWidth}
            key={"table-header-col-" + cindex}
            width={c.width}
            hide={shouldHideColumn(cindex)}
          >
            {c.label}
          </HeaderColumn>
        ))}
        {!!menuItem.length && (
          <TableColumn
            key={`table-header-col-menu`}
            width={5}
            minWidth={30}
            className="table-selection-col-checkbox"
          />
        )}
      </TableHeadRow>
      <TableBody height={`calc(100% - ${HeaderHeight}px)`}>
        {rows.map((row: T, index: number) => {
          const rowKey = `table-row-${index}`;
          return (
            <TableRow
              key={rowKey}
              active={activeRowIndex == index}
              clickable={!disableRowClick}
            >
              {allowRowSelection && (
                <TableColumn
                  key={`${rowKey}-checkbox`}
                  width={2}
                  minWidth={30}
                  className="table-selection-col-checkbox"
                >
                  <CheckBox
                    disabled={
                      _.isFunction(disableRowSelection) &&
                      disableRowSelection(row)
                    }
                    onChange={(checked: boolean) =>
                      onRowSelected(checked, index)
                    }
                    checked={selectedRows.includes(index)}
                  />
                </TableColumn>
              )}
              {columns.map((c, cindex) => (
                <TableColumn
                  onClick={
                    disableRowClick
                      ? undefined
                      : () => {
                          onRowClicked(row, index);
                        }
                  }
                  key={`${rowKey}-col-${cindex}`}
                  width={c.width}
                  minWidth={c.minWidth}
                  hide={shouldHideColumn(cindex)}
                >
                  {_.isFunction(c.getValue)
                    ? c.getValue(row)
                    : (row as any)[c.key as any]}
                </TableColumn>
              ))}

              {!!menuItem.length && renderContextMenu(row)}
            </TableRow>
          );
        })}
      </TableBody>
      <ContextMenu id={menuId} menuItems={menuItem} />
    </Container>
  );
}
