import { z } from "zod";

export const productFormValidation = z.object({
  name: z.string()
    .min(2, {
      message: "The product name must be at least 2 characters long.",
    })
    .max(50, {
      message: "The product name must not exceed 50 characters.",
    })
    .regex(/^[^\d]*$/, {
      message: "The product name cannot contain numbers.",
    }),
  type: z.string()
    .min(2, {
      message: "The type must be at least 2 characters long.",
    })
    .max(50, {
      message: "The type must not exceed 30 characters.",
    })
    .regex(/^[^\d]*$/, {
      message: "The type cannot contain numbers.",
    }),
  meal: z.string()
    .min(2, {
      message: "The type must be at least 2 characters long.",
    })
    .max(50, {
      message: "The type must not exceed 30 characters.",
    })
    .regex(/^[^\d]*$/, {
      message: "The type cannot contain numbers.",
    }),
  calories: z.number()
    .min(1, {
      message: "The calories must be at least 1.",
    }),
  description: z.string()
    .max(200, {
      message: "The description must not exceed 200 characters.",
    })
    .refine((val) => val.split(' ').length >= 3, {
      message: 'The description must be at least 3 words long.',
    }),
    
    
});


  
