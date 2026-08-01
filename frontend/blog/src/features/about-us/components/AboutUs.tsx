"use client";

import Image from "next/image";
import { toPersianDigits } from "@/utils/numberFormatter";
import Button from "../../../components/ui/Button";
import {
  EyeIcon,
  TargetIcon,
  Clock,
  Mail,
  MapPin,
  Phone,
  Edit3,
  Users,
  TrendingUp,
  Award,
} from "lucide-react";
import { LucideIcon } from "lucide-react";

interface ValueItem {
  title: string;
  desc: string;
  icon: LucideIcon;
}

interface ContactMethod {
  icon: LucideIcon;
  title: string;
  value: string;
  desc: string;
}

interface InfoCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
}

const AboutUs = () => {
  const values: ValueItem[] = [
    {
      title: "محتوای باکیفیت",
      desc: "مقالات آموزشی تخصصی و به‌روز",
      icon: Edit3,
    },
    {
      title: "جامعه فعال",
      desc: "ارتباط با نویسندگان و متخصصان",
      icon: Users,
    },
    {
      title: "یادگیری مستمر",
      desc: "همراه با آخرین ترندهای تکنولوژی",
      icon: TrendingUp,
    },
    {
      title: "تجربه برتر",
      desc: "محتوای ارزشمند برای مخاطبان",
      icon: Award,
    },
  ];

  const contactMethods: ContactMethod[] = [
    {
      icon: Phone,
      title: "تلفن پشتیبانی",
      value: "۰۲۱-۱۲۳۴۵۶۷۸",
      desc: "۲۴ ساعته، ۷ روز هفته",
    },
    {
      icon: Mail,
      title: "ایمیل",
      value: "support@blogapp.ir",
      desc: "پاسخگویی ظرف ۲۴ ساعت",
    },
    {
      icon: MapPin,
      title: "آدرس",
      value: "تهران، خیابان ولیعصر، خیابان شهید بهشتی",
      desc: "پلاک ۱۲۳، واحد ۵",
    },
    {
      icon: Clock,
      title: "ساعات کاری",
      value: "شنبه تا پنجشنبه",
      desc: "۹ صبح تا ۹ شب",
    },
  ];

  return (
    <section className="text-surface/70">
      <header className="pb-20">
        <div>
          <h1 className="text-4xl font-bold text-center text-surface">
            درباره
            <span
              className="
                relative inline-block px-2 
                bg-gradient-to-b from-primary-300 to-primary-200 
                bg-clip-text text-transparent 
                drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.1)] 
                dark:drop-shadow-[0_0_20px_rgba(66,185,168,0.4)]
                animate-pulse duration-[3000ms]
              "
            >
              بلاگ
            </span>
            اپ
          </h1>
          <p className="text-center mt-4 text-lg text-surface/70">
            جایی برای اشتراک‌گذاری دانش و تجربه
          </p>
          <div className="w-24 h-1 bg-primary-100 mx-auto mt-2 rounded-full"></div>
        </div>
      </header>
      <div className="mx-auto px-4 sm:px-4 lg:px-6 space-y-18 md:space-y-23">
        {/* بخش معرفی */}
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-surface">ما کیستیم؟</h2>
            <p className="leading-relaxed">
              بلاگ اپ یک پلتفرم تخصصی برای انتشار مقالات و محتوای آموزشی در حوزه های مختلف از جمله
              برنامه‌نویسی، فناوری اطلاعات، توسعه فردی و... است.
            </p>
            <p className="leading-relaxed">
              تیم ما متشکل از نویسندگان و متخصصان باتجربه است که سال‌ها در صنعت
              نرم‌افزار فعالیت داشته‌اند و حالا دانش و تجربیات خود را در قالب
              مقالات ارزشمند با شما به اشتراک می‌گذارند.
            </p>

            {/* آمار */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-300">
                  +{toPersianDigits(250)}
                </div>
                <div className="text-secondary-400">مقاله</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-300">
                  +{toPersianDigits(15)}
                </div>
                <div className="text-secondary-400">نویسنده</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-300">
                  +{toPersianDigits(5000)}
                </div>
                <div className="text-secondary-400">مخاطب فعال</div>
              </div>
            </div>

            {/* دکمه لینک */}
            <div className="flex gap-6 pt-4">
              <Button
                onClick={() => {}}
                href="/blogs"
                variant="primary"
                size="responsive"
                className="w-full shadow-brand hover:scale-105 transition-transform"
              >
                مشاهده مقالات
              </Button>

              <Button
                onClick={() => {}}
                href="#contactUs"
                variant="outline"
                size="responsive"
                className="w-full border-2 border-primary-300/50 text-primary-300 hover:bg-primary-300/30 transition-colors"
              >
                تماس با ما
              </Button>
            </div>
          </div>

          <div className="relative hidden md:block h-96 rounded-3xl overflow-hidden shadow-xl group">
            <div className="relative w-full h-full z-10">
              <Image
                src="/images/blog-image.jpg"
                alt="تیم بلاگ اپ"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </div>
        </div>

        {/* ماموریت و چشم انداز */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 p-6">
          <InfoCard
            icon={TargetIcon}
            title="ماموریت ما"
            description="ارائه محتوای باکیفیت، به‌روز و کاربردی در حوزه برنامه‌نویسی و فناوری اطلاعات، تا دانشجویان و علاقه‌مندان بتوانند مهارت‌های خود را ارتقا دهند."
            bgColor="bg-surface/10"
            textColor="text-surface/90"
            borderColor="border-surface/10"
          />

          <InfoCard
            icon={EyeIcon}
            title="چشم‌انداز"
            description="تبدیل شدن به یکی از معتبرترین منابع آموزشی آنلاین در ایران و ایجاد جامعه‌ای پویا از برنامه‌نویسان و متخصصان فناوری اطلاعات."
            bgColor="bg-primary-100"
            textColor="text-secondary-50/90"
            borderColor="border-transparent"
          />
        </div>

        {/* ارزش‌ها */}
        <div>
          <h2 className="text-3xl font-bold text-center text-surface mb-5">
            ارزش‌های ما
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={index}
                  className="bg-surface/10 shadow-md hover:shadow-brand p-6 rounded-2xl transition-all duration-300 group hover:scale-105"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <IconComponent className="w-8 h-8 md:w-8 md:h-8 text-surface" />
                    <h3 className="text-xl text-surface font-bold">{item.title}</h3>
                  </div>
                  <p className="pr-2">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ارتباط با ما */}
        <div
          id="contactUs"
          className="mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <h1 className="text-2xl md:text-3xl font-bold mb-5 text-surface">
            تماس با ما
          </h1>

          {/* روش‌های تماس */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <div
                  key={index}
                  className="bg-surface/10 rounded-2xl p-6 hover:shadow-brand transition-all duration-300 group hover:scale-105"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-primary-100 w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <IconComponent className="w-7 h-7 text-primary-300" />
                    </div>
                    <h3 className="text-xl font-bold text-surface">
                      {method.title}
                    </h3>
                  </div>
                  <p className="text-primary-300 font-bold text-base mb-1">
                    {method.value}
                  </p>
                  <p className="text-sm text-surface/60">{method.desc}</p>
                </div>
              );
            })}
          </div>

          {/* نقشه */}
          <div className="grid gap-10 items-start mt-8">
            <div className="space-y-6">
              <div className="bg-surface/10 rounded-3xl p-4 h-80 relative overflow-hidden shadow-lg hover:shadow-brand">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.2878796248767!2d51.41524131525915!3d35.70582698019034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e0154b4f8f8f9%3A0x5f8f8f8f8f8f8f8f!2sTehran%2C%20Valiasr%20St!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: "1rem" }}
                  allowFullScreen
                  loading="lazy"
                  className="filter grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-primary-300/10 to-transparent rounded-3xl border border-primary-300/20">
                <p className="text-surface/80">
                  تیم پشتیبانی ما ۲۴ ساعته آماده پاسخگویی به سوالات شماست
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;

function InfoCard({
  icon: Icon,
  title,
  description,
  bgColor = "bg-surface",
  textColor = "text-surface",
  borderColor = "border-secondary-100",
}: InfoCardProps) {
  return (
    <div
      className={`p-8 ${bgColor} border ${borderColor} rounded-3xl shadow-md hover:shadow-brand transition-all duration-300 hover:scale-102 hover:-translate-y-1 group`}
    >
      <h3
        className={`text-2xl ${textColor} font-bold mb-4 flex items-center gap-2`}
      >
        <span className="text-3xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
          <Icon size={24} className="md:w-8 md:h-8" />
        </span>
        {title}
      </h3>
      <p
        className={`leading-relaxed transition-colors duration-300 ${
          textColor === "text-surface" ? "text-surface/70" : textColor
        }`}
      >
        {description}
      </p>
    </div>
  );
}