import { GeneralError } from '@/models/general-error'

export function errorHandler({ code, error, error_code, details }: GeneralError) {
  return {
    code: code,
    error: error,
    error_code: error_code,
    details: details,
  }
}
