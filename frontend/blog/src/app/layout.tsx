import "@/styles/globals.css";
import styles from "@/components/ui/module/meshAnimations.module.css";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

export const metadata = {
  title: {
    template: " %s | بلاگ اپ",
    default: "بلاگ اپ",
  },
  description: "وب اپلیکیشن مدیریت بلاگ ها و نظرات کاربران",
  keywords: ["وبلاگ ها", "موضوعات متنوع"],
   icons: {
    icon: "/favicon.ico",
  },
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
        <html lang="fa" dir="rtl" suppressHydrationWarning>
        <body className="min-h-screen font-sans antialiased">
        <div className={`fixed inset-0 -z-10 ${styles["hero-mesh-gradient"]}`} />
        <ReactQueryProvider>
            {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}