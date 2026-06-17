import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(5, "نام باید حداقل ۵ کاراکتر باشد")
    .max(50, "نام باید حداکثر ۵۰ کاراکتر باشد"),
  email: z
    .string()
    .email("فرمت ایمیل معتبر نیست"),
  password: z
    .string()
    .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد"),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;