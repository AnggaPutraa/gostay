import prisma from "@/app/libs/prismadb";

interface ReservationParams {
    listingId?: string;
    userId?: string;
    authorId?: string
}

export default async function getReservation(
    params: ReservationParams
) {
    try {
        const query: any = {};
        const { listingId, userId, authorId } = params;

        if (listingId) {
            query.listingId = listingId;
        }

        if (userId) {
            query.userId = userId;
        }

        if (authorId) {
            query.authorId = authorId;
        }

        const reservations = await prisma.reservation.findMany({
            where: query,
            include: {
                listing: true
            },
            orderBy: {
                createdAt: 'desc'
            },
        });

        const safeReservation = reservations.map((reservation) => ({
            ...reservation,
            createdAt: reservation.createdAt.toISOString(),
            startDate: reservation.startDate.toDateString(),
            endDate: reservation.endDate.toISOString(),
            listing: {
                ...reservation.listing,
                createdAt: reservation.listing.createdAt.toISOString()
            }
        }));

        return safeReservation;
    } catch (error: any) {
        throw new Error(error);
    }
}