"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { login } from "./action";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react"; // Assuming you have lucide-react
import Link from "next/link";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

type FormValues = z.infer<typeof formSchema>;

const LoginIn = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    // Note: Since 'login' is a Server Action, we wrap it in a client-side handler
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    await login(formData);
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center h-screen px-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Admin Login
          </CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-between flex-1"
        >
          <CardContent className="grid gap-4">
            {/* Email Field */}
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                {...register("email")}
                id="email"
                type="email"
                placeholder="Enter your email..."
                disabled={isLoading}
              />
              {errors.email && <FieldError>{errors.email.message}</FieldError>}
            </Field>

            {/* Password Field */}
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                {...register("password")}
                id="password"
                type="password"
                placeholder="Enter your password..."
                disabled={isLoading}
              />
              {errors.password && (
                <FieldError>{errors.password.message}</FieldError>
              )}
            </Field>
          </CardContent>

          <CardFooter className="pt-6 gap-4 flex">
            <div className="flex gap-2">
              <Button variant="outline">
                <Link href="/home">Home</Link>
              </Button>
              <Button variant="default" type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign In
              </Button>
            </div>
            <div className="w-full text-end text-sm text-blue-500 cursor-pointer">
              <Link href="/signup">Sign Up</Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default LoginIn;
