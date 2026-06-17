import SigninForm from "@/features/auth/components/SigninForm";

export const metadata = {
  title: "ورود به حساب کاربری",
  description: "به وبلاگ اپ خوش آمدید. وارد حساب کاربری خود شوید.",
};

export default function SignInPage() {
  return (
    <div className="w-full max-w-[340px] md:max-w-md">
      <SigninForm />
    </div>
  );
}
