import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListings from "../actions/getFavoritesListing";
import Container from "../components/Container";
import EmptyQueryParamState from "../components/EmptyQueryParamState";
import HydrationHandler from "../components/HydrationHandler";
import FavoritesClient from "./FavoritesClient";

const FavoritesPage = async () => {

    const currentUser = await getCurrentUser();
    const favorites = await getFavoriteListings();

    if (!currentUser) {
        return (
            <HydrationHandler>
                <EmptyQueryParamState
                    title="Unauthorized"
                    subtitle="Please login first to access the following content"
                />
            </HydrationHandler>
        )
    }

    if (favorites.length === 0) {
        return (
            <HydrationHandler>
                <EmptyQueryParamState
                    title="No favorites found"
                    subtitle="Looks like you have no favorites listing"
                />
            </HydrationHandler>
        );
    }

    return (
        <HydrationHandler>
            <FavoritesClient
                listings={favorites}
                currentUser={currentUser}
            />
        </HydrationHandler>
    );
}

export default FavoritesPage;