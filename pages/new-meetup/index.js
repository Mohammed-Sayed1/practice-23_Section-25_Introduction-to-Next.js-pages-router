import NewMeetupForm from '../../components/meetups/NewMeetupForm'

function NewMeetupPage() {
    function addMeetupHandler(enterMeetupData) {
        console.log(enterMeetupData)
    }
    
    return <NewMeetupForm onAddMeetup={addMeetupHandler} />
}

export default NewMeetupPage;