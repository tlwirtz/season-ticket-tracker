import { useSelector } from 'react-redux';

export default function SeasonDelay() {
    const messageHeader = useSelector(state => state.seasonStatus.data.messageHeader);
    const messageText = useSelector(state => state.seasonStatus.data.messageText);

    return (
        <section>
            <div style={{ display: 'block', marginBottom: '50vh' }}>
                <h1 className="centered nav-bar-title">{messageHeader}</h1>
                <h3 className="centered extra-left-margin nav-bar-subheading cool-grey-text">
                    {messageText}
                </h3>
            </div>
        </section>
    );
}
