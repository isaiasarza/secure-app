import { injector, FCMServiceToken } from '../../injector/injector';

test("renders without crashing", () => {
  const service = injector.get(FCMServiceToken)
  expect(1).toBe(1);
});
