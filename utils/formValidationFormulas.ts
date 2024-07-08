import { z } from 'zod'
import { Locale } from '@/utils/types/Locale'

export const rawRequiredString = z
  .string({
    required_error: 'forms:fieldRequired',
  })
  .trim()
  .min(1, {
    message: 'forms:fieldRequired',
  })

export const requiredString = rawRequiredString.max(75, {
  message: 'forms:tooLong',
})

export const longRequiredString = rawRequiredString.max(500, {
  message: 'forms:tooLongDesc',
})

export const requiredEmail = z
  .string({
    required_error: 'forms:fieldRequired',
  })
  .trim()
  .min(1, {
    message: 'forms:fieldRequired',
  })
  .email({
    message: 'forms:invalidEmail',
  })

export const nullableString = z
  .string()
  .trim()
  .max(75, {
    message: 'forms:tooLong',
  })
  .transform(value => (value === '' ? null : value))
  .nullish()

export const longNullableString = z
  .string()
  .trim()
  .max(500, {
    message: 'forms:tooLongDesc',
  })
  .transform(value => (value === '' ? null : value))
  .nullish()

export const requiredNumber = z
  .number({
    required_error: 'forms:fieldRequired',
    invalid_type_error: 'forms:invalidNumber',
  })
  .int({
    message: 'forms:invalidNumber',
  })
  .min(1, {
    message: 'forms:negativeNumber',
  })

export const nullableNumber = z
  .number({
    required_error: 'forms:fieldRequired',
    invalid_type_error: 'forms:invalidNumber',
  })
  .int({
    message: 'forms:invalidNumber',
  })
  .nullish()

export const requiredPriceValue = z
  .number({
    required_error: 'forms:fieldRequired',
  })
  .int({
    message: 'forms:invalidNumber',
  })
  .min(1, {
    message: 'forms:negativeNumber',
  })
  .transform(value => value * 100)

export const postalCodeRefinement = {
  check: (code: string) => /^(\d{2}-\d{3})$/.test(code),
  message: 'forms:invalidValue',
}

export const requiredLocale = z
  .literal(Locale.en)
  .or(z.literal(Locale.de))
  .or(z.literal(Locale.es))
  .or(z.literal(Locale.fr))
  .or(z.literal(Locale.pl))
