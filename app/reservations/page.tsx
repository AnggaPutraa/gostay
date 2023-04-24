
import getCurrentUser from "../actions/getCurrentUser";
import getReservation from "../actions/getReservation";
import Container from "../components/Container";
import EmptyQueryParamState from "../components/EmptyQueryParamState";
import HydrationHandler from "../components/HydrationHandler";
import ReservationsClient from "./ReservationsClient";

const ReservationsPage = async () => {
    const currentUser = await getCurrentUser();
    const reservations = await getReservation({
        authorId: currentUser?.id
    });

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

    if (reservations.length === 0) {
        return (
            <HydrationHandler>
                <EmptyQueryParamState
                    title="No reservations found"
                    subtitle="Looks like you have no reserved reservation on your properties"
                />
            </HydrationHandler>
        );
    }

    return (
        <Container>
            <ReservationsClient
                reservations={reservations}
                currentUser={currentUser}
            />
        </Container>
    );
}

export default ReservationsPage;