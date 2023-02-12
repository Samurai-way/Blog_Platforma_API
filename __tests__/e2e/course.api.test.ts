import request from 'supertest'
import {app} from "../../src";

describe('/api', () => {

    beforeAll(async () => {
        await request(app).delete('/testing/all-data')
    })

    it('should return 204, and  delete all-data', async () => {
        await request(app).get('/blogs')
            .expect(200)
    })
})