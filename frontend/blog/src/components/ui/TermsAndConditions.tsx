import {
  ShieldCheck,
  Lock,
  Cookie,
  Eye,
  FileText,
  Heart,
  Calendar,
} from "lucide-react";

const TermsAndConditions = () => {
  const sections = [
    {
      id: 1,
      icon: <ShieldCheck />,
      title: "قوانین عمومی بلاگ اپ",
      content:
        "کاربر گرامی، لطفاً پیش از استفاده از خدمات بلاگ اپ، این قوانین را به دقت مطالعه فرمایید. استفاده شما از سایت به معنای پذیرش کامل این قوانین می‌باشد.",
    },
    {
      id: 2,
      icon: <Lock className="w-5 h-5" />,
      title: "حفظ حریم خصوصی",
      content:
        "بلاگ اپ متعهد به حفظ اطلاعات شخصی شما می‌باشد. اطلاعات شما نزد ما محفوظ مانده و هیچگاه بدون رضایت شما در اختیار شخص ثالث قرار نخواهد گرفت.",
    },
    {
      id: 3,
      icon: <Cookie />,
      title: "کوکی‌ها",
      content:
        "این سایت از کوکی‌ها برای بهبود تجربه کاربری شما استفاده می‌کند. با ادامه استفاده از سایت، با سیاست استفاده از کوکی‌ها موافقت می‌کنید.",
    },
    {
      id: 4,
      icon: <Eye />,
      title: "حقوق محتوا",
      content:
        "تمامی محتوای ارائه شده در این سایت، شامل مقالات و مطالب آموزشی، متعلق به بلاگ اپ بوده و هرگونه کپی‌برداری بدون ذکر منبع پیگرد قانونی دارد.",
    },
    {
      id: 5,
      icon: <FileText />,
      title: "تعهدات کاربر",
      content:
        "کاربر موظف است از اطلاعات ارائه شده صرفاً برای اهداف شخصی و آموزشی استفاده نموده و از هرگونه سوءاستفاده خودداری نماید. همچنین انتشار محتوای مغایر با قوانین اخلاقی ممنوع می‌باشد.",
    },
    {
      id: 6,
      icon: <Heart />,
      title: "ارتباط با ما",
      content:
        "برای ارتباط با تیم پشتیبانی بلاگ اپ می‌توانید از طریق بخش 'تماس با ما' یا ارسال ایمیل به info@blogapp.com اقدام نمایید.",
    },
  ];

  return (
    <div className="mx-auto text-surface/50">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-center text-surface mb-2">
          به
          <span
            className="
                    relative inline-block px-2 
                    bg-gradient-to-b from-primary-300 to-primary-100 
                    bg-clip-text text-transparent 
                    drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.1)] 
                    dark:drop-shadow-[0_0_20px_rgba(66,185,168,0.4)]
                    animate-pulse duration-[3000ms]
                  "
          >
            بلاگ اپ
          </span>
          خوش آمدید
        </h1>
        <p className="text-lg text-surface/70 max-w-2xl mx-auto leading-relaxed">
          ما در بلاگ اپ با عشق و تعهد، بهترین مطالب و محتوای آموزشی را برای شما
          به اشتراک می‌گذاریم. لطفاً پیش از استفاده از خدمات، با قوانین ما آشنا
          شوید.
        </p>
      </header>

      {/* تاریخ آخرین به‌روزرسانی */}
      <div className="bg-primary-50/30 text-primary-300 rounded-lg p-4 mb-10 text-center flex items-center justify-center gap-2">
        <Calendar className="w-4 h-4" />
        <p className="text-md">آخرین به‌روزرسانی:  ۲۱ اردیبهشت ۱۴۰۵</p>
      </div>

      {/* لیست قوانین */}
      <div className="space-y-8 mb-12">
        {sections.map((section) => (
          <div
            key={section.id}
            className="group border-b border-surface/20 pb-6 last:border-0 hover:border-primary-200 transition-colors"
          >
            <div className="flex px-2 items-center gap-1 mb-3 text-surface/80 group-hover:scale-103 group-hover:-translate-x-1 transition-all duration-700 ease-in-out">
              <span className="w-7 h-7 md:w-7 md:h-7">{section.icon}</span>
              <h2 className="text-xl font-bold">{section.title}</h2>
            </div>
            <p className="leading-relaxed mr-8 text-surface/70 text-md">{section.content}</p>
          </div>
        ))}
      </div>

      {/* متن پایانی */}
      <div className="bg-secondary-100/30 rounded-xl p-8 mt-10 text-center">
        <Heart
          className="w-8 h-8 text-primary-300 mx-auto mb-3"
          fill="currentColor"
        />
        <p className="text-surface/90 leading-relaxed text-lg">
          با آرزوی موفقیت و لحظات خوش در بلاگ اپ
        </p>
        <p className="text-surface/50 mt-2">
          همراه شما هستیم تا بهترین تجربه اشتراک‌گذاری دانش را داشته باشید.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;