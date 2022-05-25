import NewMeetupForm from "../components/meetups/NewMeetupForm";
import {router} from "next/client";
import Head from "next/head";

function NewMeetupPage() {
    const addMeetup = async (enteredMeetupData) => {
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredMeetupData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        console.log(data);

        await router.push('/');
    }

    return <>
        <Head>
            <title>Add new meetup</title>
            <meta name="description" content="Add a new meetup to meet others"/>
        </Head>
        <NewMeetupForm onAddMeetup={addMeetup}/>
        </>
}

export default NewMeetupPage;
