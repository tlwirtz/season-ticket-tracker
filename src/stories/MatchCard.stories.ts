import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import MatchCard from '../components/MatchCard';

const testMatch = {
    id: 3,
    homeTeam: {
        id: 1,
        name: 'Manchester United',
        logoUrl: 'https://loremflickr.com/640/480/sports?lock=730123202461696'
    },
    awayTeam: {
        id: 2,
        name: 'Liverpool',
        logoUrl: 'https://loremflickr.com/640/480/sports?lock=730123202461696'
    },
    dateTime: new Date('2024-03-20T19:30:00'),
    venue: 'Old Trafford',
    city: 'Manchester',
    ticketPrice: 7587,
    isUserAttending: true
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'MatchCard',
    component: MatchCard,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered'
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {},
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    args: { match: testMatch, useAdminLayout: true }
} satisfies Meta<typeof MatchCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
    args: {
        match: testMatch
    }
};

// export const Secondary: Story = {
//     args: {
//         label: 'Button'
//     }
// };

// export const Large: Story = {
//     args: {
//         size: 'large',
//         label: 'Button'
//     }
// };

// export const Small: Story = {
//     args: {
//         size: 'small',
//         label: 'Button'
//     }
// };
