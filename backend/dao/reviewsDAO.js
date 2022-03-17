import mongodb from 'mongodb';
const ObjectId=mongodb.ObjectId;

let reviews;

export default class ReviewsDAO{
    static async injectDB(conn){
        if(reviews) return;

        try{
            reviews=await conn.db(process.env.RESTREVIEWS_NS).collection("reviews");
        }catch(error){
            console.error(`Unable to establish collection handles in userDAO:${error}`);
        }
    }

    static async addReview(restaurantId,user,review,date){
        try{
            const reviewDoc={
                name:user.name,
                user_id:user._id,
                date:date,
                text:review,
                restaurantId: ObjectId(restaurantId),
            }

            return await reviews.insertOne(reviewDoc);

        }catch(e){
            console.error(`Unable to post review: ${e}`);
            return {error:e};
        }
    }

    static async updateReview(reviewId,userId,text,date){
        try{
            const updateResponse = await reviews.updateOne(
                {user_id:userId,_id:ObjectId(reviewId)},
                {$set:{text:text,date:date}},
            )
            return updateResponse;
        }catch(error){
            console.log(`Unable to update review: ${error}`);
            return {error};
        }
    }

    static async deleteReview(reviewId,userId){
        try{
            const deleteResponse =await reviews.deleteOne({
                _id:ObjectId(reviewId),
                user_id:userId,
            })
            return deleteResponse;
        }catch(e){
            console.log(`Unable to update review: ${e}`);
            return {error:e}; 
        }
    }

};