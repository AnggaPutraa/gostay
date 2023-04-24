'use client';

import qs from 'query-string';
import useSearchModal from "@/app/hooks/useSearchModal";
import Modal from "./Modal";
import dynamic from "next/dynamic";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import { formatISO } from "date-fns";
import Heading from '../Heading';
import Counter from '../inputs/Counter';
import Calendar from '../inputs/Calendar';

enum STEPS {
    LOCATION = 0,
    DATE = 1,
    INFO = 2,
}

const SearchModal = () => {
    const router = useRouter();
    const params = useSearchParams();
    const searchModal = useSearchModal();

    const [step, setStep] = useState(STEPS.LOCATION);
    const [guestCount, setGuestCount] = useState(1);
    const [roomCount, setRoomCount] = useState(1);
    const [bathroomCount, setBathroomCount] = useState(1);
    const [location, setLocation] = useState<CountrySelectValue>();
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    });

    const Map = useMemo(
        () => dynamic(
            () => import('../Map'), {
            ssr: false
        }), [location]
    );

    const onBack = useCallback(() => {
        setStep((value) => value - 1);
    }, []);

    const onNext = useCallback(() => {
        setStep((value) => value + 1);
    }, []);

    const actionLabel = useMemo(() => {
        if (step === STEPS.INFO) {
            return 'Search'
        }

        return 'Next'
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.LOCATION) {
            return undefined
        }

        return 'Back'
    }, [step]);

    const onSubmit = useCallback(async () => {
        let currentQuery = {};
        
        if (step !== STEPS.INFO) {
            return onNext();
        }


        if (params) {
            currentQuery = qs.parse(params.toString())
        }

        const updatedQuery: any = {
            ...currentQuery,
            locationValue: location?.value,
            guestCount,
            roomCount,
            bathroomCount
        };

        if (dateRange.startDate) {
            updatedQuery.startDate = formatISO(dateRange.startDate);
        }

        if (dateRange.endDate) {
            updatedQuery.endDate = formatISO(dateRange.endDate);
        }

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery,
        }, { skipNull: true });

        setStep(STEPS.LOCATION);
        searchModal.onClose();
        router.push(url);
    }, [
        step,
        searchModal,
        location,
        router,
        guestCount,
        roomCount,
        dateRange,
        onNext,
        bathroomCount,
        params
    ]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Where do you wanna go?"
                subtitle="Find the perfect location!"
            />
            <CountrySelect
                value={location}
                onChange={(value) =>
                    setLocation(value as CountrySelectValue)}
            />
            <hr />
            <Map center={location?.latlng} />
        </div>
    )

    if (step === STEPS.DATE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="When do you plan to go?"
                    subtitle="Make sure everyone is free!"
                />
                <Calendar
                    onChange={(value) => setDateRange(value.selection)}
                    value={dateRange}
                />
            </div>
        )
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="More information"
                    subtitle="Find your perfect place!"
                />
                <Counter
                    onChange={(value) => setGuestCount(value)}
                    value={guestCount}
                    title="Guests"
                    subtitle="How many guests are coming?"
                />
                <hr />
                <Counter
                    onChange={(value) => setRoomCount(value)}
                    value={roomCount}
                    title="Rooms"
                    subtitle="How many rooms do you need?"
                />
                <hr />
                <Counter
                    onChange={(value) => {
                        setBathroomCount(value)
                    }}
                    value={bathroomCount}
                    title="Bathrooms"
                    subtitle="How many bahtrooms do you need?"
                />
            </div>
        )
    }

    return (
        <Modal
            title="Filters"
            isOpen={searchModal.isOpen}
            onSubmit={onSubmit}
            onClose={searchModal.onClose}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
            body={bodyContent}
        />
    );
}

export default SearchModal;