import { Grade } from '../types/curriculum';

export const MOCK_CURRICULUM: Grade[] = [
  {
    id: 'g10',
    title: 'Grade 10',
    subjects: [
      {
        id: 's1',
        gradeId: 'g10',
        title: 'Mathematics',
        modules: [
          {
            id: 'm1',
            subjectId: 's1',
            title: 'Algebra',
            lessons: [
              {
                id: 'l1',
                moduleId: 'm1',
                title: 'Quadratic Equations',
                status: 'In Progress',
                objectives: [
                  'Understand the standard form ax² + bx + c = 0',
                  'Solve quadratic equations by factoring',
                  'Apply the quadratic formula to find roots'
                ],
                resources: [
                  { id: 'r1', title: 'Standard Form Worksheet', type: 'pdf', url: '#' },
                  { id: 'r2', title: 'Intro to Quadratics Video', type: 'video', url: '#' }
                ]
              },
              {
                id: 'l2',
                moduleId: 'm1',
                title: 'Polynomials',
                status: 'Todo',
                objectives: [
                  'Identify the degree of polynomials',
                  'Perform addition and subtraction of terms',
                  'Multiply binomials using the FOIL method'
                ],
                resources: [
                  { id: 'r3', title: 'Polynomials Practice Set', type: 'pdf', url: '#' }
                ]
              }
            ]
          },
          {
            id: 'm2',
            subjectId: 's1',
            title: 'Geometry',
            lessons: [
              {
                id: 'l3',
                moduleId: 'm2',
                title: 'Pythagorean Theorem',
                status: 'Completed',
                objectives: [
                  'State the Pythagorean theorem',
                  'Find the missing side of a right triangle',
                  'Apply the theorem to real-world problems'
                ],
                resources: [
                  { id: 'r4', title: 'Geometry Proofs', type: 'pdf', url: '#' }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 's2',
        gradeId: 'g10',
        title: 'Physics',
        modules: [
          {
            id: 'm3',
            subjectId: 's2',
            title: 'Mechanics',
            lessons: [
              {
                id: 'l4',
                moduleId: 'm3',
                title: 'Newton\'s Laws',
                status: 'Todo',
                objectives: [
                  'Explain the three laws of motion',
                  'Calculate force using F = ma',
                  'Identify action-reaction pairs'
                ],
                resources: []
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'g11',
    title: 'Grade 11',
    subjects: [
      {
        id: 's3',
        gradeId: 'g11',
        title: 'Chemistry',
        modules: [
          {
            id: 'm4',
            subjectId: 's3',
            title: 'Organic Chemistry',
            lessons: [
              {
                id: 'l5',
                moduleId: 'm4',
                title: 'Hydrocarbons',
                status: 'Todo',
                objectives: [
                  'Name alkanes, alkenes, and alkynes',
                  'Draw structural formulas',
                  'Understand combustion reactions'
                ],
                resources: []
              }
            ]
          }
        ]
      }
    ]
  }
];
