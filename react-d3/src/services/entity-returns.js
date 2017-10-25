import axios from 'axios';

export default class EntityReturns {

    getEntityReturns(url) {
        return axios.get(url)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.error(`Failed to retrieve composite returns ${error}`);

                throw error;
            });
    }

    getAccountReturnsForBuCompositeAndDateRange(bu, composite, from, to) {
        let url = `/data/performance/composite-accounts.json`;
        // let url = `/data/performance/composite-accounts.json&bu=${bu}&comp=${composite}&from=${from}&to=${to}`;

        return this.getEntityReturns(url);
    }

    getSecurityReturnsForBuAccountAndDateRange() {
        let url = `/data/performance/account-securities.json`;

        return this.getEntityReturns(url);
    }
}