"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { UserPlus } from "lucide-react";
import toast from "react-hot-toast";
import { z } from "zod";

import RHFTextField from "@/components/ui/RHFTextField";
import Button from "@/components/ui/Button";
import SpinnerMini from "@/components/ui/SpinnerMini";
import { useAuthStore } from "../store/useAuthStore";
import Link from "next/link";

const registerSchema = z.object({
  name: z.string().min(5, "حداقل ۵ کاراکتر").max(50, "حداکثر ۵۰ کاراکتر"),
  email: z.string().email("ایمیل نامعتبر است"),
  password: z.string().min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

function RegisterForm() {
  const router = useRouter();
  const { signup, isLoading, refreshUser } = useAuthStore();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
  });

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      await signup(values);
      toast.success("ثبت‌نام با موفقیت انجام شد.");

      // مهم: اطلاعات کاربر رو از سرور دوباره بگیر
      await refreshUser();

      // صفحه رو رفرش کن
      router.refresh();

      // برو به پروفایل
      router.push("/");
    } catch (err: unknown) {
      const error = err as {
        response?: {
          status?: number;
          data?: { message?: string; errors?: Record<string, string[]> };
        };
      };
      if (error.response?.status === 422) {
        const serverErrors = error.response.data?.errors;
        if (serverErrors) {
          Object.entries(serverErrors).forEach(([field, messages]) => {
            let fieldName: keyof RegisterFormValues = "name";
            if (field === "email") fieldName = "email";
            if (field === "password") fieldName = "password";
            setError(fieldName, {
              type: "server",
              message: messages?.[0] || "خطا در این فیلد",
            });
          });
        }
      } else {
        toast.error(error.response?.data?.message || "خطایی رخ داد");
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-black text-surface/70 mb-2">
          ایجاد حساب کاربری
        </h1>
        <p className="text-secondary-400 text-sm">
          برای عضویت، اطلاعات زیر را وارد کنید
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <RHFTextField<RegisterFormValues>
          isRequired
          name="name"
          label="نام و نام خانوادگی"
          register={register}
          errors={errors}
          placeholder="مثلا: سودا مهدیزاده"
        />

        <RHFTextField<RegisterFormValues>
          isRequired
          name="email"
          label="ایمیل"
          register={register}
          errors={errors}
          type="email"
          placeholder="info@example.com"
        />

        <RHFTextField<RegisterFormValues>
          isRequired
          name="password"
          label="رمز عبور"
          register={register}
          errors={errors}
          type="password"
          placeholder="••••••••"
        />

        <Button
          type="submit"
          variant="primary"
          disabled={isLoading}
          className="w-full py-4 rounded-2xl shadow-lg shadow-primary-300/20 mt-6"
        >
          <div className="flex items-center justify-center gap-2">
            {isLoading ? (
              <SpinnerMini show size="w-5 h-5" />
            ) : (
              <UserPlus size={18} />
            )}
            <span>{isLoading ? "در حال ثبت‌نام..." : "ثبت نام"}</span>
          </div>
        </Button>
      </form>

      <div className="text-center pt-6 mt-4 text-sm border-t border-secondary-100">
        <p className="text-secondary-400">
          قبلاً عضو شده‌اید؟{" "}
          <Link
            href="/signin"
            className="font-bold text-primary-300 hover:underline"
          >
            وارد شوید
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterForm;