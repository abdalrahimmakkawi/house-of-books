import { Book, Category } from './types';

export const CATEGORIES: Category[] = [
  'Self-Improvement',
  'Business',
  'Psychology',
  'Technology',
  'History'
];

export const SAMPLE_BOOKS: Book[] = [
  {
    id: '1',
    title: 'Atomic Habits',
    author: 'James Clear',
    coverUrl: 'https://picsum.photos/seed/habits/400/600',
    category: 'Self-Improvement',
    readTime: 15,
    summary: 'Atomic Habits provides a proven framework for improving every day. James Clear, one of the world\'s leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.',
    keyInsights: [
      'Small habits make a big difference.',
      'Forget about goals, focus on systems instead.',
      'Build identity-based habits.',
      'The Four Laws of Behavior Change.'
    ]
  },
  {
    id: '2',
    title: 'Zero to One',
    author: 'Peter Thiel',
    coverUrl: 'https://picsum.photos/seed/startup/400/600',
    category: 'Business',
    readTime: 12,
    summary: 'Zero to One is about how to build companies that create new things. It draws on Peter Thiel\'s experience as a co-founder of PayPal and Palantir and an early investor in hundreds of startups, including Facebook and SpaceX.',
    keyInsights: [
      'The next Bill Gates will not build an operating system.',
      'Monopoly is the condition of every successful business.',
      'Start small and monopolize.',
      'Sales is just as important as the product.'
    ]
  },
  {
    id: '3',
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    coverUrl: 'https://picsum.photos/seed/thinking/400/600',
    category: 'Psychology',
    readTime: 20,
    summary: 'Daniel Kahneman, recipient of the Nobel Prize in Economic Sciences for his seminal work in psychology that challenged the rational model of judgment and decision making, is one of our most important thinkers.',
    keyInsights: [
      'System 1 is fast, intuitive, and emotional.',
      'System 2 is slower, more deliberative, and more logical.',
      'The anchoring effect influences our decisions.',
      'Loss aversion: we hate losing more than we like winning.'
    ]
  },
  {
    id: '4',
    title: 'The Lean Startup',
    author: 'Eric Ries',
    coverUrl: 'https://picsum.photos/seed/lean/400/600',
    category: 'Business',
    readTime: 14,
    summary: 'The Lean Startup approach fosters companies that are both more capital efficient and that leverage human creativity more effectively.',
    keyInsights: [
      'Build-Measure-Learn feedback loop.',
      'Minimum Viable Product (MVP).',
      'Pivot or Persevere.',
      'Validated learning is the unit of progress.'
    ]
  }
];
