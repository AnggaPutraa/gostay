import getCurrentUser from "./actions/getCurrentUser";
import getListings from "./actions/getListings";
import Container from "./components/Container";
import EmptyQueryParamState from "./components/EmptyQueryParamState";
import HydrationHandler from "./components/HydrationHandler";
import ListingCard from "./components/listings/ListingCard";

export default async function Home() {

  const currentUser = await getCurrentUser();
  const listings = await getListings();

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
          <div>
            {listings.map((listing: any) => {
              return (
                <ListingCard
                  key={listing.id}
                  data={listing}
                  currentUser={currentUser}
                />
              )
            })}
          </div>
        </div>
      </Container>
    </HydrationHandler>
  )
}
