import "@babel/polyfill";
import { handleSubmit } from './../client/js/formHandler'


describe('Test, the function "handleSubmit()" should exist' , () => {
    test('It should has no return ', async () => {
        expect(handleSubmit).toBeDefined();
    });
});
describe('Test, the function "handleSubmit(event)" should be a function' , () => {
    test('It should be a function', async () => {
        expect(typeof handleSubmit).toBe("function");
    });
});
