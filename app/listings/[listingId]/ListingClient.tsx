'use client';

import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";

import { categories } from "@/app/constants/categories";
import { SafeListing, SafeUser } from "@/app/types";
import { Reservation } from "@prisma/client";
import { useMemo } from "react";

interface ListingClientProps {
    reservation?: Reservation[];
    listing: SafeListing & {
        user: SafeUser;
    };
    currentUser?: SafeUser | null;
}

const ListingClient = ({
    listing,
    currentUser
}: ListingClientProps) => {

    const category = useMemo(() => {
        return categories.find((item) =>
            item.label === listing.category
        );
    }, [listing.category]);

    return (
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <ListingHead
                        id={listing.id}
                        title={listing.title}
                        imageSrc={listing.imageSrc}
                        locationValue={listing.locationValue}
                        currentUser={currentUser}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">

                    </div>
                </div>
            </div>
        </Container>
    );
}

export default ListingClient;