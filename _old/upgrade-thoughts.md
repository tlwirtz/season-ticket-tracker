# Upgrade Plan

## Overview
The app was built largely on-top of Google's Firebase platform. I'd like to migrate this away from Firebase and into a relational schema. My basis for this decision is nothing more than, I want to. In my day-to-day, I rarely work in NoSQL systems, and I'd like to get more comfortable with modern, serverless SQL offerings. I'm leaning towards either supabase, neon or vercel postgres (which is just neon, but more expensive). 

Additionally, I might explore moving the application over to Next.js. Again, there's no technical reason that makes this necessary, I just want to build something with Next.js

## Migration Plan
This is essentially a full rewrite of the application and likely takes place in multiple phases: 

1. Migrate data-layer to SQL. 
   1. Provision dB
   2. Create schema and integrate ORM (checkout prisma or drizzle as an ORM)
   3. Migrate Data
2. Spin up Next.js App
   1. When's the best time for this to happen? Before or after the data layer migration? (maybe after...)
   2. There's *a lot* to unpack here.
3. Update authentication to use Auth.js (or Auth0)
   1. Need to dig in here a bit, I'm not 100% sure if this is necessary, or if we should just keep using firebase auth.