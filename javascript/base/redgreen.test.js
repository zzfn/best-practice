import { redYellowRed } from './redgreen';
import {afterEach, beforeEach, describe, expect, it, jest} from '@jest/globals';

jest.useFakeTimers();

describe('redYellowRed', () => {
    let logSpy;

    beforeEach(() => {
        logSpy = jest.spyOn(console, 'log');
    });

    afterEach(() => {
        logSpy.mockRestore();
    });

    it('should cycle through colors in the correct order', () => {
        redYellowRed();
        jest.advanceTimersByTime(6000);

        expect(logSpy).toHaveBeenNthCalledWith(1, 'red', expect.any(String));
        expect(logSpy).toHaveBeenNthCalledWith(2, 'yellow', expect.any(String));
        expect(logSpy).toHaveBeenNthCalledWith(3, 'green', expect.any(String));
        expect(logSpy).toHaveBeenNthCalledWith(4, 'red', expect.any(String));
    });

    it('should cycle through colors with correct timing', () => {
        redYellowRed();
        jest.advanceTimersByTime(3000);

        expect(logSpy).toHaveBeenNthCalledWith(1, 'red', expect.any(String));

        jest.advanceTimersByTime(1000);
        expect(logSpy).toHaveBeenNthCalledWith(2, 'yellow', expect.any(String));

        jest.advanceTimersByTime(2000);
        expect(logSpy).toHaveBeenNthCalledWith(3, 'green', expect.any(String));
    });

    it('should not log any color if no time has passed', () => {
        redYellowRed();
        jest.advanceTimersByTime(0);

        expect(logSpy).not.toHaveBeenCalled();
    });
});
