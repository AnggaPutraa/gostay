import getListingById from "@/app/actions/getListingById";
import EmptyQueryParamState from "@/app/components/EmptyQueryParamState";
import HydrationHandler from "@/app/components/HydrationHandler";
import ListingClient from "./ListingClient";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IndividualListingPageProps {
    listingId: string
}

const IndividualListingPage = async ({
    params
}: { params: IndividualListingPageProps }) => {
    const listing = await getListingById(params);
    const currentUser = await getCurrentUser();

    if (!listing) {
        return (
            <HydrationHandler>
                <EmptyQueryParamState />
            </HydrationHandler>
        );
    }

    return (
        <HydrationHandler>
            <ListingClient
                listing={listing}
                currentUser={currentUser}
            />
        </HydrationHandler>
    );
}

export default IndividualListingPage;