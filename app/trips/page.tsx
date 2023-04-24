import getCurrentUser from "../actions/getCurrentUser";
import getReservation from "../actions/getReservation";
import EmptyQueryParamState from "../components/EmptyQueryParamState";
import HydrationHandler from "../components/HydrationHandler";
import TripsClient from "./TripsClient";

const TripsPage = async () => {
    const currentUser = await getCurrentUser();
    const reservations = await getReservation({
        userId: currentUser?.id
    });

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

    if (reservations.length === 0) {
        return (
            <HydrationHandler>
                <EmptyQueryParamState
                    title="No trips found"
                    subtitle="Looks like you havent reserved any trips"
                />
            </HydrationHandler>
        );
    }

    return (
        <HydrationHandler>
            <TripsClient
                reservations={reservations}
                currentUser={currentUser}
            />
        </HydrationHandler>
    );
}

export default TripsPage;