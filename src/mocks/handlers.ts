import { http, HttpResponse } from 'msw'
import { db } from './db'
import { seedDatabase } from './seed'

const ARTIFICIAL_DELAY_MS = [200, 1200]
const ERROR_RATE = 0.075

const shouldError = () => Math.random() < ERROR_RATE

const delayedResponse = async (resolver) => {
  const [min, max] = ARTIFICIAL_DELAY_MS
  const delay = Math.floor(Math.random() * (max - min + 1)) + min
  await new Promise((resolve) => setTimeout(resolve, delay))
  return resolver()
}

export const handlers = [
  http.get('/jobs', async ({ request }) => {
    const url = new URL(request.url)
    const search = url.searchParams.get('search')
    const status = url.searchParams.get('status')
    const page = parseInt(url.searchParams.get('page') ?? '1', 10)
    const pageSize = parseInt(url.searchParams.get('pageSize') ?? '10', 10)
    const sort = url.searchParams.get('sort')

    let jobs = await db.table('jobs').toArray()

    if (search) {
      jobs = jobs.filter(
        (job) =>
          job.title.toLowerCase().includes(search.toLowerCase()) ||
          job.slug.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (status && status !== 'all') {
      jobs = jobs.filter((job) => job.status === status)
    }

    if (sort) {
      const [field, order] = sort.split(':')
      jobs.sort((a, b) => {
        if (a[field] < b[field]) return order === 'asc' ? -1 : 1
        if (a[field] > b[field]) return order === 'asc' ? 1 : -1
        return 0
      })
    }

    const paginatedJobs = jobs.slice((page - 1) * pageSize, page * pageSize)

    return delayedResponse(() =>
      HttpResponse.json({
        jobs: paginatedJobs,
        totalPages: Math.ceil(jobs.length / pageSize),
      })
    )
  }),

  http.post('/jobs', async ({ request }) => {
    if (shouldError()) {
      return delayedResponse(() => new HttpResponse(null, { status: 500 }))
    }
    const newJob = await request.json()
    const id = await db.table('jobs').add(newJob)
    return delayedResponse(() => HttpResponse.json({ ...newJob, id }))
  }),

  http.patch('/jobs/:id', async ({ request, params }) => {
    if (shouldError()) {
      return delayedResponse(() => new HttpResponse(null, { status: 500 }))
    }
    const { id } = params
    const updates = await request.json()
    await db.table('jobs').update(Number(id), updates)
    return delayedResponse(() => HttpResponse.json({ ...updates, id }))
  }),

  http.patch('/jobs/:id/reorder', async ({ request }) => {
    if (shouldError()) {
      return delayedResponse(() => new HttpResponse(null, { status: 500 }))
    }
    const { fromOrder, toOrder } = await request.json()
    // Implement reordering logic here
    return delayedResponse(() => new HttpResponse(null, { status: 200 }))
  }),

  http.get('/candidates', async ({ request }) => {
    const url = new URL(request.url)
    const search = url.searchParams.get('search')
    const stage = url.searchParams.get('stage')
    const page = parseInt(url.searchParams.get('page') ?? '1', 10)
    const pageSize = 10 // Fixed pageSize for simplicity

    let candidates = await db.table('candidates').toArray()

    if (search) {
      candidates = candidates.filter(
        (candidate) =>
          candidate.name.toLowerCase().includes(search.toLowerCase()) ||
          candidate.email.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (stage && stage !== 'all') {
      candidates = candidates.filter(
        (candidate) => candidate.stage === stage
      )
    }

    const paginatedCandidates = candidates.slice(
      (page - 1) * pageSize,
      page * pageSize
    )

    return delayedResponse(() =>
      HttpResponse.json({
        candidates: paginatedCandidates,
        totalPages: Math.ceil(candidates.length / pageSize),
      })
    )
  }),

  http.post('/candidates', async ({ request }) => {
    if (shouldError()) {
      return delayedResponse(() => new HttpResponse(null, { status: 500 }))
    }

    const newCandidate = await request.json()
    const id = await db.table('candidates').add(newCandidate)
    return delayedResponse(() => HttpResponse.json({ ...newCandidate, id }))
  }),

  http.patch('/candidates/:id', async ({ request, params }) => {
    if (shouldError()) {
      return delayedResponse(() => new HttpResponse(null, { status: 500 }))
    }
    const { id } = params
    const updates = await request.json()
    await db.table('candidates').update(Number(id), updates)
    return delayedResponse(() => HttpResponse.json({ ...updates, id }))
  }),

  http.get('/candidates/:id/timeline', async ({ params }) => {
    const { id } = params
    // Implement timeline logic here
    return delayedResponse(() => HttpResponse.json([]))
  }),

  http.get('/assessments/:jobId', async ({ params }) => {
    const { jobId } = params
    const assessment = await db
      .table('assessments')
      .get({ jobId: Number(jobId) })
    return delayedResponse(() => HttpResponse.json(assessment))
  }),

  http.put('/assessments/:jobId', async ({ request, params }) => {
    if (shouldError()) {
      return delayedResponse(() => new HttpResponse(null, { status: 500 }))
    }

    const { jobId } = params
    const assessmentData = await request.json()
    await db.table('assessments').put({ ...assessmentData, jobId: Number(jobId) })
    return delayedResponse(() => HttpResponse.json(assessmentData))
  }),

  http.post('/assessments/:jobId/submit', async ({ request, params }) => {
    if (shouldError()) {
      return delayedResponse(() => new HttpResponse(null, { status: 500 }))
    }

    const { jobId } = params
    const submission = await request.json()
    const assessment = await db
      .table('assessments')
      .get({ jobId: Number(jobId) })
    await db
      .table('assessmentResponses')
      .add({ ...submission, assessmentId: assessment.id })
    return delayedResponse(() => HttpResponse.json({ success: true }))
  }),
]

seedDatabase()