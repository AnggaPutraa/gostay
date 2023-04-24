import getCurrentUser from "./actions/getCurrentUser";
import getListings from "./actions/getListings";
import Container from "./components/Container";
import EmptyQueryParamState from "./components/EmptyQueryParamState";
import HydrationHandler from "./components/HydrationHandler";
import ListingCard from "./components/listings/ListingCard";

interface ListingsParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

interface HomeProps {
  searchParams: ListingsParams
}

export default async function Home({
  searchParams
}: HomeProps) {

  const currentUser = await getCurrentUser();
  const listings = await getListings(searchParams);

  if (listings.length === 0) {
    return (
      <HydrationHandler>
        <EmptyQueryParamState showReset />
      </HydrationHandler>
    );
  }

  return (
    <HydrationHandler>
      <Container>
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {listings.map((listing) => {
            return (
              <ListingCard
                key={listing.id}
                data={listing}
                currentUser={currentUser}
              />
            )
          })}
        </div>
      </Container>
    </HydrationHandler>
  )
}
