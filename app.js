/*

1. Create a band of your choice.
2. Log the newly created band. (Just that band, not all bands)
3. Create another band of your choice.
4. Query all bands, and log them all
5. Create the 3rd band of your choice.
6. Log the newly created 3rd band. (Just that band, not all bands)
7. Rename the first band
8. Log the first band with the updated name. 
9. Remove the second band you created.
10. Query all bands, and log them all
11. Try to create a band with bad input parameters to make sure it throws errors.
12. Try to remove a band that does not exist to make sure it throws errors.
13. Try to rename a band that does not exist to make sure it throws errors.
14. Try to rename a band passing in invalid data for the newName parameter to make sure it throws errors.
15. Try getting a band by ID that does not exist to make sure it throws errors.

*/

import {dbConnection, closeConnection} from './config/mongoConnection.js';
import * as bands from './data/bands.js'
//lets drop the database each time this is run
const db = await dbConnection();
await db.dropDatabase();

let pinkFloyd = undefined;
let Beatles = undefined;
let LP = undefined;
let eagles = undefined;


async function main() {
    
    try{
        pinkFloyd = await bands.create("Pink Floyd", ["Progressive Rock", "Psychedelic rock", "Classic Rock"], "http://www.pinkfloyd.com", "EMI", ["Roger Waters", "David Gilmour", "Nick Mason", "Richard Wright", "Sid Barrett" ], 1965);
        console.log(pinkFloyd);
    }catch(e){ console.log(e)}

    try{
        let see1 = await bands.get(pinkFloyd._id.toString());
        console.log(see1);
    }catch(e){ console.log(e)}

    try{
        Beatles = await bands.create("The Beatles",["Rock", "Pop", "Psychedelia"],"http://www.thebeatles.com","Parlophone",["John Lennon", "Paul McCartney", "George Harrison", "Ringo Starr"],1960);
        console.log(Beatles);
    }catch(e){ console.log(e)}
    
    try{
        let show = await bands.getAll();
        console.log(show);
    }catch(e){ console.log(e)}

    try{
        LP = await bands.create("Linkin Park", ["Alternative Rock", "Pop Rock", "Alternative Metal"],"http://www.linkinpark.com", "Warner", ["Chester Bennington", "Rob Bourdon", "Brad Delson", "Mike Shinoda", "Dave Farrell", "Joe Hahn"],1996);
        console.log(LP);
    }catch(e){ console.log(e)}

    try{
        let lp = await bands.get(LP._id.toString());
        console.log(lp);
    }catch(e){ console.log(e)}
    
    try{
        pinkFloyd = await bands.rename(pinkFloyd._id.toString(),"Pink F");
        console.log(pinkFloyd);
    }catch(e){ console.log(e)}

    try{
        let lp = await bands.get(pinkFloyd._id.toString());
        console.log(lp);
    }catch(e){ console.log(e)}
    
    try{
        let pf = await bands.remove(Beatles._id.toString());
        console.log(pf);
    }catch(e){ console.log(e)}

    try{
        const pf = await bands.getAll();
        console.log(pf);
    }catch(e){ console.log(e)}

    try{
        eagles = await bands.create("The Eagles", ["Progressive Rock", "Psychedelic rock", "Classic Rock"], "http://www.pinkfloyd.com", 467, ["Roger Waters", "David Gilmour", "Nick Mason", "Richard Wright", "Sid Barrett" ], 'kdmfkerf');
        console.log(eagles);
    }catch(e){ console.log(e)}

    try{
        const pf = await bands.remove("63f7e0e4f6af6d046ddaac3d");
        console.log(pf);
    }catch(e){ console.log(e)}

    try{
        const pf = await bands.rename("93f7e0e4f6af6d047ddaac5c","scary cat");
        console.log(pf);
    }catch(e){ console.log(e)}

    try{
        const pf = await bands.rename(pinkFloyd._id.toString(),53445);
        console.log(pf);
    }catch(e){ console.log(e)}

    try{
        const pf = await bands.get("93f7e0e4f6af6d046ddaac4d");
        console.log(pf);
    }catch(e){ console.log(e)}

    await closeConnection();
}


main();