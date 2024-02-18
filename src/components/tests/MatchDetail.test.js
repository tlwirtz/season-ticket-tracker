import { shallow } from 'enzyme';
import { describe, it } from 'vitest'
import { MatchDetail } from '../MatchDetail';

const props = {
  params: {
    matchId: 'testid'
  },
  selectMatch: () => null,
  claimTicket: () => null,
  user: {
    uid: 'testuid'
  },
  match: {
    qtyTicketsAvailable: 1,
    date: 'testdate',
    time: 'matchtime',
    location: 'matchlocation',
    ticketPrice: 100,
    awayTeam: {
      img: 'testimg',
      name: 'testname'
    },
    homeTeam: {
      img: 'testimg',
      name: 'testname'
    },
  },
}

describe('MatchDetail Component', () => {
  it.skip('renders without crashing', () => {
    // shallow(<MatchDetail {...props} />)
  })
})
