import type { Meta, StoryObj } from '@storybook/react';
import { MatchHeader } from '../components/matches/MatchHeader';

const testHeader = {
    homeTeam: {
        id: 1,
        code: 'MU',
        name: 'Manchester United',
        img: 'https://loremflickr.com/640/480/sports?lock=730123202461696'
    },
    awayTeam: {
        id: 2,
        code: 'LVR',
        name: 'Liverpool',
        img: 'https://loremflickr.com/640/480/sports?lock=730123202461696'
    }
};

const meta = {
    title: 'MatchHeader',
    component: MatchHeader,
    parameters: {
        layout: 'centered'
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {},
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    args: { homeTeam: testHeader.homeTeam, awayTeam: testHeader.awayTeam }
} satisfies Meta<typeof MatchHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        homeTeam: testHeader.homeTeam,
        awayTeam: testHeader.awayTeam
    }
};
