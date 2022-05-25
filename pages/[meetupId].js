import MeetupDetail from "../components/meetups/MeetupDetail";
import {MongoClient, ObjectID} from "mongodb";
import Head from "next/head";

function MeetupDetailPage({title, description, address, image}) {
    return <>
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
        </Head>
        <MeetupDetail title={title} description={description} address={address} image={image} />;
    </>
}

export async function getStaticPaths() {
    const client = await MongoClient.connect('mongodb+srv://kevin:1234qwer@cluster0.gireq.mongodb.net/?retryWrites=true&w=majority');
    const db = client.db();
    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find({}, {_id: 1}).toArray();
    await client.close();

    return {
        fallback: false,
        paths: meetups.map(meetup => ({
            params: {
                meetupId: meetup._id.toString()
            }
        }))
    }
}

export async function getStaticProps(context) {
    const id = context.params.meetupId;

    const client = await MongoClient.connect('mongodb+srv://kevin:1234qwer@cluster0.gireq.mongodb.net/?retryWrites=true&w=majority');
    const db = client.db();
    const meetupsCollection = db.collection('meetups');

    const meetup = await meetupsCollection.findOne({_id: ObjectID(id)});
    await client.close();

    return {
        props: {
            id: meetup._id.toString(),
            address: meetup.address,
            description: meetup.description,
            title: meetup.title,
            image: meetup.image,
        }
    }
}

export default MeetupDetailPage;
