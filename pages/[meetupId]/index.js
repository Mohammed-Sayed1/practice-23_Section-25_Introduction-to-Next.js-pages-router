import Head from "next/head";
import { MongoClient, ObjectId } from "mongodb";

import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="dexcription" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </>
  );
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://mohammedsayed248320:0EYYQsI8nK5sdqBw@cluster0.ueygjvn.mongodb.net/"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  }); //* use ObjectId() to convert meetupId string into mongodb object id string

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}

/** getStaticPaths: is a function NextJs will lokes for while the build process to pregenerate this dynamic page for all IDs exests in the database
 * it only used when you use getStaticProps in a dynamic page
 * it returns an object which its structure like what returnd below
 */
export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://mohammedsayed248320:0EYYQsI8nK5sdqBw@cluster0.ueygjvn.mongodb.net/"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray(); //* passing first argument as and empty object will get all data object inside this collection, the second argument will include which to fetch from every data object

  client.close();

  return {
    //* fallback: tells NextJs if the paths array contains all supported parameters values or just some of them, false: means yes paths array contains all supported parameters, true: means paths array will not contain all parameters so NextJs will generate this page on the server for every request that not includes any of paths array parameters
    fallback: "blocking",
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export default MeetupDetails;
