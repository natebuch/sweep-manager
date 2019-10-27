import moment from 'moment';

const gameObject = [
  {
    id: 1, 
    questions: [
      {
        id: 1,
        question: "question 1",
        answer: "answer 1"
      },
      {
        id: 2,
        question: "question 1",
        answer: "answer 1"
      },
      {
        id: 3,
        question: "question 1",
        answer: "answer 1"
      }
    ],
    players: [
      { 
        id: 0,
        firstName: "first name 0",
        lastName: "last name 0",
        address: 'address 1',
        winner: true,
        prior_winner: false
      },
      { 
        id: 1, 
        firstName: "first name 1",
        lastName: "last name 1",
        address: 'address 1',
        winner: false,
        prior_winner: true
      },
      { 
        id: 2,
        firstName: "first name 2",
        lastName: "last name 2",
        address: 'address 2',
        winner: false,
        prior_winner: false
      }
    ],
    status: 'Complete',      
    client: 'BudLight',
    team: 'Cleveland Browns',
    type: 'Slate',
    start: moment().format('LLL'),
    end: moment().add(4, 'hours').format('LLL')
  },
  {
    id: 2, 
    questions: [
      {
        id: 1,
        question: "question 1",
        answer: "answer 1"
      },
      {
        id: 2,
        question: "question 1",
        answer: "answer 1"
      },
      {
        id: 3,
        question: "question 1",
        answer: "answer 1"
      }
    ],
    players: [
      { 
        id: 3, 
        firstName: "first name 3",
        lastName: "last name 3",
        address: 'address 3',
        winner: true,
        prior_winner: false
      },
      { 
        id: 4,
        firstName: "first name 4",
        lastName: "last name 4",
        address: 'address 4',
        winner: false,
        prior_winner: true
      },
      { 
        id: 5, 
        firstName: "first name 5",
        lastName: "last name 5",
        address: 'address 5',
        winner: false,
        prior_winner: false
      }
    ],
    status: 'Active',      
    client: 'BudLight',
    team: 'Baltimore Ravens',
    type: 'Slate',
    start: moment().add(4, 'hours').format('LLL'),
    end: moment().add(8, 'hours').format('LLL')
  },
  {
    id: 3, 
    questions: [
      {
        id: 1,
        question: "question 1",
        answer: "answer 1"
      },
      {
        id: 2,
        question: "question 1",
        answer: "answer 1"
      },
      {
        id: 3,
        question: "question 1",
        answer: "answer 1"
      }
    ],
    players: [
      { 
        id: 6,
        firstName: "first name1",
        lastName: "last name1",
        address: 'address 1',
        winner: true,
        prior_winner: false
      },
      { 
        id: 7,
        firstName: "first name1",
        lastName: "last name1",
        address: 'address 1',
        winner: true,
        prior_winner: false
      },
      { 
        id: 8, 
        firstName: "first name1",
        lastName: "last name1",
        address: 'address 1',
        winner: true,
        prior_winner: false
      }
    ],
    status: 'Pending',      
    client: 'BudLight',
    team: 'Kansas City Chiefs',
    type: 'Slate',
    start: moment().subtract(8, 'hours').format('LLL'),
    end: moment().add(4, 'hours').format('LLL')
  },
  {
    id: 4, 
    questions: [
      {
        id: 1,
        question: "question 1",
        answer: "answer 1"
      },
      {
        id: 2,
        question: "question 1",
        answer: "answer 1"
      },
      {
        id: 3,
        question: "question 1",
        answer: "answer 1"
      }
    ],
    players: [
      { 
        id: 9,
        firstName: "first name1",
        lastName: "last name1",
        address: 'address 1',
        winner: true,
        prior_winner: false
      },
      { 
        id: 10,
        firstName: "first name1",
        lastName: "last name1",
        address: 'address 1',
        winner: true,
        prior_winner: false
      },
      { 
        id: 11, 
        firstName: "first name1",
        lastName: "last name1",
        address: 'address 1',
        winner: true,
        prior_winner: false
      }
    ],
    status: 'Active',      
    client: 'Budwieser',
    team: 'Detroit Lions',
    type: 'Slate',
    start: moment().subtract(6, 'hours').format('LLL'),
    end: moment().subtract(2, 'hours').format('LLL')
  },
  {
    id: 5, 
    questions: [
      {
        id: 1,
        question: "question 1",
        answer: "answer 1"
      },
      {
        id: 2,
        question: "question 1",
        answer: "answer 1"
      },
      {
        id: 3,
        question: "question 1",
        answer: "answer 1"
      }
    ],
    players: [
      { 
        id: 12,
        firstName: "first name1",
        lastName: "last name1",
        address: 'address 1',
        winner: true,
        prior_winner: false
      },
      { 
        id: 13,
        firstName: "first name1",
        lastName: "last name1",
        address: 'address 1',
        winner: true,
        prior_winner: false
      },
      { 
        id: 14, 
        firstName: "first name1",
        lastName: "last name1",
        address: 'address 1',
        winner: true,
        prior_winner: false
      }
    ],
    status: 'Active',      
    client: 'BudLight',
    team: 'New Orleans Saints',
    type: 'Slate',
    start: moment().subtract(10, 'hours').format('LLL'),
    end: moment().subtract(6, 'hours').format('LLL')
  }
]

export default gameObject;
