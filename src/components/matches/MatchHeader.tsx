import Image from 'next/image';
import { SelectTeam } from '../../../db/schema';

interface MatchHeaderProps {
    homeTeam: SelectTeam;
    awayTeam: SelectTeam;
}

export function MatchHeader({ homeTeam, awayTeam }: MatchHeaderProps) {
    return (
        <div className="rounded-xl bg-white shadow-sm ring-1 ring-gray-900/5 p-8 mb-8">
            <div className="flex items-center justify-center gap-12">
                <div className="text-center">
                    <div className="w-32 h-32 relative mb-4">
                        <Image
                            src={homeTeam.img ?? ''}
                            alt={`${homeTeam.name} logo`}
                            fill
                            className="object-contain"
                        />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">{homeTeam.name}</h2>
                </div>

                <div className="flex flex-col items-center">
                    <span className="text-sm font-medium text-gray-500 mb-2">VS</span>
                    <div className="h-px w-16 bg-gray-200" />
                </div>

                <div className="text-center">
                    <div className="w-32 h-32 relative mb-4">
                        <Image
                            src={awayTeam.img ?? ''}
                            alt={`${awayTeam.name} logo`}
                            fill
                            className="object-contain"
                        />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">{awayTeam.name}</h2>
                </div>
            </div>
        </div>
    );
}
