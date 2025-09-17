import { faker } from '@faker-js/faker'
import { db } from './db'

export async function seedDatabase() {
  const jobsCount = await db.table('jobs').count()

  if (jobsCount > 0) {
    return
  }

  // Seed Jobs
  const jobs = []
  for (let i = 0; i < 25; i++) {
    jobs.push({
      title: faker.person.jobTitle(),
      slug: faker.helpers.slugify(faker.person.jobTitle()).toLowerCase(),
      status: faker.helpers.arrayElement(['active', 'archived']),
      tags: faker.helpers.arrayElements(
        ['React', 'TypeScript', 'Node.js', 'Python', 'Go'],
        3
      ),
      order: i,
    })
  }
  await db.table('jobs').bulkAdd(jobs)

  // Seed Candidates
  const createdJobs = await db.table('jobs').toArray()
  const candidates = []
  for (let i = 0; i < 1000; i++) {
    candidates.push({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      stage: faker.helpers.arrayElement([
        'applied',
        'screen',
        'tech',
        'offer',
        'hired',
        'rejected',
      ]),
      jobId: faker.helpers.arrayElement(createdJobs).id,
    })
  }
  await db.table('candidates').bulkAdd(candidates)

  // Seed Assessments
  const assessments = []
  for (let i = 0; i < 3; i++) {
    const questions = []
    for (let j = 0; j < 12; j++) {
      questions.push({
        id: j + 1,
        type: faker.helpers.arrayElement([
          'multiple-choice',
          'free-text',
          'coding',
        ]),
        question: faker.lorem.sentence(),
        options:
          j % 3 === 0
            ? faker.helpers.arrayElements(
                [
                  faker.lorem.words(3),
                  faker.lorem.words(3),
                  faker.lorem.words(3),
                  faker.lorem.words(3),
                ],
                4
              )
            : [],
      })
    }
    assessments.push({
      jobId: createdJobs[i].id,
      questions,
    })
  }
  await db.table('assessments').bulkAdd(assessments)
}