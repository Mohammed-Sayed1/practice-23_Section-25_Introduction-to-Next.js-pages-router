import { MongoClient } from "mongodb"; //* You can import something for client side and server side code and according to where this something used will be included to client bundle or server bundle

import MeetupList from "../components/meetups/MeetupList";

function HomePage(props) {
  return <MeetupList meetups={props.meetups} />;
}

/** getStaticProps: is a function NextJs will looks for it and excute it during pre-rendering process before calling the component function (HomePage component function)
 * its job is to prepare props for this page, and these props could contain the data the page might needs
 * allowed to be asyncronous function and terurn a promise, so NextJs will wait until this function to finish and gets the props which contain the data this page needs, and then excuted this component function
 * this function must be implemented in a page component inside pages folder
 * getStaticProps is a reserved name so you must name it like this
 * its code only excutes on the server, so it will not sent to the clients machines
 * you always need to return an object inside this function
 * the object must contain 'props' property and it asigned to an object and the content of this object is up to you
 */
export async function getStaticProps() {
  /** here we connect manually to the data base, not through an API, because we allready on the server */
  const client = await MongoClient.connect(
    "mongodb+srv://mohammedsayed248320:0EYYQsI8nK5sdqBw@cluster0.ueygjvn.mongodb.net/"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map(meetup => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString()
      })),
    },
    /** use this property to unlock a feature called incremental static generation
     * it takes a number of seconds that tells NextJs how much to wait until regenerate this page for incoming requests
     * NextJs will generate this page in the build process and every revalidate property value as seconds if there are requests comming for this page
     */
    revalidate: 1,
  };
}

/** getServerSideProps: is tepecally like getStaticProps function, BUT
 * this function will not run during the build process but always on the server after deployment
 * it will run for every incoming request anyway, so there is no need of revalidate property
 * getServerSideProps & getStaticProps can take props
 * for getServerSideProps(): getServerSideProps(context) {
                                // context here works as a middleware, so you can access through it the concrete request and response, so you can use this function for authintcation for example
                                const request = context.req; 
                                const response = context.res;
                             }
 * 
 */
// export async function getServerSideProps() {
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export default HomePage;
