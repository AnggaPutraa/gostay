import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListings";
import EmptyQueryParamState from "../components/EmptyQueryParamState";
import HydrationHandler from "../components/HydrationHandler";
import PropertiesClient from "./PropertiesClient";

const PropertiesPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <HydrationHandler>
                <EmptyQueryParamState
                    title="Unauthorized"
                    subtitle="Please login first to access the following content"
                />
            </HydrationHandler>
        );
    }

    const listings = await getListings({ userId: currentUser.id });

    if (listings.length === 0) {
        return (
            <HydrationHandler>
                <EmptyQueryParamState
                    title="No properties found"
                    subtitle="Looks like you have no properties."
                />
            </HydrationHandler>
        );
    }

    return (
        <HydrationHandler>
            <PropertiesClient
                listings={listings}
                currentUser={currentUser}
            />
        </HydrationHandler>
    );
}

export default PropertiesPage;