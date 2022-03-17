let restaurants;

export default class RestaurantsDAO{
    static async injectDB(conection){//Conect with the database, extract restauranst colection from sample_restaurants data
        if(restaurants) return;

        try{
            restaurants = await conection.db(process.env.RESTREVIEWS_NS).collection("restaurants");
        }catch(error){
            console.error(
                `Unable to establish a collection handle in restaurantsDAO:${error}`
            );
        }
    }

    static async getRestaurants({
        filters=null,
        page=0,
        restaurantsPerPage=20,
    }={}){
        let query;//MongoDB queries
        if(filters){
            if('name'in filters){
                query={$text: {$search:filters['name'] } };
            }else if('cuisine' in filters){
                query={ 'cuisine':{$eq: filters['cuisine']}};
            }else if('zipcode'in filters){
                query={'address.zipcode':{$eq:filters['zipcode']}}
            }
        }

        let cursor;

        try{
            cursor=await restaurants.find(query);
        }catch(e){
            console.error(`Unable to issue find command, ${e}`);
            return {restaurantsList:[], totalNumRestaurants:0};
        }

        const displayCursor=cursor.limit(restaurantsPerpage).skip(restaurantsPerPage*page);

        try {
            const restauranstList = await displayCursor.toArray();
            const totalNumRestaurants = await restaurants.countDocuments(query);
            return {restauranstList,totalNumRestaurants};
        } catch (error) {
            console.error(
                `Unable to convert cursor to array or problem counting documents, ${error}`
            );
            return {restaurantsList:[], totalNumRestaurants:0};
        }
    }
}