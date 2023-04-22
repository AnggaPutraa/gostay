'use client';

import { SafeUser } from "@/app/types";
import { Listing, Reservation } from "@prisma/client";
import { useRouter } from "next/navigation";
import { format } from 'date-fns';
import React, { useCallback, useMemo } from "react";

import useCountries from "@/app/hooks/useCountry";

interface ListingCardProps {
    data: Listing;
    reservation?: Reservation;
    onAction?: (id: string) => void
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;
}

const ListingCard = ({
    data,
    reservation,
    onAction,
    disabled,
    actionLabel,
    actionId = '',
    currentUser
}: ListingCardProps) => {
    const router = useRouter();

    const { getByValue } = useCountries();
    const location = getByValue(data.locationValue);

    const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (disabled) {
            return;
        }
        onAction?.(actionId);
    }, [onAction, actionId, disabled]);

    const price = useMemo(() => {
        if (reservation) {
            return reservation.totalPrice;
        }
        return data.price;
    }, [reservation, data.price]);

    const reservationDate = useMemo(() => {
        if (!reservation) {
            return null;
        }
        const startDate = new Date(reservation.startDate);
        const endDate = new Date(reservation.endDate);

        return `${format(startDate, 'PP')} - ${format(endDate, 'PP')}`

    }, []);

    return (
        <div>

        </div>
    );
}

export default ListingCard;