import { z } from 'zod';

export type Utility = {
  display: string;
  leasePerAcre: number;
};

export type State = {
  display: string;
  value: string;
  utilities: Utility[];
};

const phoneRegex = /^(\+1|1)?[-.\s]?\(?[2-9]\d{2}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;

export const formSchema = z.object({
  state: z.string().min(1, 'Select a State first'),
  electric_utility: z.string().min(1, 'Select a Utility'),
  acreage: z.string().min(1, 'Enter the acreage of your land').max(30),
  firstName: z.string().min(1, 'Enter your first name'),
  lastName: z.string().min(1, 'Enter your last name'),
  email: z.string().email('Enter a valid email address'),
  phone: z
    .string()
    .min(10, 'Phone number must have at least 10 digits')
    .max(15, 'Phone number is too long')
    .refine((value) => phoneRegex.test(value), {
      message: 'Enter a valid US phone number',
    })
    .transform((value) => {
      // Remove all non-digit characters
      const digitsOnly = value.replace(/\D/g, '');

      // Ensure the number starts with '1' if it doesn't already
      const normalizedNumber =
        digitsOnly.length === 10 ? '1' + digitsOnly : digitsOnly;

      // Format the number as +1 (XXX) XXX-XXXX
      return `+${normalizedNumber.replace(
        /(\d{1})(\d{3})(\d{3})(\d{4})/,
        '$1 ($2) $3-$4',
      )}`;
    }),
});

export type FormSchema = z.infer<typeof formSchema>;
