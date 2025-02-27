'use client';
import { FC, useState, useEffect } from 'react';
import { Match } from '../../types/match';

interface MatchCardProps {
    match: Match;
    useAdminLayout?: Boolean;
}

const MatchCard: FC<MatchCardProps> = ({ match, useAdminLayout = false }) => {
    const formatDate = (date: Date | null): string => {
        return new Date(date ?? Date.now()).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatTime = (date: Date | null): string => {
        return new Date(date ?? Date.now()).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    //we have to do this crazy stuff because the time gets
    //rendered on the server in UTC and we need it to render in the client timezone.
    const [currentTime, setCurrentTime] = useState(() => {
        return formatTime(match.dateTime);
    });

    const [currentDate, setCurrentDate] = useState(() => {
        return formatDate(match.dateTime);
    });

    const [showTimeField, setShowTimeField] = useState(() => {
        return false;
    });

    useEffect(() => {
        setCurrentTime(() => {
            return formatTime(match.dateTime);
        });

        setCurrentDate(() => {
            return formatDate(match.dateTime);
        });

        setShowTimeField(() => true);
    }, [match.dateTime]);

    //changes the card footer by injecting the email of the user who claimed the match
    //a little clunky, but it works
    const getCardFooter = () => {
        const footer = (
            <>
                {useAdminLayout && (
                    <div
                        className={`mt-6 pt-6 border-t ${
                            match.isUserAttending ? 'border-purple-200' : 'border-gray-100'
                        } flex items-center justify-between`}
                    >
                        <span className="text-sm text-gray-500">
                            {match?.userEmail ?? 'No Email Found'}
                        </span>
                    </div>
                )}

                <div
                    className={`mt-6 pt-6 border-t ${
                        match.isUserAttending ? 'border-purple-200' : 'border-gray-100'
                    } flex items-center justify-between`}
                >
                    {!useAdminLayout && (
                        <span className="text-sm text-gray-500">
                            {match.isUserAttending ? 'You Paid' : 'From'}
                        </span>
                    )}
                    <span className="text-lg font-semibold text-green-600">
                        ${match.ticketPrice > 0 ? (match.ticketPrice / 100).toFixed(2) : 'TBD'}
                    </span>
                </div>
            </>
        );

        return footer;
    };

    return (
        <a href={`/matches/${match.id}`}>
            <div
                className={`${
                    match.isUserAttending ? 'bg-purple-50' : 'bg-white'
                } rounded-xl shadow-sm ring-1 ${
                    match.isUserAttending ? 'ring-purple-600' : 'ring-gray-200'
                } hover:shadow-md transition-shadow duration-300`}
                title={match.isUserAttending ? "You're going to this match!" : ''}
            >
                <div className="p-6">
                    {/* Teams Section */}
                    <div className="flex items-center space-x-4">
                        <div className="flex flex-col items-center space-y-2">
                            <img
                                src={match.awayTeam.logoUrl ?? ''}
                                alt={match.awayTeam.name}
                                className="w-16 h-16 object-over"
                            />
                        </div>
                        <div className="flex flex-col items-center space-y-2">
                            <span className="text-sm font-medium text-gray-900">
                                {match.awayTeam.name}
                            </span>
                        </div>
                    </div>

                    {/* Match Details */}
                    <div
                        className={`mt-6 pt-6 border-t ${
                            match.isUserAttending ? 'border-purple-200' : 'border-gray-100'
                        }`}
                    >
                        <div className="flex flex-col space-y-4">
                            <div
                                style={{ visibility: showTimeField ? 'visible' : 'hidden' }}
                                className="flex items-center text-sm text-gray-600"
                            >
                                <svg
                                    className={`w-5 h-5 mr-2 ${
                                        match.isUserAttending ? 'text-purple-400' : 'text-gray-400'
                                    }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                                <span>
                                    {currentDate} • {currentTime}
                                </span>
                            </div>

                            <div className="flex items-center text-sm text-gray-600">
                                <svg
                                    className={`w-5 h-5 mr-2 ${
                                        match.isUserAttending
                                            ? 'text-purple-400'
                                            : 'text-gray-400 mr-2'
                                    }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                                <span>
                                    {match.venue}, {match.city}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Ticket Price */}

                    {getCardFooter()}
                </div>
            </div>
        </a>
    );
};

export default MatchCard;
