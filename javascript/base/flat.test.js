import omit from './omit'
import { expect, test} from '@jest/globals';

test('omit', () => {
    const info = { name: "Doraemon", species: "Robot Cat", birthdate: "2112/09/03" }
    const basicInfo = omit(info, ["species", "birthdate"]);
    expect(Object.keys(basicInfo).length).toBe(1);
});
