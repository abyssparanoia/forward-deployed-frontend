import { normalizeApiError, normalizeNetworkError } from '../errors/normalizer'

type GetIdToken = () => Promise<string | null>

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>
}

export class HttpClient {
  private baseUrl: string
  private getIdToken: GetIdToken | null = null

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.replace(/\/$/, '')
  }

  setTokenGetter(fn: GetIdToken) {
    this.getIdToken = fn
  }

  private buildUrl(
    path: string,
    params?: Record<string, string | number | boolean | undefined>,
  ): string {
    const url = new URL(`${this.baseUrl}${path}`)
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.set(key, String(value))
        }
      })
    }
    return url.toString()
  }

  private async buildHeaders(init?: HeadersInit): Promise<HeadersInit> {
    const headers = new Headers(init)
    if (!headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json')
    }
    if (this.getIdToken) {
      const token = await this.getIdToken()
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
    }
    return headers
  }

  async request<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const { params, headers: initHeaders, ...init } = options
    const url = this.buildUrl(path, params)
    const headers = await this.buildHeaders(initHeaders)

    let response: Response
    try {
      response = await fetch(url, { ...init, headers })
    } catch (error) {
      throw normalizeNetworkError(error)
    }

    if (!response.ok) {
      throw await normalizeApiError(response)
    }

    if (response.status === 204) {
      return undefined as unknown as T
    }

    return response.json() as Promise<T>
  }

  get<T>(path: string, options?: RequestOptions) {
    return this.request<T>(path, { ...options, method: 'GET' })
  }

  post<T>(path: string, body?: unknown, options?: RequestOptions) {
    return this.request<T>(path, {
      ...options,
      method: 'POST',
      body: body !== undefined ? JSON.stringify(body) : undefined,
    })
  }

  put<T>(path: string, body?: unknown, options?: RequestOptions) {
    return this.request<T>(path, {
      ...options,
      method: 'PUT',
      body: body !== undefined ? JSON.stringify(body) : undefined,
    })
  }

  patch<T>(path: string, body?: unknown, options?: RequestOptions) {
    return this.request<T>(path, {
      ...options,
      method: 'PATCH',
      body: body !== undefined ? JSON.stringify(body) : undefined,
    })
  }

  delete<T>(path: string, options?: RequestOptions) {
    return this.request<T>(path, { ...options, method: 'DELETE' })
  }
}
