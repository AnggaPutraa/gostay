'use client';

import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";

import { useRouter } from "next/navigation";
import { SafeReservation, SafeUser } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

interface ReservationsClientProps {
    reservations: SafeReservation[];
    currentUser: SafeUser | null;
}

const ReservationsClient = ({
    reservations,
    currentUser
}: ReservationsClientProps) => {

    const router = useRouter();

    const [deletingId, setDeletingId] = useState('');

    const onCancel = useCallback((id: string) => { 
        setDeletingId(id);
        axios.delete(`/api/reservations/${id}`)
        .then(() => {
            toast.success('Reservation canceled');
            router.refresh();
        })
        .catch((error) => {
            toast.error('Something went wrong');
        })
        .finally(() => {
            setDeletingId('');
        });
    }, [router]);

    return (
        <Container>
            <Heading
                title="Reservations"
                subtitle="Bookings on you're properties"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 mt-10 gap-8">
                {reservations.map((reservation) => (
                    <ListingCard
                        key={reservation.id}
                        data={reservation.listing}
                        reservation={reservation}
                        actionId={reservation.id}
                        onAction={onCancel}
                        disabled={deletingId === reservation.id}
                        actionLabel="Cancel guest reservation"
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    );
}

export default ReservationsClient;