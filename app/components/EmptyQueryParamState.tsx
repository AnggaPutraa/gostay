'use client';

import { useRouter } from "next/navigation";
import Heading from "./Heading";
import Button from "./Button";

interface EmptyQueryParamStateProps {
    title?: string;
    subtitle?: string;
    showReset?: boolean;
    showResetText?: string;
}

const EmptyQueryParamState = ({
    title = 'No exact matches',
    subtitle = 'Try changing or removing some of your filters',
    showReset,
    showResetText
}: EmptyQueryParamStateProps) => {

    const router = useRouter();

    return (
        <div className="h-[70vh] flex flex-col gap-2 justify-center items-center">
            <Heading
                title={title}
                subtitle={subtitle}
                center
            />
            <div className="w-48 mt-4">
                {showReset && (
                    <Button 
                    outline
                    label={showResetText || "Remove all filters"}
                    onClick={() => {router.push('/')}}
                    />
                )}
            </div>
        </div>
    );
}

export default EmptyQueryParamState;