"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogIn } from "lucide-react";
import toast from "react-hot-toast";
import RHFTextField from "@/components/ui/RHFTextField";
import Button from "@/components/ui/Button";
import SpinnerMini from "@/components/ui/SpinnerMini";
import { signinSchema } from "../schema/signinSchemas";
import { useAuthStore } from "../store/useAuthStore";
import { SigninData } from "../types/user";
import Logo from "@/components/ui/Logo";

// ==================== types ====================
interface ServerError {
  response?: {
    status?: number;
    data?: {
      message?: string;
      errors?: Record<string, string[]>;
    };
  };
}

function SigninForm() {
  const router = useRouter();
  const { signin, isLoading ,refreshUser} = useAuthStore();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SigninData>({
    resolver: zodResolver(signinSchema),
    mode: "onTouched",
  });

  const onSubmit = async (values: SigninData): Promise<void> => {

    try {
      await signin(values);
      toast.success("خوش آمدید! با موفقیت وارد شدید.");
          await refreshUser();
    
    router.refresh();
      router.push("/profile");
    } catch (err) {
      const error = err as ServerError;
      if (error.response?.status === 422) {
        const serverErrors = error.response.data?.errors;
        if (serverErrors) {
          Object.keys(serverErrors).forEach((field) => {
            setError(field as keyof SigninData, {
              type: "server",
              message: serverErrors[field][0],
            });
          });
        }
      } else if (error.response?.status === 401) {
        toast.error("ایمیل یا رمز عبور اشتباه است.");
      } else {
        toast.error(
          error.response?.data?.message ||
            "در حال حاضر امکان برقراری ارتباط با سرور نیست.",
        );
      }
    }
  };

  return (
    <div className="w-full mx-auto flex flex-col min-h-[480px]">
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center mb-3">
        <Logo
  width={60} 
  height={60} 
  className="mb-3"
/>
        </div>
        <h1 className="text-2xl font-black text-surface/70 mb-2">
          خوش برگشتی!
        </h1>
        <p className="text-sm text-surface/60 font-medium">
          اطلاعات حساب خود را وارد کنید
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-1 flex-1 mb-6">
        <RHFTextField
          isRequired
          name="email"
          label="ایمیل"
          register={register}
          errors={errors}
          type="email"
          placeholder="info@example.com"
        />

        <RHFTextField
          name="password"
          label="رمز عبور"
          register={register}
          isRequired
          errors={errors}
          type="password"
          placeholder="••••••••"
        />

        <Button
          variant="primary"
          className="w-full py-4 rounded-2xl shadow-xl shadow-primary-300/15 mt-2"
          type="submit"
          disabled={isLoading}
        >
          <div className="flex items-center justify-center gap-2">
            {isLoading ? (
              <SpinnerMini show size="w-5 h-5" />
            ) : (
              <LogIn size={18} />
            )}
            <span className="font-black text-sm">
              {isLoading ? "در حال بررسی..." : "ورود به حساب"}
            </span>
          </div>
        </Button>
      </form>

      <div className="text-center text-sm pt-2 border-t border-secondary-100">
        <p className="text-secondary-300">
          هنوز عضو نشده‌اید؟{" "}
          <Link
            href="/register"
            className="font-black text-primary-300 hover:text-primary-100"
          >
            ایجاد حساب جدید
          </Link>
        </p>
      </div>
    </div>
  );
 
}

export default SigninForm;
