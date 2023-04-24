import getListingById from "@/app/actions/getListingById";
import EmptyQueryParamState from "@/app/components/EmptyQueryParamState";
import HydrationHandler from "@/app/components/HydrationHandler";
import ListingClient from "./ListingClient";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservation from "@/app/actions/getReservation";

interface IndividualListingPageProps {
    listingId: string
}

const IndividualListingPage = async ({
    params
}: { params: IndividualListingPageProps }) => {
    const reservations = await getReservation(params);
    const listingById = await getListingById(params);
    const currentUser = await getCurrentUser();

    if (!listingById) {
        return (
            <HydrationHandler>
                <EmptyQueryParamState />
            </HydrationHandler>
        );
    }

    return (
        <HydrationHandler>
            <ListingClient
                reservations={reservations}
                listing={listingById}
                currentUser={currentUser}
            />
        </HydrationHandler>
    );
}

export default IndividualListingPage;