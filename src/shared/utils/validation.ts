import * as yup from "yup";
import { useI18n } from "@/shared/contexts";

export const useJobValidationSchema = () => {
  const { t } = useI18n();

  return yup.object().shape({
    title: yup
      .string()
      .required(t("job.titleRequired"))
      .min(3, t("job.titleMinLength"))
      .max(255, t("job.titleMaxLength")),

    description: yup
      .string()
      .required(t("job.descriptionRequired"))
      .min(50, t("job.descriptionMinLength"))
      .max(5000, t("job.descriptionMaxLength")),

    requirements: yup
      .string()
      .required(t("job.requirementsRequired"))
      .min(20, t("job.requirementsMinLength"))
      .max(5000, t("job.requirementsMaxLength")),

    location: yup
      .string()
      .required(t("job.locationRequired"))
      .min(2, t("job.locationMinLength"))
      .max(255, t("job.locationMaxLength")),

    job_type: yup
      .string()
      .required(t("job.typeRequired"))
      .oneOf(
        ["full-time", "part-time", "contract", "internship"],
        t("job.invalidJobType")
      ),

    salary_min: yup
      .string()
      .nullable()
      .optional()
      .test("is-number", t("job.salaryMinValidNumber"), (value) => {
        if (!value) return true; // Optional field
        const num = parseInt(value);
        return !isNaN(num) && num >= 0;
      })
      .test("min-value", t("job.salaryMinGreaterThanZero"), (value) => {
        if (!value) return true; // Optional field
        const num = parseInt(value);
        return num >= 0;
      }),

    salary_max: yup
      .string()
      .nullable()
      .optional()
      .test("is-number", t("job.salaryMaxValidNumber"), (value) => {
        if (!value) return true; // Optional field
        const num = parseInt(value);
        return !isNaN(num) && num >= 0;
      })
      .test("min-value", t("job.salaryMaxGreaterThanZero"), (value) => {
        if (!value) return true; // Optional field
        const num = parseInt(value);
        return num >= 0;
      })
      .test(
        "greater-than-min",
        t("job.salaryMaxGreaterThanMin"),
        function (value) {
          const { salary_min } = this.parent;
          if (!value || !salary_min) return true; // Skip if either is empty
          const max = parseInt(value);
          const min = parseInt(salary_min);
          return max > min;
        }
      ),

    category: yup
      .string()
      .nullable()
      .optional()
      .min(2, t("job.categoryMinLength"))
      .max(100, t("job.categoryMaxLength")),

    experience_level: yup
      .string()
      .required(t("job.experienceLevelRequired"))
      .oneOf(
        ["entry", "mid", "senior", "lead"],
        t("job.invalidExperienceLevel")
      ),

    deadline: yup
      .string()
      .nullable()
      .optional()
      .test("is-future-date", t("job.deadlineFutureDate"), (value) => {
        if (!value) return true; // Optional field
        const date = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time to start of day
        return date > today;
      }),

    remote_allowed: yup.boolean().optional(),
  });
};

export const useApplicationValidationSchema = () => {
  const { language } = useI18n();
  const isRTL = language === "ar";

  return yup.object().shape({
    cover_letter: yup
      .string()
      .required(isRTL ? "خطاب التغطية مطلوب" : "Cover letter is required")
      .min(
        50,
        isRTL
          ? "خطاب التغطية يجب أن يكون 50 حرف على الأقل"
          : "Cover letter must be at least 50 characters"
      )
      .max(
        2000,
        isRTL
          ? "خطاب التغطية يجب أن يكون أقل من 2000 حرف"
          : "Cover letter must be less than 2000 characters"
      ),
  });
};

export const useProfileValidationSchema = () => {
  const { language } = useI18n();
  const isRTL = language === "ar";

  return yup.object().shape({
    name: yup
      .string()
      .required(isRTL ? "الاسم مطلوب" : "Name is required")
      .min(
        2,
        isRTL
          ? "الاسم يجب أن يكون حرفين على الأقل"
          : "Name must be at least 2 characters"
      )
      .max(
        255,
        isRTL
          ? "الاسم يجب أن يكون أقل من 255 حرف"
          : "Name must be less than 255 characters"
      ),

    email: yup
      .string()
      .required(isRTL ? "البريد الإلكتروني مطلوب" : "Email is required")
      .email(isRTL ? "البريد الإلكتروني غير صحيح" : "Invalid email format"),

    phone: yup
      .string()
      .matches(
        /^[\+]?[1-9][\d]{0,15}$/,
        isRTL ? "رقم الهاتف غير صحيح" : "Invalid phone number"
      ),

    specialization: yup
      .string()
      .required(isRTL ? "التخصص مطلوب" : "Specialization is required")
      .min(
        2,
        isRTL
          ? "التخصص يجب أن يكون حرفين على الأقل"
          : "Specialization must be at least 2 characters"
      )
      .max(
        100,
        isRTL
          ? "التخصص يجب أن يكون أقل من 100 حرف"
          : "Specialization must be less than 100 characters"
      ),

    university: yup
      .string()
      .min(
        2,
        isRTL
          ? "اسم الجامعة يجب أن يكون حرفين على الأقل"
          : "University name must be at least 2 characters"
      )
      .max(
        255,
        isRTL
          ? "اسم الجامعة يجب أن يكون أقل من 255 حرف"
          : "University name must be less than 255 characters"
      ),

    profile_summary: yup
      .string()
      .min(
        20,
        isRTL
          ? "ملخص الملف الشخصي يجب أن يكون 20 حرف على الأقل"
          : "Profile summary must be at least 20 characters"
      )
      .max(
        1000,
        isRTL
          ? "ملخص الملف الشخصي يجب أن يكون أقل من 1000 حرف"
          : "Profile summary must be less than 1000 characters"
      ),

    location: yup
      .string()
      .min(
        2,
        isRTL
          ? "الموقع يجب أن يكون حرفين على الأقل"
          : "Location must be at least 2 characters"
      )
      .max(
        255,
        isRTL
          ? "الموقع يجب أن يكون أقل من 255 حرف"
          : "Location must be less than 255 characters"
      ),
  });
};

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPhone(phone: string): boolean {
  // Saudi phone number format: +966XXXXXXXXX or 05XXXXXXXX
  const phoneRegex = /^(\+966|05)\d{8}$/;
  return phoneRegex.test(phone.replace(/\s+/g, ""));
}

export function validatePassword(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }

  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }

  if (!/\d/.test(password)) {
    errors.push("Password must contain at least one number");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, "");
}

// Note: Yup schemas commented out until yup is installed
// Uncomment and install yup when needed

/*
import * as yup from 'yup';

// Yup validation schemas
export const loginSchema = yup.object({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

export const registerSchema = yup.object({
  name: yup
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .required('Name is required'),
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .required('Password is required'),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Password confirmation is required'),
  role: yup
    .string()
    .oneOf(['employee', 'employer'], 'Please select a valid role')
    .required('Role is required'),
});
*/
