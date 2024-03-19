/** NOTE: any code inside api folder's files excutes on the server */

import {MongoClient} from 'mongodb'; //* this allows us to connect to mongodb

// /api/new-meetup
// POST /api/new-meetup

async function handler(req, res) {
 if(req.method === 'POST') {
    const data = req.body;

   //  const client = await MongoClient.connect('mongodb+srv://mohammedsayed248320:0EYYQsI8nK5sdqBw@cluster0.ueygjvn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    const client = await MongoClient.connect('mongodb+srv://mohammedsayed248320:0EYYQsI8nK5sdqBw@cluster0.ueygjvn.mongodb.net/')
    const db = client.db();

    const meetupsCollection = db.collection('meetups')

    const result = await meetupsCollection.insertOne(data)

    console.log(result)

    client.close()

    res.status(201).json({ message: 'Meetup inserted'})
 }
}

export default handler;