import { Button, Form, Input, InputNumber, Modal } from "antd";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Product } from "../../../entities/product/model/types";

const addProductSchema = z.object({
  title: z.string().min(1, "Name is required"),
  price: z
    .number({
      required_error: "Price is required",
      invalid_type_error: "Price must be a number"
    })
    .positive("Price must be greater than 0"),
  brand: z.string().min(1, "Vendor is required"),
  sku: z.string().min(1, "SKU is required")
});

type AddProductFormValues = z.infer<typeof addProductSchema>;

interface AddProductModalProps {
  open: boolean;
  onCancel: () => void;
  onCreate: (product: Product) => void;
}

export const AddProductModal = ({
  open,
  onCancel,
  onCreate
}: AddProductModalProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<AddProductFormValues>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      title: "",
      brand: "",
      sku: ""
    }
  });

  const closeModal = () => {
    reset();
    onCancel();
  };

  const submit = (values: AddProductFormValues) => {
    const newProduct: Product = {
      id: Date.now(),
      title: values.title,
      brand: values.brand,
      sku: values.sku,
      price: values.price,
      rating: 0,
      isLocal: true
    };
    onCreate(newProduct);
    reset();
  };

  return (
    <Modal
      title="Add Product"
      open={open}
      onCancel={closeModal}
      footer={null}
      destroyOnClose
    >
      <Form layout="vertical" onFinish={handleSubmit(submit)}>
        <Form.Item
          label="Name"
          validateStatus={errors.title ? "error" : ""}
          help={errors.title?.message}
        >
          <Controller
            name="title"
            control={control}
            render={({ field }) => <Input {...field} placeholder="Product name" />}
          />
        </Form.Item>

        <Form.Item
          label="Price"
          validateStatus={errors.price ? "error" : ""}
          help={errors.price?.message}
        >
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <InputNumber
                value={field.value}
                onChange={(value) => field.onChange(value ?? 0)}
                style={{ width: "100%" }}
                min={0}
                step={0.01}
                placeholder="Price"
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Vendor"
          validateStatus={errors.brand ? "error" : ""}
          help={errors.brand?.message}
        >
          <Controller
            name="brand"
            control={control}
            render={({ field }) => <Input {...field} placeholder="Vendor" />}
          />
        </Form.Item>

        <Form.Item
          label="SKU"
          validateStatus={errors.sku ? "error" : ""}
          help={errors.sku?.message}
        >
          <Controller
            name="sku"
            control={control}
            render={({ field }) => <Input {...field} placeholder="SKU" />}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          Add Product
        </Button>
      </Form>
    </Modal>
  );
};
