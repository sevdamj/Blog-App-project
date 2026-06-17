"use client";

import { useState } from "react";
import { createComment } from "@/lib/actions";
import toast from "react-hot-toast";
import TextArea from "../ui/TextArea";
import Button from "@/components/ui/Button";

interface CommentFormProps {
  postId: string;
  parentId: string | null;
  onClose: () => void;
}

const CommentForm = ({ postId, parentId, onClose }: CommentFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!text.trim()) {
      toast.error("متن نظر نمی‌تواند خالی باشد");
      return;
    }

    setIsLoading(true);
    
    try {
      const formData = new FormData();
      formData.append("text", text);
      
      const result = await createComment(
        { error: "", message: "" },
        { formData, postId, parentId }
      );
      
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(result.message || "نظر شما با موفقیت ثبت شد");
        setText("");
        onClose();
      }
    } catch (error) {
      toast.error("خطا در ثبت نظر");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      <TextArea
        name="text"
        label="متن نظر"
        isRequired
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="mt-8">
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "در حال ثبت..." : "تایید"}
        </Button>
      </div>
    </form>
  );
};

export default CommentForm;



// => تو این تکست اریا -> نیازی ب value,onchange ,state نیس => اجباری نیست

// server actions : THIS ACTIONS RUN ON SERVER NOT USER BROWSER

// in this component we use server action for sumbit our form

// !! we can use this actions in server/client component

// 1. IN SERVER COMPONENT => add "use server"  inside your component

// 2. IN CLIENT COMPONENT =>
// 1.create an file for actions -> and write your action's in this file ->
// -> and write "use server"  inside your file
// 2. than add this file into your client component

// -----------------------------------------------------------------------------

// HINT :
// "use server" => فقط وقتی ک نیازه از اکشن استفاده کنیم -> هرجا دلت خواست نباید استفاده کنی
// "use client" => وقتی نیازه کامپوننت رو تبدیل ب کلاینت کامپوننت کنیم

// ------------------------------------------------------------------------------

// in actions =>
// ببین وقتی نیازه یسری پراپرتی های دیگه رو پاس بدی ب اکشن ها ک ->
// این پراپرتی ها از خود ای پی ای گرفته نمیشن یا از خود فرم نمیان باید از این روش استفاده کنی:
// اینجا ما ب ایدی پست و پرنت نیاز داشتیم و درحالی ک فرم دیتا فقط تکست رو ب ما میداد
// و شامل این دو تا دیتای دیگ نمیشد -> پس ما این روش رو استفاده کردیم تا همه دیتای مدنظرمون رو بغرستیم

//  action={createComment} => changed to => action={createComment.bind(null,postId,parent)}

// ------------------------------------------------------------------------------

// we use this hook : useActionState()  =>
// این هوک کارش ی چیز دیگس ولی هدف ما از استفاده ازش اینه ک => بیایم پیام ارور و موفقیت رو نشون بدیم

// ** hint : این اکشن رو با فرم اکشن باید ب این صورت بنویسی تا جواب بده =>  وگرنه ارور میده :
//   action={async (formData) =>{
//     await formAction({formData,postId,parentId});
//   }}