type LoadingCardProp = {
    message: string;
}

function LoadingCard({ message }: LoadingCardProp) {
    return (
        <div className="loader-cont">
            <div>
                {message}
            </div>
            {/* // From Uiverse.io by Shoh2008 */}
            <div className="loader"></div>
        </div>
    )
}

export default LoadingCard;