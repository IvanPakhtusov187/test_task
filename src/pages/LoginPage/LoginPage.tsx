import { Alert, Button, Card, Checkbox, Form, Input, Typography, message } from "antd";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/storeHooks";
import { setCredentials } from "../../features/auth/model/authSlice";
import { useLoginMutation } from "../../features/auth/api/authApi";
import styles from "./LoginPage.module.css";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean()
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "emilys",
      password: "emilyspass",
      rememberMe: true
    }
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const response = await login({
        username: values.username,
        password: values.password
      }).unwrap();

      dispatch(
        setCredentials({
          token: response.accessToken,
          userId: response.id,
          rememberMe: values.rememberMe
        })
      );
      message.success("Logged in successfully");
      navigate("/products", { replace: true });
    } catch {
      const errorText = "Invalid username or password";
      setError("root", { message: errorText });
      message.error(errorText);
    }
  };

  return (
    <div className={styles.wrap}>
      <Card className={styles.card}>
        <Typography.Title level={3}>Admin Login</Typography.Title>
        <Typography.Paragraph type="secondary">
          Sign in to manage products.
        </Typography.Paragraph>

        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          <Form.Item
            label="Username"
            validateStatus={errors.username ? "error" : ""}
            help={errors.username?.message}
          >
            <Controller
              name="username"
              control={control}
              render={({ field }) => <Input {...field} placeholder="Username" />}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            validateStatus={errors.password ? "error" : ""}
            help={errors.password?.message}
          >
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input.Password {...field} placeholder="Password" />
              )}
            />
          </Form.Item>

          <Form.Item>
            <Controller
              name="rememberMe"
              control={control}
              render={({ field }) => (
                <Checkbox
                  checked={field.value}
                  onChange={(event) => field.onChange(event.target.checked)}
                >
                  Remember me
                </Checkbox>
              )}
            />
          </Form.Item>

          {errors.root?.message ? (
            <Form.Item>
              <Alert type="error" message={errors.root.message} showIcon />
            </Form.Item>
          ) : null}

          <Button type="primary" htmlType="submit" block loading={isLoading}>
            Login
          </Button>
        </Form>
      </Card>
    </div>
  );
};
