import '../../../styles/Match.css';
import '../../../styles/MatchDetail.css';

export default function About() {
    return (
        <div className="match-detail-container p-6 pt-0 sm:p-6 sm:pt-0">
            <div className="match-detail-item">
                <h3 className="soft-grey-text py-2 sm:py-2">What To Know Before Your Claim</h3>
                <p className="py-2 sm:py-2">
                    All tickets are located in the Southern End of Royal Brougham Park (Lumen Field)
                    in ECS general admission sections 121, 122, 123.
                </p>
                <p className="py-2 sm:py-2">
                    These seats are not for the faint of heart. There will be yelling, drinking,
                    chanting, jumping, and profanity. Your view will be obstructed for portions of
                    the match due to flags, banners and tifo.
                </p>
                <p className="py-2 sm:py-2">
                    This section expects full participation, so if you are looking for a nice,
                    relaxing experience, this isn&apos;t the section for you. If you&apos;re looking
                    for one of the most authentic and exciting ways to experience American soccer,
                    then let&apos;s go mental.
                </p>

                <p className="py-2 sm:py-2">
                    Check out this{' '}
                    <a
                        className="underline"
                        href="https://youtu.be/QCtlW5r-kw4?si=VU48qoowQCNRw_6v"
                    >
                        link
                    </a>{' '}
                    to get a feel for what it&apos;s like to sit with the Emerald City Supporters!
                </p>
                <p className="py-2 sm:py-2">We&apos;ll see you in the terraces.</p>

                <h3 className="soft-grey-text py-2 sm:py-2">How Do I Get My Tickets?</h3>
                <p className="py-2 sm:py-2">
                    You will recieve your tickets digitally via Ticketmaster
                </p>

                <h3 className="soft-grey-text py-2 sm:py-2">Payment Options</h3>
                <p className="py-2 sm:py-2">
                    Currently, I&apos;m only accepting cash or venmo on or before game day. Since
                    redemption codes are only handed out to friends and family we can coordinate
                    payment methods on a case by case basis.
                </p>

                <h3 className="soft-grey-text py-2 sm:py-2">Cancellation Policy</h3>
                <p className="py-2 sm:py-2">
                    If you need to cancel your ticket, just let me know a few days before match day.
                    This gives me time to re-list the ticket and find a replacement.
                </p>
                <p className="py-2 sm:py-2">
                    Don&apos;t panic if you must cancel before match day! Just let me know as soon
                    as you can and we can work together to find a solution.
                </p>
            </div>
        </div>
    );
}
