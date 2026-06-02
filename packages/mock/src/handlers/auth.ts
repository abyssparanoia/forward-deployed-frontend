import { http, HttpResponse } from 'msw'

const BASE_URL = 'http://localhost:8080'

export const authHandlers = [
  http.get(`${BASE_URL}/api/v1/me`, ({ request }) => {
    const auth = request.headers.get('Authorization')
    if (!auth) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }
    return HttpResponse.json({
      uid: 'mock-uid-001',
      email: 'mock@example.com',
      displayName: 'Mock User',
    })
  }),
]
