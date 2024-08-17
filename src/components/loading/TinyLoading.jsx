import BeatLoader from 'react-spinners/BeatLoader';
export default function TinyLoading ({ color }) {
    const override = {
        display: "block",
        margin: "0 auto",
    };
    return (
        <div style={{}}>
            <BeatLoader
                color={color}
                loading={true}
                cssOverride={override}
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    )
}