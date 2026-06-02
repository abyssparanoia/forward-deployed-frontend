import { ApiError, type ApiErrorCode, type ApiErrorResponse } from './api-error'

function statusToCode(status: number): ApiErrorCode {
  if (status === 401) return 'UNAUTHORIZED'
  if (status === 403) return 'FORBIDDEN'
  if (status === 404) return 'NOT_FOUND'
  if (status === 422 || status === 400) return 'VALIDATION_ERROR'
  if (status >= 500) return 'SERVER_ERROR'
  return 'UNKNOWN'
}

export async function normalizeApiError(response: Response): Promise<ApiError> {
  let body: ApiErrorResponse = {}
  try {
    body = (await response.json()) as ApiErrorResponse
  } catch {
    // response body is not JSON
  }
  const code = statusToCode(response.status)
  const message = body.message ?? body.error ?? `HTTP ${response.status}: ${response.statusText}`
  return new ApiError(message, code, response.status, body.details)
}

export function normalizeNetworkError(error: unknown): ApiError {
  const message = error instanceof Error ? error.message : 'Network error'
  return new ApiError(message, 'NETWORK_ERROR', 0)
}
