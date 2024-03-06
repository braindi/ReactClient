export const getNumPages = async (req) => {
    try {
        let allBags = await Bag.length();
        let { perPage } = req.query;

        let numPages = allBags / perPage;
        if (numPages % perPage != 0)
            numPages++;
        return numPages;
    }

    catch (err) {
        return res.status(400).send("an error occurred " + err);
    }
}
/////routes//////////////////////