import RingLoader from 'react-spinners/RingLoader';
export default function LoadingScreen () {
    const override = {
        display: "block",
        margin: "0 auto",
    };
    const color = "black"
    return (
        <div style={{backgroundColor: 'white', position: 'absolute', width: '100vw', height: '50vw', display: 'flex', alignItems: 'center', 'justifyContent': 'center'}}>
            <RingLoader
                color={color}
                loading={true}
                cssOverride={override}
                size={80}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    )
}