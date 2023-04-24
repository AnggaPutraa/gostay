import EmptyQueryParamState from "./components/EmptyQueryParamState";

const NotFound = () => {
    return (
        <EmptyQueryParamState
            title="Woops!"
            subtitle="The current content you looking for isn't available"
            showReset
            showResetText="Go back to main page?"
        />
    );
}

export default NotFound;