import React from 'react'
const EpsCard = ({ episodes }) => {
    return (
        <div className="cusCard">
            {episodes.map((items, index) => (
                <div className="cardContent" key={index}>
                    <div className="cardImg">
                        <img src={items.image} alt={items.image} />
                        <div className="imgDown">
                            <ul>
                                <li><h5>{items.name}</h5></li>
                                <li>
                                    <span>id: {items.id}</span> <span>Created: 2 Year ago {/*items.created*/}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="cusCardBody">
                        <ul>
                            <li><span>Status</span><span>{items.status}</span></li>
                            <li><span>Species</span><span>{items.species}</span></li>
                            <li><span>Gender</span><span>{items.gender}</span></li>
                            <li><span>Origin</span><span>{items.origin.name}</span></li>
                            <li><span>Last Location</span><span>{items.location.name}</span></li>
                        </ul>
                    </div>
                </div>

            ))}
        </div>
    )
}
export default EpsCard;