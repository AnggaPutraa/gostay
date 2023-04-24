'use client';

import { useEffect } from "react";
import EmptyQueryParamState from "./components/EmptyQueryParamState";

interface ErrorStateProps {
    error: Error
}

const ErrorState = ({
    error
}: ErrorStateProps) => {
    useEffect(() => {
        console.log(error);
    }, []);
    return (
        <EmptyQueryParamState
            title="Woops!"
            subtitle="Something went wrong!"
        />
    );
}

export default ErrorState;