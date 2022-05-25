import MeetupList from "../components/meetups/MeetupList";
import {MongoClient} from "mongodb";
import Head from "next/head";

function HomePage({meetups}) {
    return <>
            <Head>
                <title>Meetups app</title>
                <meta name="description" content="This is a meetup app for everyone to meet up"/>
            </Head>
            <MeetupList meetups={meetups} />
        </>

}

export async function getStaticProps() {
    const client = await MongoClient.connect('mongodb+srv://kevin:1234qwer@cluster0.gireq.mongodb.net/?retryWrites=true&w=majority');
    const db = client.db();
    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();
    await client.close();

    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                description: meetup.description,
                id: meetup._id.toString()
                })
            )
        }
    }
}

export default HomePage;
