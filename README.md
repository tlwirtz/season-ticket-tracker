# season-ticket-tracker
⚽️ A small app to manage our extra season ticket

## MVP
* As a user, I want a list of home matches on the main page
* As a user, I want to click on each home game to sign-up for the tickets
* As a user, I want show if a match is available
* As a user, I want to see which matches I'm attending
* As a user, I want to be able to sign-up for a match
* As a user, I want an 'About' page where I can learn more about my seats
* As a developer, I want everything stored in a Firebase system
* As a developer, I want users to sign in with a social media account


## Stretch
* As a developer, have an admin panel to manage games and sign-ups
* As a developer, send e-mail confirmations to those who sign-up
* As a developer, send out e-mail reminders before the game
* As a developer I want to create a wait-list for popular matches
* As a developer I want to integrate with Stripe for CC processing so people can pay for the tickets.
* As a user, I want each match to have their own detail page
* As a developer, I want to update matches with scores & highlights
* As a user, I want a ticketmaster link next to each match I'm attending so I can buy more tickets

## Data

* Matches
```json
{
  "location":"CenturyLink Field",
  "time":"1:00 PM",
  "date":"July 01 2017",
  "awayTeam":"LA Galaxy",
  "homeTeam":"Seattle Sounders",
  "type":"MLS",
  "available": true,
  "qtyTicketsAvailable": 1,
  "ticketPrice":"2000",
  "id":"diuf9ewfjw908e9f8wef",
  "claimedUserId":"ud9s0df8sdjdf"
}
```

* Accounts
```json
{
  "first_name":"taylor",
  "last_name":"wirtz",
  "img":"https://fakeurl/imgs",
  "matches": [
    {
      "matchId": "diuf9ewfjw908e9f8wef",
      "price": "2000",
      "status": "unpaid"
    }
  ]
}
```
