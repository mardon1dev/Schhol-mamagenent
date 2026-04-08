import { Grade } from '../types/curriculum';

export const MOCK_CURRICULUM: Grade[] = [
  {
    id: 'g10',
    title: '10-sinf',
    subjects: [
      {
        id: 's1',
        gradeId: 'g10',
        title: 'Matematika',
        modules: [
          {
            id: 'm1',
            subjectId: 's1',
            title: 'Algebra',
            lessons: [
              {
                id: 'l1',
                moduleId: 'm1',
                title: 'Kvadrat tenglamalar',
                status: 'In Progress',
                objectives: [
                  'ax² + bx + c = 0 ko\'rinishidagi standart shaklni tushunish',
                  'Kvadrat tenglamalarni ko\'paytuvchilarga ajratish orqali yechish',
                  'Ildizlarni topish uchun kvadrat formulani qo\'llash'
                ],
                resources: [
                  { id: 'r1', title: 'Standart shakl ish varag\'i', type: 'pdf', url: '#' },
                  { id: 'r2', title: 'Kvadrat tenglamalarga kirish videosi', type: 'video', url: '#' }
                ]
              },
              {
                id: 'l2',
                moduleId: 'm1',
                title: 'Ko\'phadlar',
                status: 'Todo',
                objectives: [
                  'Ko\'phadlarning darajasini aniqlash',
                  'Hadlarni qo\'shish va ayirish amallarini bajarish',
                  'Binomlarni FOIL usuli yordamida ko\'paytirish'
                ],
                resources: [
                  { id: 'r3', title: 'Ko\'phadlar bo\'yicha amaliy mashg\'ulotlar', type: 'pdf', url: '#' }
                ]
              }
            ]
          },
          {
            id: 'm2',
            subjectId: 's1',
            title: 'Geometriya',
            lessons: [
              {
                id: 'l3',
                moduleId: 'm2',
                title: 'Pifagor teoremasi',
                status: 'Completed',
                objectives: [
                  'Pifagor teoremasini ta\'riflash',
                  'To\'g\'ri burchakli uchburchakning noma\'lum tomonini topish',
                  'Teoremani hayotiy masalalarga tatbiq etish'
                ],
                resources: [
                  { id: 'r4', title: 'Geometrik isbotlar', type: 'pdf', url: '#' }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 's2',
        gradeId: 'g10',
        title: 'Fizika',
        modules: [
          {
            id: 'm3',
            subjectId: 's2',
            title: 'Mexanika',
            lessons: [
              {
                id: 'l4',
                moduleId: 'm3',
                title: 'Nyuton qonunlari',
                status: 'Todo',
                objectives: [
                  'Harakatning uchta qonunini tushuntirish',
                  'F = ma formulasi yordamida kuchni hisoblash',
                  'Ta\'sir va aks ta\'sir juftliklarini aniqlash'
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
    title: '11-sinf',
    subjects: [
      {
        id: 's3',
        gradeId: 'g11',
        title: 'Kimyo',
        modules: [
          {
            id: 'm4',
            subjectId: 's3',
            title: 'Organik kimyo',
            lessons: [
              {
                id: 'l5',
                moduleId: 'm4',
                title: 'Uglevodorodlar',
                status: 'Todo',
                objectives: [
                  'Alkanlar, alkenlar va alkinlarni nomlash',
                  'Strukturaviy formulalarni chizish',
                  'Yonish reaksiyalarini tushunish'
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
