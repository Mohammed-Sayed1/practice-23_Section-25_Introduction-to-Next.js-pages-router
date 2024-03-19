import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails() {
  return (
    <MeetupDetail
      image="https://www.studentuniverse.com/blog/wp-content/uploads/2014/04/Most-Beautiful-Places-to-Travel-Featured-Image.jpg"
      title="A First Meetup"
      address="Some address 5, 12345 Some City"
      description="The Meetup description"
    />
  );
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  console.log(meetupId);

  return {
    props: {
      meetupData: {
        image:
          "https://www.studentuniverse.com/blog/wp-content/uploads/2014/04/Most-Beautiful-Places-to-Travel-Featured-Image.jpg",
        id: meetupId,
        title: "First Meetup",
        address: "Some address 5, 12345 Some City",
        description: "This Is The First Meetup",
      },
    },
  };
}

/** getStaticPaths: is a function NextJs will lokes for while the build process to pregenerate this dynamic page for all IDs exests in the database
 * it only used when you use getStaticProps in a dynamic page
 * it returns an object which its structure like what returnd below
 */
export async function getStaticPaths() {
  return {
    //* fallback: tells NextJs if the paths array contains all supported parameters values or just some of them, false: means yes paths array contains all supported parameters, true: means paths array will not contain all parameters so NextJs will generate this page on the server for every request that not includes any of paths array parameters
    fallback: false,
    paths: [
      {
        params: {
          meetupId: "m1",
        },
      },
      {
        params: {
          meetupId: "m2",
        },
      },
    ],
  };
}

export default MeetupDetails;
