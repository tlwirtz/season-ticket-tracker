import Image from 'next/image';
import { SelectTeam } from '../../../db/schema';

interface MatchHeaderProps {
    homeTeam: SelectTeam;
    awayTeam: SelectTeam;
}

export function MatchHeader({ homeTeam, awayTeam }: MatchHeaderProps) {
    return (
        <div className="rounded-xl bg-white shadow-sm ring-1 ring-gray-900/5 p-4 sm:p-8 mb-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
                <div className="text-center w-full sm:w-auto">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 relative mb-4 mx-auto">
                        <Image
                            src={homeTeam.img ?? ''}
                            alt={`${homeTeam.name} logo`}
                            fill
                            className="object-contain"
                        />
                    </div>
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                        {homeTeam.name}
                    </h2>
                </div>

                <div className="flex flex-row sm:flex-col items-center">
                    <span className="text-sm font-medium text-gray-500 mx-3 sm:mx-0 sm:mb-2">
                        VS
                    </span>
                    <div className="h-px w-16 bg-gray-200 hidden sm:block" />
                </div>

                <div className="text-center w-full sm:w-auto">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 relative mb-4 mx-auto">
                        <Image
                            src={awayTeam.img ?? ''}
                            alt={`${awayTeam.name} logo`}
                            fill
                            className="object-contain"
                        />
                    </div>
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                        {awayTeam.name}
                    </h2>
                </div>
            </div>
        </div>
    );
}
