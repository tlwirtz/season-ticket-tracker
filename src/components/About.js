import React, {Component} from 'react';

class About extends Component {
  render() {
    return (
      <div className="match-detail-container">
        <div className="match-detail-item">
          <h2 className="medium-grey-text">About</h2>
          <h3 className="soft-grey-text">What To Know Before Your Claim</h3>
          <p>All tickets are located in the Southern End of Royal Brougham Park (CenturyLink Field) in ECS general admission sections 121, 122, 123.</p>
          <p>These seats are not for the faint of heart. There will be yelling, drinking, chanting jumping, and profanity. Your view will might be obstructed for portions of the match due to flags, banners and tifo.</p>
          <p>This section expects full partcipation, so if you are looking for a nice, relaxing expereince, this isn't the section for you. If you're looking for one of the most authentic and exciting ways to expereince American soccer, then step right up.</p>

          <p>Check out this <a href="https://www.youtube.com/watch?v=R5FQsrRSMFw">link</a> to get a feel for what it's like to sit with Emerald City Supporters!</p>
          <p>We'll see you in the terraces.</p>

          <h3 className="soft-grey-text">How Do I Get My Tickets?</h3>
          <p>The Seattle Sounders have not yet released tickets for the 2017 season. Once tickets are released, PDFs will be emailed within 24 hours of claiming your match.</p>

          <h3 className="soft-grey-text">Payment Options</h3>
          <p>Currently, I'm only accepting cash on or before game day. Since redemption codes are only handed out to trusted friends and family we can coordinate payment methods on a case by case basis.</p>
          <p>We are working on a credit card checkout process in the coming weeks.</p>

          <h3 className="soft-grey-text">Cancellation Policy</h3>
          <p>If you need to cancel your ticket, please inform me at least 48 hours before match day. This gives me time to re-list the ticket and find a replacement.</p>
          <p>Don't panic if you must cancel within 48 hours of match day! Just let me know as soon as you can and we can work together to find a solution. Feel free to hand off your ticket to a friend to take their spot!</p>
        </div>
      </div>
    );
  }
}

export default About;
