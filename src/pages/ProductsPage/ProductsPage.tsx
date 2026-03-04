import { useEffect, useMemo, useState } from "react";
import { Alert, Button, Input, Space, Table, Typography, message } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/storeHooks";
import { logout } from "../../features/auth/model/authSlice";
import {
  useGetProductsQuery,
  useSearchProductsQuery
} from "../../entities/product/api/productApi";
import {
  Product,
  ProductSortField,
  SortOrder
} from "../../entities/product/model/types";
import { setSorting } from "../../entities/product/model/productsUiSlice";
import { useDebouncedValue } from "../../shared/lib/hooks/useDebouncedValue";
import { AddProductModal } from "../../features/productAdd/ui/AddProductModal";
import styles from "./ProductsPage.module.css";

const PAGE_LIMIT = 20;

const stableSortProducts = (
  products: Product[],
  sortBy: ProductSortField,
  order: SortOrder
) => {
  const direction = order === "asc" ? 1 : -1;
  return products
    .map((item, index) => ({ item, index }))
    .sort((a, b) => {
      const left = a.item[sortBy];
      const right = b.item[sortBy];
      if (left === right) return a.index - b.index;
      if (left === undefined) return 1;
      if (right === undefined) return -1;
      if (typeof left === "string" && typeof right === "string") {
        return left.localeCompare(right) * direction;
      }
      return (Number(left) - Number(right)) * direction;
    })
    .map((entry) => entry.item);
};

export const ProductsPage = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [localProducts, setLocalProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") ?? "");
  const debouncedSearch = useDebouncedValue(searchTerm, 300);
  const trimmedSearch = debouncedSearch.trim();
  const useSearch = trimmedSearch.length > 0;
  const { sortBy, order } = useAppSelector((state) => state.productsUi);

  const commonArgs = {
    limit: PAGE_LIMIT,
    skip: 0,
    sortBy,
    order
  };

  const defaultProducts = useGetProductsQuery(commonArgs, {
    skip: useSearch
  });
  const searchedProducts = useSearchProductsQuery(
    { ...commonArgs, query: trimmedSearch },
    { skip: !useSearch }
  );

  const activeQuery = useSearch ? searchedProducts : defaultProducts;
  const apiProducts = activeQuery.data?.products ?? [];
  const tableData = useMemo(
    () => stableSortProducts([...localProducts, ...apiProducts], sortBy, order),
    [apiProducts, localProducts, order, sortBy]
  );

  useEffect(() => {
    const nextParams = new URLSearchParams();
    if (searchTerm.trim()) {
      nextParams.set("q", searchTerm.trim());
    }
    setSearchParams(nextParams, { replace: true });
  }, [searchTerm, setSearchParams]);

  useEffect(() => {
    if (activeQuery.error) {
      message.error("Failed to load products");
    }
  }, [activeQuery.error]);

  const handleLogout = () => {
    dispatch(logout());
    message.success("Logged out");
  };

  const handleAddProduct = (product: Product) => {
    setLocalProducts((prev) => [product, ...prev]);
    setIsAddModalOpen(false);
    message.success("Product added locally");
  };

  const handleTableChange: TableProps<Product>["onChange"] = (_, __, sorter) => {
    if (Array.isArray(sorter)) return;
    if (!sorter.field || !sorter.order) return;

    const field = sorter.field as ProductSortField;
    const nextOrder: SortOrder = sorter.order === "ascend" ? "asc" : "desc";
    dispatch(setSorting({ sortBy: field, order: nextOrder }));
  };

  const columns: ColumnsType<Product> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: true,
      sortOrder:
        sortBy === "title" ? (order === "asc" ? "ascend" : "descend") : null
    },
    {
      title: "Vendor",
      dataIndex: "brand",
      key: "brand",
      render: (value: string | undefined) => value ?? "-"
    },
    {
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
      render: (value: string | undefined, record) =>
        value ?? `SKU-${record.id.toString()}`
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: true,
      sortOrder:
        sortBy === "price" ? (order === "asc" ? "ascend" : "descend") : null,
      render: (value: number) => `$${value.toFixed(2)}`
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      sorter: true,
      sortOrder:
        sortBy === "rating" ? (order === "asc" ? "ascend" : "descend") : null,
      render: (value: number) => (
        <span style={{ color: value < 3 ? "#ff4d4f" : undefined }}>
          {value.toFixed(1)}
        </span>
      )
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (value: string | undefined) => value ?? "-"
    }
  ];

  return (
    <div className={styles.page}>
      <div className={styles.panel}>
        <div className={styles.topBar}>
          <div>
            <Typography.Title level={3} style={{ margin: 0 }}>
              Products
            </Typography.Title>
            <Typography.Text type="secondary">
              Browse, search and sort product records.
            </Typography.Text>
          </div>
          <Button onClick={handleLogout}>Logout</Button>
        </div>

        <div className={styles.topBar}>
          <Space className={styles.controls}>
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              allowClear
              style={{ width: 320 }}
            />
            <Button type="primary" onClick={() => setIsAddModalOpen(true)}>
              Add
            </Button>
          </Space>
        </div>

        {activeQuery.error ? (
          <Alert
            type="error"
            showIcon
            message="Could not fetch products from API."
            style={{ marginBottom: 16 }}
          />
        ) : null}

        <Table<Product>
          rowKey="id"
          columns={columns}
          dataSource={tableData}
          loading={activeQuery.isLoading || activeQuery.isFetching}
          onChange={handleTableChange}
          pagination={{ pageSize: PAGE_LIMIT, hideOnSinglePage: false }}
        />
      </div>

      <AddProductModal
        open={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        onCreate={handleAddProduct}
      />
    </div>
  );
};
