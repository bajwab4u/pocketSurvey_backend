// import request from 'supertest';
// import App from '@/app';
// import { UpdScorebyUserIdDto } from '@/dtos/scores.dto';
// import { Scores } from '@/interfaces/scores.interface';
// import scoresModel from '@/models/scores.model';
// import ScoresRoute from '@/routes/scores.route';
// afterAll(async () => {
//   await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
// });
// describe('Testing Scores', () => {
//   describe('[GET] /scores/:id', () => {
//     it('response statusCode 200 / findOne', () => {
//       const userId = 1;
//       const findScore: Scores = scoresModel.find(scores => scores.userId === userId);
//       const scoresRoute = new ScoresRoute();
//       const app = new App([scoresRoute]);
//       return request(app.getServer()).get(`${scoresRoute.path}/${userId}`).expect(200, { data: findScore, message: 'findOne' });
//     });
//   });
//   describe('[PUT] /scores/add/:id', () => {
//     it('response statusCode 200 / updated', async () => {
//       const userId = 1;
//       const scoresData: UpdScorebyUserIdDto = {
//         userId: 1,
//         diamonds: 10,
//         action: 'add',
//       };
//       const scoresRoute = new ScoresRoute();
//       const app = new App([scoresRoute]);
//       return request(app.getServer()).put(`${scoresRoute.path}/add/${userId}`).send(scoresData).expect(201);
//     });
//   });
// });
//# sourceMappingURL=score.test.js.map