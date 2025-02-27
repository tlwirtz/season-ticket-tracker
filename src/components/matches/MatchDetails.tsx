'use client';

import { useEffect, useState } from 'react';

interface MatchDetailsProps {
    dateTime: Date | null;
    location: string;
}

export function MatchDetails({ dateTime, location }: MatchDetailsProps) {
    //todo -- this is duplicated with match card and we should abstract out
    const formatDate = (date: Date | null): string => {
        return new Date(date ?? Date.now()).toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
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
        return formatTime(dateTime);
    });

    const [currentDate, setCurrentDate] = useState(() => {
        return formatDate(dateTime);
    });

    const [showTimeField, setShowTimeField] = useState(() => {
        return false;
    });

    useEffect(() => {
        setCurrentTime(() => {
            return formatTime(dateTime);
        });

        setCurrentDate(() => {
            return formatDate(dateTime);
        });

        setShowTimeField(() => true);
    }, [dateTime]);

    return (
        <div className="rounded-xl bg-white shadow-sm ring-1 ring-gray-900/5 p-8 mb-8">
            <h3 className="text-base font-semibold leading-7 text-gray-900">Match Details</h3>
            <dl className="mt-6 space-y-6 divide-y divide-gray-100">
                <div className="pt-6 first:pt-0">
                    <dt className="text-sm font-medium leading-6 text-gray-500">When</dt>
                    <dd
                        style={{ visibility: showTimeField ? 'visible' : 'hidden' }}
                        className="mt-1 text-base leading-6 text-gray-900"
                    >
                        <span>
                            {currentDate} • {currentTime}
                        </span>
                    </dd>
                </div>
                <div className="pt-6">
                    <dt className="text-sm font-medium leading-6 text-gray-500">Venue</dt>
                    <dd className="mt-1 text-base leading-6 text-gray-900">{location}</dd>
                </div>
            </dl>
        </div>
    );
}
