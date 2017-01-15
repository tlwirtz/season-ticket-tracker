import logo from './imgs/logo.svg'
const matches = {
  'gameOne':{
    location:'CenturyLink Field',
    time:'1:00 PM',
    date:'July 01 2017',
    awayTeam:{
      name: 'LA Galaxy',
      img: logo
    },
    homeTeam:{
      name: 'Seattle Sounders',
      img: logo
    },
    matchType:'MLS',
    available: true,
    qtyTicketsAvailable: 1,
    ticketPrice:'2000',
    id:'gameOne',
    claimedUserId: null,
  },
  'gameTwo': {
    location:'CenturyLink Field',
    time:'1:00 PM',
    date:'July 20 2017',
    awayTeam:{
      name: 'Portland Timbers',
      img: logo
    },
    homeTeam:{
      name: 'Seattle Sounders',
      img: logo
    },
    matchType:'MLS',
    available: true,
    qtyTicketsAvailable: 1,
    ticketPrice:'2000',
    id:'gameTwo',
    claimedUserId: null,
  },
  'gameThree': {
    location:'CenturyLink Field',
    time:'1:00 PM',
    date:'July 05 2017',
    awayTeam:{
      name: 'Real Salt Lake',
      img: logo
    },
    homeTeam:{
      name: 'Seattle Sounders',
      img: logo
    },
    matchType:'MLS',
    available: true,
    qtyTicketsAvailable: 1,
    ticketPrice:'2000',
    id:'gameThree',
    claimedUserId: null,
  }
};

export default matches
