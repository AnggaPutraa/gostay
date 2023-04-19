
import { SafeUser } from "@/app/types";
import { Listing, Reservation } from "@prisma/client";

interface ListingCardProps {
    data: Listing;
    reservarion?: Reservation;
    onAction?: (id: string) => void
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;
}

const ListingCard = ({
    data,
    reservarion,
    onAction,
    disabled,
    actionLabel,
    actionId,
    currentUser
}: ListingCardProps) => {
    return (
        <div>

        </div>
    );
}

export default ListingCard;