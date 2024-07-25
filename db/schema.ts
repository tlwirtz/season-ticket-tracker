import { boolean, integer, pgTable, pgEnum, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const matchTypeEnum = pgEnum('matchType', ['MLS']);

export const teamTable = pgTable('teams', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    img: text('img')
});

export const adminTable = pgTable('admins', {
    id: serial('id').primaryKey(),
    email: text('email').notNull().unique()
});

export const redemptionCodeTable = pgTable('redemption_codes', {
    id: serial('id').primaryKey(),
    code: text('code').notNull().unique()
});

export const appAlertTable = pgTable('app_alerts', {
    should_display: boolean('should_display').notNull().default(false),
    messageHeader: text('message_header'),
    messageText: text('message_text')
});

export const matchTable = pgTable('matches', {
    id: serial('id').primaryKey(),
    matchKey: text('match_key').notNull(),
    available: boolean('available').notNull().default(true),
    awayTeam: integer('away_team')
        .notNull()
        .references(() => teamTable.id),
    homeTeam: integer('home_team')
        .notNull()
        .references(() => teamTable.id),
    claimedUserId: text('claimed_user_id'),
    date: text('date'), //really should be a timestamp
    location: text('location'),
    matchType: matchTypeEnum('matchType').notNull(), //should be an enum
    qtyTicketsAvailable: integer('qty_tickets_available').notNull().default(0),
    ticketPrice: integer('ticket_price').notNull().default(0),
    time: text('time'),
    timestamp: timestamp('timestamp') //why do we have this
});

export const ticketRedemptionTable = pgTable('ticket_redemptions', {
    id: serial('id').primaryKey(),
    matchId: integer('match_id')
        .notNull()
        .references(() => matchTable.id),
    redemptionCodeId: integer('redemption_code_id')
        .notNull()
        .references(() => redemptionCodeTable.id),
    claimQty: integer('claim_qty').notNull(),
    claimedUserId: text('claimed_user_id'), //this should be a foreign key
    createdAt: timestamp('createdAt').defaultNow()
});

export type InsertTicketRedemption = typeof ticketRedemptionTable.$inferInsert;
export type SelectTicketRedemption = typeof ticketRedemptionTable.$inferSelect;

export type InsertTeam = typeof teamTable.$inferInsert;
export type SelectTeam = typeof teamTable.$inferSelect;

export type InsertAdmin = typeof adminTable.$inferInsert;
export type SelectAdmin = typeof adminTable.$inferSelect;

export type InsertRedemptionCode = typeof redemptionCodeTable.$inferInsert;
export type SelectRedemptionCode = typeof redemptionCodeTable.$inferSelect;

export type InsertAppAlert = typeof appAlertTable.$inferInsert;
export type SelectAppAlert = typeof appAlertTable.$inferSelect;

export type InsertMatch = typeof matchTable.$inferInsert;
export type SelectMatch = typeof matchTable.$inferSelect;

//todo -- need to update this.
// export const usersTable = pgTable('users_table', {
//     id: serial('id').primaryKey(),
//     name: text('name').notNull(),
//     age: integer('age').notNull(),
//     email: text('email').notNull().unique()
// });

// export const postsTable = pgTable('posts_table', {
//     id: serial('id').primaryKey(),
//     title: text('title').notNull(),
//     content: text('content').notNull(),
//     userId: integer('user_id')
//         .notNull()
//         .references(() => usersTable.id, { onDelete: 'cascade' }),
//     createdAt: timestamp('created_at').notNull().defaultNow(),
//     updatedAt: timestamp('updated_at')
//         .notNull()
//         .$onUpdate(() => new Date())
// });

// export type InsertUser = typeof usersTable.$inferInsert;
// export type SelectUser = typeof usersTable.$inferSelect;

// export type InsertPost = typeof postsTable.$inferInsert;
// export type SelectPost = typeof postsTable.$inferSelect;
