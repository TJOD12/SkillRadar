type KpiCardProp = {
    title: string,
    data: {
        metric: string,
        value: number
    }
}

function KpiCard({ title, data }: KpiCardProp) {
    return (
        <div className="kpi-card">
            <h3>{ title }</h3>
            <h4 className='kpi-title'> { data.metric } </h4>
            <i className="kpi-highlighted-text"> { data.value } </i>
        </div>
    )
}

export default KpiCard;