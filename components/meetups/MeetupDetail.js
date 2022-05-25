import Image from "next/image";

import classes from "./MeetupDetail.module.css";

const MeetupDetail = ({image, title, description, address}) => {
    return <section className={classes.detail}>
        <h1>{title}</h1>
        <img src={image} />
        <div>{address}</div>
        <p>{description}</p>

    </section>
}

export default MeetupDetail;