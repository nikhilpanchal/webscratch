import axios from 'axios';

export default class EntityReturns {

    getAccountReturnsForBuCompositeAndDateRange(bu, composite, from, to) {
        // Remove the url params for the call to work.
        // let url = `/data/performance/composite-accounts.json`;
        let url = `/data/performance/composite-accounts.json&bu=${bu}&comp=${composite}&from=${from}&to=${to}`;

        return axios.get(url)
            .then(function (response) {
                console.log(response);

                return response;
            })
            .catch(function (error) {
                console.error(`Failed to retrieve composite returns ${error}`);

                throw error;
            });
    }
}