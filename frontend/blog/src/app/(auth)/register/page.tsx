import RegisterForm from "features/auth/components/RegisterForm";

export const metadata = {
  title: "ایجاد حساب کاربری",
  description:
    "به وبلاگ اپ بپیوندید و از مقالات و محتوای آموزشی ما بهره‌مند شوید.",
};

export default function RegisterPage() {
  return (
    <div className="w-full max-w-[340px] md:max-w-md mx-auto">
      <RegisterForm />
    </div>
  );
}
