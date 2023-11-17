const mongoose=require('mongoose');
const cities=require('./cities');
const {places, descriptors}=require('./seedHelpers')
const CampGround=require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelpCamp',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db =mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once("open", ()=>{
    console.log("Database Connected")
});

const sample=array=>array[Math.floor(Math.random()*array.length)];

const seedDB = async()=>{
    await CampGround.deleteMany({});
   for(let i=0; i< 50; i++){
    const random1000=Math.floor(Math.random()*1000);
    const price=Math.floor(Math.random()*20)+10;
    const camp=new CampGround({
        author: "64ee2eacabdd00b8c9f8beb7",
        location: `${cities[random1000].city}, ${cities[random1000].state}`,
        title: `${sample(descriptors)} ${sample(places)}`,
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur nihil neque laboriosam, sit laborum dolorem, accusantium veniam rerum odio ipsa, esse magnam sunt doloribus dignissimos vel delectus laudantium similique aut!',
        price,
        images:  [
            {
              url: 'https://res.cloudinary.com/dhr5nvgg6/image/upload/v1700110168/yelpcamp/eff3b68ubbbmj7hgj1bq.jpg',
              filename: 'yelpcamp/eff3b68ubbbmj7hgj1bq'
            },
            {
              url: 'https://res.cloudinary.com/dhr5nvgg6/image/upload/v1700110173/yelpcamp/k3rne5xtkorgmfkfaf16.jpg',
              filename: 'yelpcamp/k3rne5xtkorgmfkfaf16'
            }
          ]
    })
    await camp.save();
   }
}
seedDB().then(()=>{
    mongoose.connection.close();
})