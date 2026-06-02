import { http, HttpResponse } from 'msw'
import type { SampleItem, SampleList } from '@template/api-client'

const BASE_URL = 'http://localhost:8080'

const sampleDb: SampleItem[] = [
  {
    id: '1',
    title: 'Sample Item 1',
    description: 'First sample item',
    status: 'active',
    createdAt: new Date('2024-01-01T00:00:00Z').toISOString(),
    updatedAt: new Date('2024-01-01T00:00:00Z').toISOString(),
  },
  {
    id: '2',
    title: 'Sample Item 2',
    description: 'Second sample item',
    status: 'draft',
    createdAt: new Date('2024-01-02T00:00:00Z').toISOString(),
    updatedAt: new Date('2024-01-02T00:00:00Z').toISOString(),
  },
  {
    id: '3',
    title: 'Sample Item 3',
    status: 'inactive',
    createdAt: new Date('2024-01-03T00:00:00Z').toISOString(),
    updatedAt: new Date('2024-01-03T00:00:00Z').toISOString(),
  },
]

export const sampleHandlers = [
  http.get(`${BASE_URL}/api/v1/samples`, ({ request }) => {
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') ?? '1')
    const perPage = parseInt(url.searchParams.get('perPage') ?? '10')
    const start = (page - 1) * perPage
    const items = sampleDb.slice(start, start + perPage)
    const response: SampleList = {
      items,
      total: sampleDb.length,
      page,
      perPage,
    }
    return HttpResponse.json(response)
  }),

  http.get(`${BASE_URL}/api/v1/samples/:id`, ({ params }) => {
    const item = sampleDb.find((s) => s.id === params.id)
    if (!item) {
      return HttpResponse.json({ message: 'Not found' }, { status: 404 })
    }
    return HttpResponse.json(item)
  }),

  http.post(`${BASE_URL}/api/v1/samples`, async ({ request }) => {
    const body = (await request.json()) as Partial<SampleItem>
    const newItem: SampleItem = {
      id: String(sampleDb.length + 1),
      title: body.title ?? 'Untitled',
      description: body.description,
      status: body.status ?? 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    sampleDb.push(newItem)
    return HttpResponse.json(newItem, { status: 201 })
  }),

  http.put(`${BASE_URL}/api/v1/samples/:id`, async ({ params, request }) => {
    const idx = sampleDb.findIndex((s) => s.id === params.id)
    if (idx === -1) {
      return HttpResponse.json({ message: 'Not found' }, { status: 404 })
    }
    const body = (await request.json()) as Partial<SampleItem>
    sampleDb[idx] = { ...sampleDb[idx], ...body, updatedAt: new Date().toISOString() }
    return HttpResponse.json(sampleDb[idx])
  }),

  http.delete(`${BASE_URL}/api/v1/samples/:id`, ({ params }) => {
    const idx = sampleDb.findIndex((s) => s.id === params.id)
    if (idx === -1) {
      return HttpResponse.json({ message: 'Not found' }, { status: 404 })
    }
    sampleDb.splice(idx, 1)
    return new HttpResponse(null, { status: 204 })
  }),
]
